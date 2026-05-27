export default function TableToolbar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
      {children}
    </div>
  );
}