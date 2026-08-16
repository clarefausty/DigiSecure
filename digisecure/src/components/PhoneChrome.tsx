export default function PhoneChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh w-full bg-digi-dark md:flex md:items-center md:justify-center md:py-10">
      <div className="mx-auto w-full max-w-app min-h-dvh md:min-h-[860px] md:h-[860px] bg-white relative overflow-y-auto md:rounded-[40px] md:shadow-2xl md:ring-8 md:ring-black/80 md:overflow-hidden">
        {children}
      </div>
    </div>
  );
}
