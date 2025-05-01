import { useProductivitySupabaseClient } from '~~/layers/productivity/server/services/database';
import type { WorklogItemDto } from '~~/layers/worklog-tracker/types/transfer/worklogItemDto';
import { WorklogItemMapper } from '~~/layers/worklog-tracker/types/transfer/worklogItemMapper';

function getWorklogUrl(ticket: string): string {
  return 'https://gemmeus.atlassian.net/rest/api/3/issue/' + ticket + '/worklog';
}

const supabaseClient = useProductivitySupabaseClient();

export function useWorklogStorage() {
  async function load(credentialsId: string, date: Date): Promise<WorklogItemDto[]> {
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

    return result.data.map(WorklogItemMapper.fromDb);
  }

  async function save(worklogItem: WorklogItemDto, credentialsId: string): Promise<WorklogItemDto> {
    const credentials = await getCredentials(credentialsId);
    const worklogItemDb = WorklogItemMapper.toDb(worklogItem, credentialsId);

    let jiraResponseBody: { worklogId: string, issueId: string };

    if (credentials.apiPassword) {
      const startTime = new Date(worklogItemDb.started_at);
      const endTime = new Date(worklogItemDb.ended_at);

      const startTimeString = startTime.toISOString().replace('Z', '-0000');
      const timeSpentSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
      const payload = {
        comment: {
          content: [
            {
              content: [
                {
                  text: worklogItemDb.content,
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

      const response = await fetch(getWorklogUrl(worklogItemDb.ticket), {
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
        ticket: worklogItemDb.ticket,
        content: worklogItemDb.content,
        started_at: worklogItemDb.started_at,
        ended_at: worklogItemDb.ended_at,
        credential_id: credentialsId,
      })
      .select();

    return WorklogItemMapper.fromDb(result.data![0]);
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

  async function update(worklogItem: WorklogItemDto, credentialsId: string): Promise<void> {
    const credentials = await getCredentials(credentialsId);
    const worklogItemDb = WorklogItemMapper.toDb(worklogItem, credentialsId);

    if (credentials.apiPassword) {
      const startTime = new Date(worklogItemDb.started_at);
      const endTime = new Date(worklogItemDb.ended_at);

      const startTimeString = startTime.toISOString().replace('Z', '-0000');
      const timeSpentSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

      const payload = {
        comment: {
          content: [
            {
              content: [
                {
                  text: worklogItemDb.content,
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

      const response = await fetch(getWorklogUrl(worklogItemDb.ticket) + '/' + worklogItemDb.worklog_id, {
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
      .update(worklogItemDb)
      .eq('id', worklogItemDb.id);
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
