export default function HomeBar({ light = false }: { light?: boolean }) {
  return (
    <div className="flex justify-center py-2">
      <div className={`h-[5px] w-[135px] rounded-full ${light ? "bg-white" : "bg-digi-forest/30"}`} />
    </div>
  );
}
