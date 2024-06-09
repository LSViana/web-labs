import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface RlLinkProps {
  href: string;
}

export default function RLink(props: PropsWithChildren<RlLinkProps>) {
  const { href, children } = props;

  return (
    <Link href={href} className="text-blue-400 underline font-medium">
      {children}
    </Link>
  );
}
