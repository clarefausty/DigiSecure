import StatusBar from "./StatusBar";
import HomeBar from "./HomeBar";

export default function AuthHero({
  children,
  topSlot,
}: {
  children: React.ReactNode;
  topSlot?: React.ReactNode;
}) {
  return (
    <div className="relative min-h-dvh flex flex-col bg-digi-forest overflow-hidden">
      {/* Ambient security-grid backdrop instead of a stock photo */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(#E1E6E3 1px, transparent 1px), linear-gradient(90deg, #E1E6E3 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-digi-sage/25 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-digi-cyan/10 blur-3xl"
      />
      <div className="relative z-10 flex flex-col min-h-dvh">
        <StatusBar light />
        {topSlot}
        <div className="flex-1 flex flex-col px-4 pb-8">{children}</div>
        <HomeBar light />
      </div>
    </div>
  );
}
