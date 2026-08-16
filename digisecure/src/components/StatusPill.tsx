import type { DeviceStatus } from "@/lib/types";

const config: Record<DeviceStatus, { label: string; bg: string; text: string }> = {
  secure: { label: "Secure", bg: "bg-[#E4F2E7]", text: "text-[#2F7A45]" },
  "at-risk": { label: "At Risk", bg: "bg-[#FBE7E5]", text: "text-[#B3413C]" },
  offline: { label: "Offline", bg: "bg-digi-mist", text: "text-digi-steel" },
};

export default function StatusPill({ status }: { status: DeviceStatus }) {
  const c = config[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold font-body ${c.bg} ${c.text}`}
    >
      {c.label}
    </span>
  );
}
