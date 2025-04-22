export interface PomodoroRecordDto {
  id: number
  startTime: string
  endTime: string
  type: 'work' | 'break'
}
