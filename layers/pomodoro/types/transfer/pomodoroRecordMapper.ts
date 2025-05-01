import { PomodoroRecord } from '~~/layers/pomodoro/types/client/pomodoroRecord';
import type { PomodoroIntervalType } from '~~/layers/pomodoro/types/client/pomodoroType';
import type { PomodoroRecordDb } from '~~/layers/pomodoro/types/persistence/pomodoroRecordDb';
import type { PomodoroRecordDto } from '~~/layers/pomodoro/types/transfer/pomodoroRecordDto';

export const PomodoroRecordMapper = {
  fromClient(record: PomodoroRecord): PomodoroRecordDto {
    return {
      id: record.id,
      startTime: record.startTime.toISOString(),
      endTime: record.endTime.toISOString(),
      type: record.type,
    };
  },
  toClient(record: PomodoroRecordDto): PomodoroRecord {
    return new PomodoroRecord(record.id, new Date(record.startTime), new Date(record.endTime), record.type as PomodoroIntervalType);
  },
  fromDb(record: PomodoroRecordDb): PomodoroRecordDto {
    return {
      id: record.id,
      startTime: record.started_at,
      endTime: record.ended_at,
      type: record.type,
    };
  },
  toDb(record: PomodoroRecordDto, credentialsId: string): PomodoroRecordDb {
    return {
      id: record.id,
      started_at: record.startTime,
      ended_at: record.endTime,
      type: record.type,
      credential_id: credentialsId,
    };
  },
};
