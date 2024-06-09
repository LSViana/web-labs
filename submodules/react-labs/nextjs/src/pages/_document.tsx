import {
  Html, Head, Main, NextScript,
} from 'next/document';
import RHeader from '@/components/shared/RHeader';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="p-6 md:p-12 xl:p-24">
        <RHeader />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
