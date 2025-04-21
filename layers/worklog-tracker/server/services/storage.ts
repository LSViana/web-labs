import { useProductivitySupabaseClient } from '~~/layers/productivity/server/services/database';
import { WorklogItem } from '~~/layers/worklog-tracker/shared/types/worklogItem';

function getWorklogUrl(ticket: string): string {
  return 'https://gemmeus.atlassian.net/rest/api/3/issue/' + ticket + '/worklog';
}

const supabaseClient = useProductivitySupabaseClient();

export function useWorklogStorage() {
  async function load(credentialsId: string, date: Date): Promise<WorklogItem[]> {
    const startOfDay = date;
    const endOfDay = new Date(date);
    endOfDay.setHours(endOfDay.getHours() + 24);

    const result = await supabaseClient
      .from('worklogs')
      .select('*')
      .eq('credential_id', credentialsId)
      .filter('started_at', 'gte', startOfDay.toISOString())
      .filter('started_at', 'lt', endOfDay.toISOString())
      .order('started_at', { ascending: false });

    if (!result.data || result.data.length === 0) {
      return [];
    }

    return result.data.map(x => new WorklogItem(
      x.id,
      x.ticket,
      x.content,
      new Date(x.started_at),
      new Date(x.ended_at),
      x.issue_id,
      x.worklog_id,
    ));
  }

  async function save(worklogItem: WorklogItem, credentialsId: string): Promise<WorklogItem> {
    const credentials = await getCredentials(credentialsId);

    let jiraResponseBody: { worklogId: string, issueId: string };

    if (credentials.apiPassword) {
      const startTime = new Date(worklogItem.startTime);
      const endTime = new Date(worklogItem.endTime);

      const startTimeString = startTime.toISOString().replace('Z', '-0000');
      const timeSpentSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
      const payload = {
        comment: {
          content: [
            {
              content: [
                {
                  text: worklogItem.content,
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'doc',
          version: 1,
        },
        started: startTimeString,
        timeSpentSeconds: timeSpentSeconds,
      };

      const response = await fetch(getWorklogUrl(worklogItem.ticket), {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(credentials.email + ':' + credentials.apiPassword)}`,
        },
      });

      if (response.status !== 201) {
        throw new Error('Failed to create worklog');
      }

      const responseBody = await response.json() as { id: string, issueId: string };

      jiraResponseBody = {
        worklogId: responseBody.id,
        issueId: responseBody.issueId,
      };
    }
    else {
      jiraResponseBody = {
        worklogId: '0',
        issueId: '0',
      };
    }

    const result = await supabaseClient
      .from('worklogs')
      .insert({
        issue_id: jiraResponseBody.issueId,
        worklog_id: jiraResponseBody.worklogId,
        ticket: worklogItem.ticket,
        content: worklogItem.content,
        started_at: worklogItem.startTime,
        ended_at: worklogItem.endTime,
        credential_id: credentialsId,
      })
      .select();

    return new WorklogItem(
      result.data![0].id,
      worklogItem.ticket,
      worklogItem.content,
      worklogItem.startTime,
      worklogItem.endTime,
      jiraResponseBody.issueId,
      jiraResponseBody.worklogId,
    );
  }

  async function remove(id: string, credentialsId: string): Promise<void> {
    const credentials = await getCredentials(credentialsId);

    const response = await supabaseClient
      .from('worklogs')
      .select('worklog_id, issue_id')
      .eq('id', id)
      .eq('credential_id', credentialsId)
      .single();

    const worklog = response.data;

    if (!worklog) {
      throw new Error('Worklog not found');
    }

    if (credentials.apiPassword) {
      const worklogId = worklog.worklog_id;
      const issueId = worklog.issue_id;

      const response = await fetch(getWorklogUrl(issueId) + '/' + worklogId + '?adjustEstimate=leave', {
        method: 'DELETE',
        headers: {
          Authorization: `Basic ${btoa(credentials.email + ':' + credentials.apiPassword)}`,
        },
      });

      if (response.status !== 204) {
        throw new Error('Failed to remove worklog');
      }
    }

    await supabaseClient.from('worklogs')
      .delete()
      .eq('id', id)
      .eq('credential_id', credentialsId);
  }

  async function update(worklogItem: WorklogItem, credentialsId: string): Promise<void> {
    const credentials = await getCredentials(credentialsId);

    if (credentials.apiPassword) {
      const startTime = new Date(worklogItem.startTime);
      const endTime = new Date(worklogItem.endTime);

      const startTimeString = startTime.toISOString().replace('Z', '-0000');
      const timeSpentSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

      const payload = {
        comment: {
          content: [
            {
              content: [
                {
                  text: worklogItem.content,
                  type: 'text',
                },
              ],
              type: 'paragraph',
            },
          ],
          type: 'doc',
          version: 1,
        },
        started: startTimeString,
        timeSpentSeconds: timeSpentSeconds,
      };

      const response = await fetch(getWorklogUrl(worklogItem.ticket) + '/' + worklogItem.id, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(credentials.email + ':' + credentials.apiPassword)}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to update worklog');
      }
    }

    await supabaseClient.from('worklogs')
      .update({
        id: worklogItem.id,
        issue_id: worklogItem.issueId,
        worklog_id: worklogItem.worklogId,
        ticket: worklogItem.ticket,
        content: worklogItem.content,
        started_at: worklogItem.startTime,
        ended_at: worklogItem.endTime,
      })
      .eq('id', worklogItem.id);
  }

  async function getCredentials(credentialsId: string): Promise<{ email: string, apiPassword: string }> {
    return await supabaseClient
      .from('credentials')
      .select('email, api_password')
      .eq('id', credentialsId)
      .single()
      .then((x) => {
        return {
          email: x.data!.email,
          apiPassword: x.data!.api_password,
        };
      });
  }

  return {
    save,
    load,
    remove,
    update,
  };
}
