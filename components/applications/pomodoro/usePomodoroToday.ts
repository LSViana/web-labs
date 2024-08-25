export function usePomodoroToday() {
  function get() {
    const today = new Date()

    today.setHours(0, 0, 0, 0)

    return today
  }

  function isToday(date: Date) {
    const today = get()

    return date.getFullYear() === today.getFullYear()
      && date.getMonth() === today.getMonth()
      && date.getDate() === today.getDate()
  }

  return {
    get,
    isToday
  }
}
