export type ExampleProps = {
  number: number;
};

export function Example({ number }: ExampleProps) {
  return <p className="bg-cyan-300 p-5 text-3xl">Example {number}</p>;
}
