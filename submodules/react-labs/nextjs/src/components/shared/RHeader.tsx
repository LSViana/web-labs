import RLink from '@/components/shared/RLink';

export default function RHeader() {
  return (
    <header className="mb-4">
      <nav className="flex flex-col md:flex-row justify-between items-start">
        <div>
          <p>React.js Experiments</p>
          <p className="opacity-50 -mt-1 text-xs">by Lucas Viana</p>
        </div>
        <div className="flex flex-col md:flex-row mt-5 md:mt-0 gap-1 md:gap-3">
          <RLink href="/">Home</RLink>
          <RLink href="/guides/get-started">Get Started</RLink>
          <RLink href="/guides/tic-tac-toe">Tic Tac Toe</RLink>
        </div>
      </nav>
    </header>
  );
}
