type SquareProps = {
  value: string;
  highlight: boolean;
  onClick: () => void;
};

export default function Square(props: SquareProps) {
  const { value, highlight, onClick } = props;

  let classes = 'w-8 h-8 border font-bold';

  if (highlight) {
    classes += ' bg-gray-400/50';
  }

  return (
    <button type="button" className={classes} onClick={onClick}>{value}</button>
  );
}
