export interface WorklogItemDb {
  id: string | undefined
  ticket: string
  content: string
  started_at: string
  ended_at: string
  issue_id: string
  worklog_id: string
  credential_id: string
}
