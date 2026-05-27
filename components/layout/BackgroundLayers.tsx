export default function BackgroundLayers() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-white/5 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-white/5 blur-3xl" />
      </div>
    </>
  );
}