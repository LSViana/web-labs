import { useState } from 'react';

export default function StoringState() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="flex gap-3">
      <div className="w-28 border border-blue-500 rounded flex justify-center items-center">
        Count:&nbsp;
        <span>{count}</span>
      </div>
      <button type="button" onClick={handleClick} className="px-3 py-1 bg-blue-500 text-white rounded">Increment</button>
    </div>
  );
}
