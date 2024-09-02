import { useWorklogNow } from '~/composables/server/worklog-tracker/useWorklogNow'

const worklogNow = useWorklogNow()

export class WorklogItem {
  public ticket: string
  public content: string
  public startTime: Date
  public endTime: Date
  public id: string
  public issueId: string

  constructor(
    ticket = '',
    content = '',
    startTime = worklogNow.get(),
    endTime = worklogNow.get(),
    workogId = '',
    issueId = ''
  ) {
    this.ticket = ticket
    this.content = content
    this.startTime = startTime
    this.endTime = endTime
    this.id = workogId
    this.issueId = issueId
  }
}
