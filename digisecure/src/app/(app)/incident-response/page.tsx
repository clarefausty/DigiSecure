"use client";

import { useState } from "react";
import { useDevices } from "@/lib/device-context";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import {
  Search,
  ShieldAlert,
  ShieldCheck,
  Bell,
  DatabaseBackup,
  MapPin,
  ChevronRight,
} from "lucide-react";

type Phase = "idle" | "scanning" | "vulnerable" | "clear";

export default function IncidentResponsePage() {
  const { devices } = useDevices();
  const [phase, setPhase] = useState<Phase>("idle");
  const [targetId, setTargetId] = useState(devices[0]?.id ?? "");

  const target = devices.find((d) => d.id === targetId);

  async function runAssessment() {
    setPhase("scanning");
    await new Promise((r) => setTimeout(r, 1600));
    const detected = target?.status === "at-risk";
    setPhase(detected ? "vulnerable" : "clear");
  }

  return (
    <div>
      <PageHeader
        title="Incident Response & Recovery"
        subtitle="Run a vulnerability assessment on any registered device"
        backHref="/home"
      />

      <div className="px-4 py-5 flex flex-col gap-5">
        <div>
          <p className="font-body font-semibold text-[14px] text-digi-forest mb-3">
            Select a device
          </p>
          <div className="flex flex-col gap-2">
            {devices.map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  setTargetId(d.id);
                  setPhase("idle");
                }}
                className={`flex items-center justify-between p-3 rounded-xl2 border-2 text-left transition-colors ${
                  targetId === d.id ? "border-digi-forest bg-digi-mist" : "border-digi-mist bg-white"
                }`}
              >
                <span className="font-body text-[14px] text-digi-forest">{d.name}</span>
                <ChevronRight className="w-4 h-4 text-digi-forest/40" />
              </button>
            ))}
          </div>
        </div>

        {phase === "idle" && (
          <Button onClick={runAssessment} disabled={!target} className="gap-2">
            <Search className="w-4 h-4" /> Run Vulnerability Assessment
          </Button>
        )}

        {phase === "scanning" && (
          <Button loading disabled variant="ghost">
            Assessing {target?.name}…
          </Button>
        )}

        {phase === "vulnerable" && target && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="flex items-start gap-3 bg-[#FBE7E5] rounded-xl2 p-4">
              <ShieldAlert className="w-5 h-5 text-[#B3413C] shrink-0 mt-0.5" />
              <div>
                <p className="font-body font-semibold text-[14px] text-[#B3413C]">
                  Vulnerability detected on {target.name}
                </p>
                <p className="font-body text-[13px] text-[#B3413C]/80 mt-0.5">
                  Outdated security patch and an unrecognized login attempt
                  were flagged. Take action now.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                className="gap-2"
                onClick={() => alert(`Security team notified about ${target.name}.`)}
              >
                <Bell className="w-4 h-4" /> Notify User / Security Team
              </Button>
              <Button
                variant="ghost"
                className="gap-2"
                onClick={() => alert(`Secure backup started for ${target.name}.`)}
              >
                <DatabaseBackup className="w-4 h-4" /> Secure Backup &amp; Recovery
              </Button>
              <a href={`/devices/track/${target.id}`}>
                <Button variant="outline" className="gap-2">
                  <MapPin className="w-4 h-4" /> Open Device Tracking
                </Button>
              </a>
            </div>
          </div>
        )}

        {phase === "clear" && target && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="flex items-start gap-3 bg-[#E4F2E7] rounded-xl2 p-4">
              <ShieldCheck className="w-5 h-5 text-[#2F7A45] shrink-0 mt-0.5" />
              <div>
                <p className="font-body font-semibold text-[14px] text-[#2F7A45]">
                  No vulnerabilities found
                </p>
                <p className="font-body text-[13px] text-[#2F7A45]/80 mt-0.5">
                  {target.name} passed the assessment. We&rsquo;ll keep
                  monitoring in the background.
                </p>
              </div>
            </div>
            <Button variant="ghost" onClick={() => setPhase("idle")}>
              Continue Monitoring
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
