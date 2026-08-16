export default function Logo({
  size = 64,
  showWordmark = true,
  tagline,
}: {
  size?: number;
  showWordmark?: boolean;
  tagline?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 4C20 4 10 8 10 8v18c0 16 9.5 26.5 22 34 12.5-7.5 22-18 22-34V8s-10-4-22-4Z"
          stroke="#26D2D0"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M32 16v10m0 0-6 6m6-6 6 6m-6-6v16"
          stroke="#26D2D0"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="26" cy="32" r="1.6" fill="#26D2D0" />
        <circle cx="38" cy="32" r="1.6" fill="#26D2D0" />
        <circle cx="32" cy="42" r="1.6" fill="#26D2D0" />
      </svg>
      {showWordmark && (
        <div className="flex flex-col items-center">
          <span className="font-display font-bold text-digi-cyan text-2xl tracking-wide">
            DIGISECURE
          </span>
          {tagline && (
            <span className="text-white/80 text-[11px] tracking-[0.25em] font-body -mt-0.5">
              {tagline.toUpperCase()}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
