import { PomodoroRecord } from "~/composables/server/pomodoro/types/pomodoroRecord"
import { useProductivitySupabaseClient } from '~/server/services/productivity/database'

const supabaseClient = useProductivitySupabaseClient()

export function usePomodoroStorage() {
  async function load(credentialsId: string, date: Date): Promise<PomodoroRecord[]> {
    const startOfDay = date
    const endOfDay = new Date(date)
    endOfDay.setHours(endOfDay.getHours() + 24)

    const result = await supabaseClient
      .from('pomodoros')
      .select('*')
      .eq('credential_id', credentialsId)
      .filter('started_at', 'gte', startOfDay.toISOString())
      .filter('started_at', 'lt', endOfDay.toISOString())
      .order('started_at', { ascending: true })

    if (!result.data || result.data.length === 0) {
      return []
    }

    return result.data.map(x => new PomodoroRecord(
      x.id,
      new Date(x.started_at),
      new Date(x.ended_at),
      x.type,
    ))
  }

  async function save(pomodoroRecord: PomodoroRecord, credentialsId: string): Promise<PomodoroRecord> {
    const result = await supabaseClient
      .from('pomodoros')
      .insert({
        started_at: pomodoroRecord.startTime,
        ended_at: pomodoroRecord.endTime,
        type: pomodoroRecord.type,
        credential_id: credentialsId
      })
      .select()

    return new PomodoroRecord(
      result.data![0].id,
      pomodoroRecord.startTime,
      pomodoroRecord.endTime,
      pomodoroRecord.type
    )
  }

  async function remove(pomodoroRecordId: string, credentialsId: string): Promise<void> {
    const result = await supabaseClient.from('pomodoros')
      .delete()
      .eq('id', pomodoroRecordId)
      .eq('credential_id', credentialsId)

    console.log(result);
  }

  async function update(pomodoroRecord: PomodoroRecord, credentialsId: string): Promise<void> {
    const result = await supabaseClient.from('pomodoros')
      .update({
        id: pomodoroRecord.id,
        started_at: pomodoroRecord.startTime,
        ended_at: pomodoroRecord.endTime,
        type: pomodoroRecord.type
      })
      .eq('id', pomodoroRecord.id)
      .eq('credential_id', credentialsId)

    console.log(result);
  }

  return {
    save,
    load,
    remove,
    update
  }
}
