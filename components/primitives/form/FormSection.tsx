import Panel from "../surface/Panel";

export default function FormSection({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Panel className="space-y-6">
      {title && (
        <h3 className="text-lg font-semibold">
          {title}
        </h3>
      )}

      {children}
    </Panel>
  );
}