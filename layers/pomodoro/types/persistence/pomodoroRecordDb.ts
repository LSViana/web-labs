export interface PomodoroRecordDb {
  id: number | undefined
  started_at: string
  ended_at: string
  type: 'work' | 'break'
  credential_id: string
}
