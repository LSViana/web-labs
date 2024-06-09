import { MouseEventHandler, useState } from 'react';

type SharingStateChildProps = {
  count: number;
  onClick: MouseEventHandler;
};

export function SharingStateChild(props: SharingStateChildProps) {
  const { count, onClick } = props;

  return (
    <div className="flex gap-3">
      <div className="w-28 border border-blue-500 rounded flex justify-center items-center">
        Count:&nbsp;
        <span>{count}</span>
      </div>
      <button type="button" onClick={onClick} className="px-3 py-1 bg-blue-500 text-white rounded">Increment</button>
    </div>
  );
}

export default function SharingState() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="flex flex-col gap-3">
      <SharingStateChild count={count} onClick={handleClick} />
      <SharingStateChild count={count} onClick={handleClick} />
    </div>
  );
}
