// components/ui/table.tsx

type TableProps = {
  headers: string[];
  children: React.ReactNode;
};

export default function Table({
  headers,
  children,
}: TableProps) {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead
            className="
              border-b border-white/10
              bg-white/5
            "
          >
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="
                    px-6 py-4
                    text-left text-sm
                    font-semibold
                  "
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}