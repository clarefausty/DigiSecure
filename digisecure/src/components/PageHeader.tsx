import BackButton from "./BackButton";

export default function PageHeader({
  title,
  subtitle,
  backHref,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
}) {
  return (
    <div className="px-4 pt-6 pb-4 flex flex-col gap-3 bg-white sticky top-0 z-10 border-b border-digi-mist">
      <BackButton href={backHref} />
      <div>
        <h1 className="font-display font-bold text-[24px] text-digi-forest">
          {title}
        </h1>
        {subtitle && (
          <p className="font-body text-[14px] text-digi-forest/60 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
