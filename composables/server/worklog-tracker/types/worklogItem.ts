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

  public get durationSeconds(): number {
    return WorklogItem.calculateDuration(this.startTime, this.endTime)
  }

  public static calculateDuration(startTime: Date, endTime: Date): number {
    return Math.round((endTime.getTime() - startTime.getTime()) / 1000)
  }
}
