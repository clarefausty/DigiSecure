"use client";

import Link from "next/link";
import { useDevices } from "@/lib/device-context";
import PageHeader from "@/components/PageHeader";
import {
  PlusCircle,
  ListChecks,
  MapPinned,
  ShieldQuestion,
  SlidersHorizontal,
  ScrollText,
  ChevronRight,
} from "lucide-react";

const links = [
  {
    href: "/devices/register",
    icon: PlusCircle,
    title: "Device Registration",
    desc: "Add a new laptop, phone, or tablet to your account.",
  },
  {
    href: "/devices/manage",
    icon: ListChecks,
    title: "Manage Devices",
    desc: "View, lock, or remove devices linked to DigiSecure.",
  },
  {
    href: "/devices/track",
    icon: MapPinned,
    title: "Device Monitoring & Tracking",
    desc: "Find a lost or stolen device on the live map.",
  },
  {
    href: "/devices/manage",
    icon: ShieldQuestion,
    title: "Security Tips",
    desc: "Best practices to keep your devices protected.",
  },
  {
    href: "/account",
    icon: SlidersHorizontal,
    title: "Settings & Privacy",
    desc: "Manage notifications, privacy, and account controls.",
  },
];

export default function DevicesHubPage() {
  const { devices, log } = useDevices();

  return (
    <div>
      <PageHeader
        title="Device Management"
        subtitle={`${devices.length} device${devices.length === 1 ? "" : "s"} registered`}
        backHref="/home"
      />

      <div className="px-4 py-5 flex flex-col gap-3">
        {links.map(({ href, icon: Icon, title, desc }) => (
          <Link
            key={title}
            href={href}
            className="flex items-center gap-4 p-4 rounded-xl2 bg-digi-mist hover:bg-digi-fog transition-colors"
          >
            <div className="w-11 h-11 rounded-full bg-digi-forest flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-digi-cyan" strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body font-semibold text-[15px] text-digi-forest">
                {title}
              </p>
              <p className="font-body text-[13px] text-digi-forest/60 truncate">
                {desc}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-digi-forest/40 shrink-0" />
          </Link>
        ))}
      </div>

      {log.length > 0 && (
        <div className="px-4 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <ScrollText className="w-4 h-4 text-digi-forest/60" />
            <h2 className="font-body font-semibold text-[14px] text-digi-forest/80">
              Recent Activity
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            {log.slice(0, 4).map((entry) => (
              <div key={entry.id} className="text-[13px] font-body text-digi-forest/70 border-l-2 border-digi-sage pl-3 py-0.5">
                {entry.message}
                <span className="block text-[11px] text-digi-steel">{entry.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
