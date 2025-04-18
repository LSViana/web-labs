export function usePomodoroToday() {
  function get() {
    const today = new Date()

    today.setHours(0, 0, 0, 0)

    return today
  }

  function isToday(date: Date) {
    return isSameDay(get(), date)
  }

  // TODO: Maybe this should be refactored somewhere else.
  function isSameDay(date1: Date, date2: Date) {
    return date1.getFullYear() === date2.getFullYear()
      && date1.getMonth() === date2.getMonth()
      && date1.getDate() === date2.getDate()
  }

  return {
    get,
    isToday,
    isSameDay,
  }
}
