interface PaginationProps {
  page: number;
  total: number;
}

export default function Pagination({
  page,
  total,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between py-4 text-sm text-muted-foreground">
      <span>
        Page {page}
      </span>

      <span>
        Total {total}
      </span>
    </div>
  );
}