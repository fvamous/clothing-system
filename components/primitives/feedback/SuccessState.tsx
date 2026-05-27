export default function SuccessState({
  title = "Berhasil",
}: {
  title?: string;
}) {
  return (
    <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6">
      <p className="text-sm text-emerald-400">{title}</p>
    </div>
  );
}