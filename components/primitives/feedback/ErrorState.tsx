interface Props {
  title?: string;

  description?: string;
}

export default function ErrorState({
  title = "Something went wrong",
  description = "Please try again later.",
}: Props) {
  return (
    <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8">
      <h2 className="text-lg font-semibold text-red-400">
        {title}
      </h2>

      <p className="mt-2 text-sm opacity-70">
        {description}
      </p>
    </div>
  );
}