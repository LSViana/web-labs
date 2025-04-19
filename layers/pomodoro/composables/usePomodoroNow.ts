export function usePomodoroNow() {
  function get() {
    const now = new Date();

    if (now.getMilliseconds() < 500) {
      now.setMilliseconds(0);
    }
    else {
      now.setMilliseconds(1_000);
    }

    return now;
  }

  return {
    get,
  };
}
