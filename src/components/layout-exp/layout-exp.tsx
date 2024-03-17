export default function LayoutExp() {
  const items = ['A', 'B', 'C'];

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-slate-100 p-4 md:flex-row">
      {items.map((item) => (
        <div
          // Example key; would fail if a string in `items` is duplicated
          key={item}
          className="w-96 rounded bg-white p-4 shadow hover:cursor-pointer hover:shadow-md"
        >
          {item}
        </div>
      ))}
    </div>
  );
}
