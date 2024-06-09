import { PropsWithChildren } from 'react';

export default function BoardRow(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className="flex">{children}</div>
  );
}
