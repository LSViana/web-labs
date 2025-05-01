import { WorklogItem } from '~~/layers/worklog-tracker/types/client/worklogItem';
import type { WorklogItemDb } from '~~/layers/worklog-tracker/types/persistence/worklogItemDb';
import type { WorklogItemDto } from '~~/layers/worklog-tracker/types/transfer/worklogItemDto';

export const WorklogItemMapper = {
  fromClient(item: WorklogItem): WorklogItemDto {
    return {
      id: item.id,
      ticket: item.ticket,
      content: item.content,
      startTime: item.startTime.toISOString(),
      endTime: item.endTime.toISOString(),
      issueId: item.issueId,
      worklogId: item.worklogId,
    };
  },
  toClient(item: WorklogItemDto): WorklogItem {
    return new WorklogItem(
      item.id,
      item.ticket,
      item.content,
      new Date(item.startTime),
      new Date(item.endTime),
      item.issueId,
      item.worklogId,
    );
  },
  fromDb(item: WorklogItemDb): WorklogItemDto {
    return {
      id: item.id,
      ticket: item.ticket,
      content: item.content,
      startTime: item.started_at,
      endTime: item.ended_at,
      issueId: item.issue_id,
      worklogId: item.worklog_id,
    };
  },
  toDb(item: WorklogItemDto, credentialsId: string): WorklogItemDb {
    return {
      id: item.id,
      ticket: item.ticket,
      content: item.content,
      started_at: item.startTime,
      ended_at: item.endTime,
      issue_id: item.issueId,
      worklog_id: item.worklogId,
      credential_id: credentialsId,
    };
  },
};
