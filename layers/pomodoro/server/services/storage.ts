import type { PomodoroRecordDto } from '~~/layers/pomodoro/types/transfer/pomodoroRecordDto';
import { PomodoroRecordMapper } from '~~/layers/pomodoro/types/transfer/pomodoroRecordMapper';
import { useProductivitySupabaseClient } from '~~/layers/productivity/server/services/database';

const supabaseClient = useProductivitySupabaseClient();

export function usePomodoroStorage() {
  async function load(credentialsId: string, date: Date): Promise<PomodoroRecordDto[]> {
    const startOfDay = date;
    const endOfDay = new Date(date);
    endOfDay.setHours(endOfDay.getHours() + 24);

    const result = await supabaseClient
      .from('pomodoros')
      .select('*')
      .eq('credential_id', credentialsId)
      .filter('started_at', 'gte', startOfDay.toISOString())
      .filter('started_at', 'lt', endOfDay.toISOString())
      .order('started_at', { ascending: true });

    if (!result.data || result.data.length === 0) {
      return [];
    }

    return result.data.map(PomodoroRecordMapper.fromDb);
  }

  async function save(pomodoroRecord: PomodoroRecordDto, credentialsId: string): Promise<PomodoroRecordDto> {
    const result = await supabaseClient
      .from('pomodoros')
      .insert({
        started_at: pomodoroRecord.startTime,
        ended_at: pomodoroRecord.endTime,
        type: pomodoroRecord.type,
        credential_id: credentialsId,
      })
      .select();

    return PomodoroRecordMapper.fromDb(result.data![0]);
  }

  async function remove(pomodoroRecordId: string, credentialsId: string): Promise<void> {
    await supabaseClient.from('pomodoros')
      .delete()
      .eq('id', pomodoroRecordId)
      .eq('credential_id', credentialsId);
  }

  async function update(pomodoroRecord: PomodoroRecordDto, credentialsId: string): Promise<void> {
    const pomodoroRecordDb = PomodoroRecordMapper.toDb(pomodoroRecord, credentialsId);

    await supabaseClient.from('pomodoros')
      .update(pomodoroRecordDb)
      .eq('id', pomodoroRecord.id)
      .eq('credential_id', credentialsId);
  }

  return {
    save,
    load,
    remove,
    update,
  };
}
