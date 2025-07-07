export function usePomodoroNow() {
  function getByDate(date: Date) {
    const result = new Date(date);

    const now = new Date();
    result.setHours(now.getHours());
    result.setMinutes(now.getMinutes());
    result.setSeconds(now.getSeconds());

    if (result.getMilliseconds() < 500) {
      result.setMilliseconds(0);
    }
    else {
      result.setMilliseconds(1_000);
    }

    return result;
  }

  function getToday() {
    return getByDate(new Date());
  }

  return {
    getByDate,
    getToday,
  };
}
