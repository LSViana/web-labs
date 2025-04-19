export function useWorklogNow() {
  function get() {
    const now = new Date();

    now.setSeconds(0);

    return now;
  }

  return {
    get,
  };
}
