export function useLeaveConfirmation() {
  function beforeUnload(event: BeforeUnloadEvent) {
    event.preventDefault();
  }

  function hold() {
    window.addEventListener('beforeunload', beforeUnload);
  }

  function release() {
    window.removeEventListener('beforeunload', beforeUnload);
  }

  return {
    hold,
    release,
  };
}
