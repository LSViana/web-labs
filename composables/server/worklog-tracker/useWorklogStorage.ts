import { WorklogItem } from '~/composables/server/worklog-tracker/types/worklogItem'
import { useWorklogSupabaseClient } from '~/composables/server/worklog-tracker/useWorklogSupabaseClient'

function getWorklogUrl(ticket: string): string {
  return 'https://gemmeus.atlassian.net/rest/api/3/issue/' + ticket + '/worklog'
}

const supabaseClient = useWorklogSupabaseClient()

export function useWorklogStorage() {
  async function load(credentialsId: string, date: Date): Promise<WorklogItem[]> {
    const startOfDay = date
    const endOfDay = new Date(date)
    endOfDay.setHours(endOfDay.getHours() + 24)

    const result = await supabaseClient
      .from('worklogs')
      .select('*')
      .eq('credential_id', credentialsId)
      .filter('started_at', 'gte', startOfDay.toISOString())
      .filter('started_at', 'lt', endOfDay.toISOString())

    if (!result.data || result.data.length === 0) {
      return []
    }

    return result.data.map(x => new WorklogItem(
      x.ticket,
      x.content,
      new Date(x.started_at),
      new Date(x.ended_at),
      x.id,
      x.issue_id
    ))
  }

  async function save(worklogItem: WorklogItem, credentialsId: string): Promise<WorklogItem> {
    const {
      email,
      password
    } = await getCredentials(credentialsId)

    const startTime = new Date(worklogItem.startTime)
    const endTime = new Date(worklogItem.endTime)

    const startTimeString = startTime.toISOString().replace('Z', '-0000')
    const timeSpentSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000)
    const payload = {
      'comment': {
        'content': [
          {
            'content': [
              {
                'text': worklogItem.content,
                'type': 'text'
              }
            ],
            'type': 'paragraph'
          }
        ],
        'type': 'doc',
        'version': 1
      },
      'started': startTimeString,
      'timeSpentSeconds': timeSpentSeconds
    }

    const response = await fetch(getWorklogUrl(worklogItem.ticket), {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(email + ':' + password)}`
      }
    })

    if (response.status !== 201) {
      throw new Error('Failed to create worklog')
    }

    const jiraResponseBody = await response.json() as { id: string; issueId: string; }

    const result = await supabaseClient.from('worklogs').insert({
      id: jiraResponseBody.id,
      issue_id: jiraResponseBody.issueId,
      ticket: worklogItem.ticket,
      content: worklogItem.content,
      started_at: worklogItem.startTime,
      ended_at: worklogItem.endTime,
      credential_id: credentialsId
    })

    console.log(result)

    return new WorklogItem(
      worklogItem.ticket,
      worklogItem.content,
      worklogItem.startTime,
      worklogItem.endTime,
      jiraResponseBody.id,
      jiraResponseBody.issueId
    )
  }

  async function remove(issueId: string, worklogId: string, credentialsId: string): Promise<void> {
    const {
      email,
      password
    } = await getCredentials(credentialsId)

    const response = await fetch(getWorklogUrl(issueId) + '/' + worklogId + '?adjustEstimate=leave', {
      method: 'DELETE',
      headers: {
        'Authorization': `Basic ${btoa(email + ':' + password)}`
      }
    })

    if (response.status !== 204) {
      throw new Error('Failed to remove worklog')
    }

    await supabaseClient.from('worklogs').delete().eq('id', worklogId)
  }

  async function update(worklogItem: WorklogItem, credentialsId: string): Promise<void> {
    const {
      email,
      password
    } = await getCredentials(credentialsId)

    const startTime = new Date(worklogItem.startTime)
    const endTime = new Date(worklogItem.endTime)

    const startTimeString = startTime.toISOString().replace('Z', '-0000')
    const timeSpentSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000)

    const payload = {
      'comment': {
        'content': [
          {
            'content': [
              {
                'text': worklogItem.content,
                'type': 'text'
              }
            ],
            'type': 'paragraph'
          }
        ],
        'type': 'doc',
        'version': 1
      },
      'started': startTimeString,
      'timeSpentSeconds': timeSpentSeconds
    }

    const response = await fetch(getWorklogUrl(worklogItem.ticket) + '/' + worklogItem.id, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(email + ':' + password)}`
      }
    })

    if (response.status !== 200) {
      throw new Error('Failed to update worklog')
    }

    const jiraResponseBody = await response.json() as { id: string; issueId: string; }

    await supabaseClient.from('worklogs')
      .update({
        id: jiraResponseBody.id,
        issue_id: jiraResponseBody.issueId,
        ticket: worklogItem.ticket,
        content: worklogItem.content,
        started_at: worklogItem.startTime,
        ended_at: worklogItem.endTime
      })
      .eq('id', jiraResponseBody.id)
  }

  async function getCredentials(credentialsId: string): Promise<{ email: string, password: string }> {
    return supabaseClient
      .from('credentials')
      .select('email, password')
      .eq('id', credentialsId)
      .single()
      .then(x => {
        return {
          email: x.data!.email,
          password: x.data!.password
        }
      })
  }

  return {
    save,
    load,
    remove,
    update
  }
}
