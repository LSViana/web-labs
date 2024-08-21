export function useToday() {
  function get() {
    const today = new Date()

    today.setHours(0, 0, 0, 0)

    return today
  }

  return {
    get
  }
}
