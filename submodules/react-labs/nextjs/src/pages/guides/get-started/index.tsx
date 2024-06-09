import RHorizontalDivider from '@/components/shared/RHorizontalDivider';
import Button from '@/components/get-started/guides/Button';
import StoringState from '@/components/get-started/guides/StoringState';
import SharingState from '@/components/get-started/guides/SharingState';

interface Product {
  id: number;
  name: string;
}

export default function GetStarted() {
  const products: Product[] = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Orange' },
    { id: 3, name: 'Papaya' },
  ];

  let content;
  if (new Date().getDate() === 20) {
    content = <p>It is the 20th.</p>;
  } else {
    content = <p>It is not the 20th.</p>;
  }

  return (
    <div>
      <p>Render attributes:</p>
      <p style={{ color: 'red' }}>
        Colored via the
        {' '}
        <code>style</code>
        {' '}
        attribute.
      </p>
      <RHorizontalDivider />
      <p>Render lists:</p>
      <ul className="list-disc ml-5">
        {products.map((x) => <li key={x.id}>{x.name}</li>)}
      </ul>
      <RHorizontalDivider />
      <p>Conditional rendering:</p>
      {content}
      <RHorizontalDivider />
      <p>Handling events:</p>
      <div className="mt-2">
        <Button />
      </div>
      <RHorizontalDivider />
      <p>Storing state:</p>
      <div className="mt-2">
        <StoringState />
      </div>
      <RHorizontalDivider />
      <p>Sharing state:</p>
      <div className="mt-2">
        <SharingState />
      </div>
    </div>
  );
}
