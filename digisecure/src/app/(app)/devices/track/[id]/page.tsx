"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useDevices } from "@/lib/device-context";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import MockMap from "@/components/MockMap";
import StatusPill from "@/components/StatusPill";
import {
  MapPin,
  Lock,
  Volume2,
  AlertTriangle,
  RefreshCcw,
  XCircle,
  CheckCircle2,
} from "lucide-react";

type Phase = "idle" | "locating" | "success" | "error";

export default function TrackDeviceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { devices, locateDevice, toggleLock, markLost } = useDevices();
  const device = devices.find((d) => d.id === id);
  const [phase, setPhase] = useState<Phase>("idle");

  if (!device) {
    return (
      <div>
        <PageHeader title="Device Not Found" backHref="/devices/track" />
        <div className="px-4 py-10 text-center">
          <p className="font-body text-digi-forest/60 text-[14px]">
            We couldn&rsquo;t find that device on your account.
          </p>
        </div>
      </div>
    );
  }

  async function handleLocate() {
    setPhase("locating");
    try {
      if (device!.status === "offline") {
        await new Promise((r) => setTimeout(r, 1400));
        setPhase("error");
        return;
      }
      await locateDevice(device!.id);
      setPhase("success");
    } catch {
      setPhase("error");
    }
  }

  return (
    <div>
      <PageHeader title="Device Tracking" backHref="/devices/track" />

      <div className="px-4 py-5 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display font-bold text-[18px] text-digi-forest">
              {device.name}
            </p>
            <p className="font-body text-[12px] text-digi-forest/50">
              {device.type} · Last seen {device.lastSeen}
            </p>
          </div>
          <StatusPill status={device.status} />
        </div>

        <MockMap locating={phase === "locating"} found={phase === "success"} />

        {phase === "idle" && (
          <Button onClick={handleLocate} className="gap-2">
            <MapPin className="w-4 h-4" /> Locate Device
          </Button>
        )}

        {phase === "locating" && (
          <Button loading disabled variant="ghost">
            Locating device…
          </Button>
        )}

        {phase === "success" && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="flex items-start gap-3 bg-[#E4F2E7] rounded-xl2 p-4">
              <CheckCircle2 className="w-5 h-5 text-[#2F7A45] shrink-0 mt-0.5" />
              <div>
                <p className="font-body font-semibold text-[14px] text-[#2F7A45]">
                  Device located successfully
                </p>
                <p className="font-body text-[13px] text-[#2F7A45]/80 mt-0.5">
                  Found near {device.location} · {device.lat.toFixed(4)}, {device.lng.toFixed(4)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="ghost"
                className="!h-12 gap-1.5"
                onClick={() => toggleLock(device.id)}
              >
                <Lock className="w-4 h-4" /> {device.lockEnabled ? "Unlock" : "Lock"} Device
              </Button>
              <Button
                variant="ghost"
                className="!h-12 gap-1.5"
                onClick={() => alert(`Playing sound on ${device.name}…`)}
              >
                <Volume2 className="w-4 h-4" /> Play Sound
              </Button>
              <Button
                variant="outline"
                className="!h-12 gap-1.5 col-span-2"
                onClick={() => markLost(device.id)}
              >
                <AlertTriangle className="w-4 h-4" /> Mark as Lost &amp; Notify Security Team
              </Button>
            </div>

            <button
              onClick={handleLocate}
              className="flex items-center justify-center gap-1.5 text-digi-slate font-body text-[13px] font-semibold py-1"
            >
              <RefreshCcw className="w-3.5 h-3.5" /> Refresh Location
            </button>
          </div>
        )}

        {phase === "error" && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="flex items-start gap-3 bg-[#FBE7E5] rounded-xl2 p-4">
              <XCircle className="w-5 h-5 text-[#B3413C] shrink-0 mt-0.5" />
              <div>
                <p className="font-body font-semibold text-[14px] text-[#B3413C]">
                  Unable to reach this device
                </p>
                <p className="font-body text-[13px] text-[#B3413C]/80 mt-0.5">
                  {device.name} has been offline for a while. Showing its last
                  known location instead.
                </p>
              </div>
            </div>
            <p className="font-body text-[13px] text-digi-forest/60 text-center">
              {device.location} · Last seen {device.lastSeen}
            </p>
            <Button variant="ghost" onClick={handleLocate} className="gap-2">
              <RefreshCcw className="w-4 h-4" /> Try Again
            </Button>
            <Button variant="outline" onClick={() => markLost(device.id)} className="gap-2">
              <AlertTriangle className="w-4 h-4" /> Mark as Lost &amp; Notify Security Team
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
