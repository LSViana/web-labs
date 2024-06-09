import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  /**
   * The rule is disabled in the next line because
   * these are Next.js props that we don't control.
   */
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}
