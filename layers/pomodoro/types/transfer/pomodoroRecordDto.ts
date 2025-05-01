export interface PomodoroRecordDto {
  id: number | undefined
  startTime: string
  endTime: string
  type: 'work' | 'break'
}
