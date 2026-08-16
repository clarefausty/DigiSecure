"use client";

import Link from "next/link";
import { useDevices } from "@/lib/device-context";
import PageHeader from "@/components/PageHeader";
import StatusPill from "@/components/StatusPill";
import { Laptop, Smartphone, Tablet, Monitor, ChevronRight } from "lucide-react";
import type { Device } from "@/lib/types";

const iconFor: Record<Device["type"], typeof Laptop> = {
  Laptop,
  Phone: Smartphone,
  Tablet,
  Desktop: Monitor,
};

export default function TrackDevicePickerPage() {
  const { devices } = useDevices();

  return (
    <div>
      <PageHeader
        title="Device Tracking"
        subtitle="Select a device to locate on the map"
        backHref="/devices"
      />
      <div className="px-4 py-5 flex flex-col gap-3">
        {devices.map((device) => {
          const Icon = iconFor[device.type];
          return (
            <Link
              key={device.id}
              href={`/devices/track/${device.id}`}
              className="flex items-center gap-3 p-4 rounded-xl2 bg-digi-mist hover:bg-digi-fog transition-colors"
            >
              <div className="w-11 h-11 rounded-full bg-digi-forest flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-digi-cyan" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body font-semibold text-[15px] text-digi-forest truncate">
                  {device.name}
                </p>
                <p className="font-body text-[12px] text-digi-forest/50">
                  {device.location}
                </p>
              </div>
              <StatusPill status={device.status} />
              <ChevronRight className="w-5 h-5 text-digi-forest/40 shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
