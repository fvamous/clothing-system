import FieldError from "./FieldError";
import FieldLabel from "./FieldLabel";

export default function FormField({
  label,
  error,
  children,
}: {
  label?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      {label && (
        <FieldLabel>{label}</FieldLabel>
      )}

      {children}

      <FieldError error={error} />
    </div>
  );
}