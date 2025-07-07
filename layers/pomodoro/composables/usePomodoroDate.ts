export function usePomodoroDate() {
  function getByDate(date: Date) {
    const result = new Date(date);

    if (result.getMilliseconds() < 500) {
      result.setMilliseconds(0);
    }
    else {
      result.setMilliseconds(1_000);
    }

    return result;
  }

  function getNow() {
    return getByDate(new Date());
  }

  return {
    getByDate,
    getNow,
  };
}
