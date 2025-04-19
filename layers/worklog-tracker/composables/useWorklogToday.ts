export function useWorklogToday() {
  function get() {
    const now = new Date();

    now.setHours(0, 0, 0, 0);

    return now;
  }

  return {
    get,
  };
}
