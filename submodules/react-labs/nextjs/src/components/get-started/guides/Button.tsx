export default function Button() {
  function handleClick() {
    // Suppressed because it's just a demonstration.
    // eslint-disable-next-line no-alert
    alert('The button was clicked.');
  }

  return (
    <button type="button" className="px-3 py-1 bg-blue-500 text-white rounded" onClick={handleClick}>Click</button>
  );
}
