export interface WorklogItemDto {
  id: string | undefined
  ticket: string
  content: string
  startTime: string
  endTime: string
  issueId: string
  worklogId: string
}
