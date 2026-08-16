"use client";

import { useState } from "react";
import Link from "next/link";
import { useDevices } from "@/lib/device-context";
import PageHeader from "@/components/PageHeader";
import StatusPill from "@/components/StatusPill";
import Button from "@/components/Button";
import {
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  Lock,
  Unlock,
  MapPin,
  AlertTriangle,
  Trash2,
  BatteryMedium,
} from "lucide-react";
import type { Device } from "@/lib/types";

const iconFor: Record<Device["type"], typeof Laptop> = {
  Laptop,
  Phone: Smartphone,
  Tablet,
  Desktop: Monitor,
};

export default function ManageDevicesPage() {
  const { devices, toggleLock, markLost, eraseDevice } = useDevices();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [confirmErase, setConfirmErase] = useState<string | null>(null);

  return (
    <div>
      <PageHeader
        title="Manage Devices"
        subtitle={`${devices.length} device${devices.length === 1 ? "" : "s"} linked to your account`}
        backHref="/devices"
      />

      <div className="px-4 py-5 flex flex-col gap-3">
        {devices.length === 0 && (
          <div className="text-center py-16">
            <p className="font-body text-digi-forest/60 text-[14px]">
              No devices registered yet.
            </p>
            <Link href="/devices/register" className="text-digi-slate font-bold text-[14px]">
              Register your first device
            </Link>
          </div>
        )}

        {devices.map((device) => {
          const Icon = iconFor[device.type];
          const isOpen = expanded === device.id;
          return (
            <div key={device.id} className="rounded-xl2 border border-digi-mist overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : device.id)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <div className="w-11 h-11 rounded-full bg-digi-mist flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-digi-forest" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-semibold text-[15px] text-digi-forest truncate">
                    {device.name}
                  </p>
                  <p className="font-body text-[12px] text-digi-forest/50">
                    Last seen {device.lastSeen}
                  </p>
                </div>
                <StatusPill status={device.status} />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 flex flex-col gap-4 animate-fade-in border-t border-digi-mist pt-4">
                  <div className="flex items-center justify-between text-[13px] font-body text-digi-forest/70">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> {device.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BatteryMedium className="w-3.5 h-3.5" /> {device.battery}%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link href={`/devices/track/${device.id}`}>
                      <Button variant="ghost" fullWidth className="!h-11 !text-[14px] gap-1.5">
                        <MapPin className="w-4 h-4" /> Locate
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      fullWidth
                      className="!h-11 !text-[14px] gap-1.5"
                      onClick={() => toggleLock(device.id)}
                    >
                      {device.lockEnabled ? (
                        <>
                          <Unlock className="w-4 h-4" /> Unlock
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" /> Lock
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      className="!h-11 !text-[14px] gap-1.5"
                      onClick={() => markLost(device.id)}
                    >
                      <AlertTriangle className="w-4 h-4" /> Mark Lost
                    </Button>
                    {confirmErase === device.id ? (
                      <Button
                        variant="danger"
                        fullWidth
                        className="!h-11 !text-[13px] gap-1.5"
                        onClick={() => {
                          eraseDevice(device.id);
                          setConfirmErase(null);
                        }}
                      >
                        Confirm Erase?
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        fullWidth
                        className="!h-11 !text-[14px] gap-1.5"
                        onClick={() => setConfirmErase(device.id)}
                      >
                        <Trash2 className="w-4 h-4" /> Erase
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <Link href="/devices/register" className="mt-2">
          <Button variant="outline">+ Register Another Device</Button>
        </Link>
      </div>
    </div>
  );
}
