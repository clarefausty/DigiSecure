export default function MockMap({
  locating,
  found,
}: {
  locating: boolean;
  found: boolean;
}) {
  return (
    <div className="relative w-full h-[280px] rounded-xl2 overflow-hidden bg-[#DCE6DF]">
      <svg
        viewBox="0 0 400 280"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="400" height="280" fill="#DCE6DF" />
        {/* streets */}
        <g stroke="#C3D2C8" strokeWidth="6">
          <line x1="0" y1="60" x2="400" y2="70" />
          <line x1="0" y1="150" x2="400" y2="140" />
          <line x1="0" y1="230" x2="400" y2="235" />
          <line x1="70" y1="0" x2="60" y2="280" />
          <line x1="190" y1="0" x2="200" y2="280" />
          <line x1="320" y1="0" x2="330" y2="280" />
        </g>
        {/* blocks */}
        <g fill="#CFE0D4">
          <rect x="90" y="10" width="80" height="40" rx="4" />
          <rect x="220" y="90" width="70" height="45" rx="4" />
          <rect x="30" y="170" width="100" height="45" rx="4" />
          <rect x="240" y="180" width="70" height="35" rx="4" />
        </g>
      </svg>

      {/* pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        {locating && !found && (
          <div className="absolute w-16 h-16 rounded-full bg-digi-sage/40 animate-ping" />
        )}
        {found && (
          <div className="absolute w-20 h-20 rounded-full bg-digi-sage/30 animate-pulse" />
        )}
        <div
          className={`relative w-5 h-5 rounded-full border-4 border-white shadow-lg ${
            found ? "bg-digi-forest" : "bg-digi-steel"
          }`}
        />
      </div>

      {!locating && !found && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/40">
          <p className="font-body text-[13px] text-digi-forest/70 bg-white px-3 py-1.5 rounded-full shadow">
            Tap Locate Device to begin
          </p>
        </div>
      )}
    </div>
  );
}
