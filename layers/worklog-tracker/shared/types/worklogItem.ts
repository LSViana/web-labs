import { useWorklogNow } from '~~/layers/worklog-tracker/shared/useWorklogNow';

const worklogNow = useWorklogNow();

export class WorklogItem {
  public id: string;
  public ticket: string;
  public content: string;
  public startTime: Date;
  public endTime: Date;
  public issueId: string;
  public worklogId: string;

  constructor(
    id = '',
    ticket = '',
    content = '',
    startTime = worklogNow.get(),
    endTime = worklogNow.get(),
    issueId = '',
    worklogId = '',
  ) {
    this.id = id;
    this.ticket = ticket;
    this.content = content;
    this.startTime = startTime;
    this.endTime = endTime;
    this.worklogId = worklogId;
    this.issueId = issueId;
  }

  public get durationSeconds(): number {
    return WorklogItem.calculateDuration(this.startTime, this.endTime);
  }

  public static calculateDuration(startTime: Date, endTime: Date): number {
    return Math.round((endTime.getTime() - startTime.getTime()) / 1000);
  }
}
