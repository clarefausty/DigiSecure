"use client";

import { useDevices } from "@/lib/device-context";
import PageHeader from "@/components/PageHeader";
import StatusPill from "@/components/StatusPill";
import { Radar, TrendingUp, ShieldOff } from "lucide-react";

const threatFeed = [
  {
    title: "Unrecognized login attempt",
    severity: "High",
    detail: "Blocked a sign-in attempt from an unfamiliar location.",
    time: "18 min ago",
  },
  {
    title: "Outdated OS patch level",
    severity: "Medium",
    detail: "2 devices are behind on the latest security update.",
    time: "3 hours ago",
  },
  {
    title: "Public network exposure",
    severity: "Low",
    detail: "A device connected to an open Wi-Fi network briefly.",
    time: "Yesterday",
  },
];

const severityColor: Record<string, string> = {
  High: "text-[#B3413C] bg-[#FBE7E5]",
  Medium: "text-[#A6741B] bg-[#FBF1DC]",
  Low: "text-[#2F7A45] bg-[#E4F2E7]",
};

export default function ThreatIntelligencePage() {
  const { devices } = useDevices();
  const atRisk = devices.filter((d) => d.status === "at-risk").length;

  return (
    <div>
      <PageHeader
        title="Threat Intelligence"
        subtitle="Live risk signals across your registered devices"
        backHref="/home"
      />

      <div className="px-4 py-5 flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl2 bg-digi-mist p-3 flex flex-col items-center gap-1">
            <Radar className="w-4 h-4 text-digi-forest" />
            <span className="font-display font-bold text-[20px] text-digi-forest">
              {devices.length}
            </span>
            <span className="text-[11px] font-body text-digi-forest/60">Monitored</span>
          </div>
          <div className="rounded-xl2 bg-[#FBE7E5] p-3 flex flex-col items-center gap-1">
            <ShieldOff className="w-4 h-4 text-[#B3413C]" />
            <span className="font-display font-bold text-[20px] text-[#B3413C]">
              {atRisk}
            </span>
            <span className="text-[11px] font-body text-[#B3413C]/70">At Risk</span>
          </div>
          <div className="rounded-xl2 bg-[#E4F2E7] p-3 flex flex-col items-center gap-1">
            <TrendingUp className="w-4 h-4 text-[#2F7A45]" />
            <span className="font-display font-bold text-[20px] text-[#2F7A45]">
              98%
            </span>
            <span className="text-[11px] font-body text-[#2F7A45]/70">Threats Blocked</span>
          </div>
        </div>

        <div>
          <h2 className="font-body font-semibold text-[14px] text-digi-forest/80 mb-3">
            Recent Signals
          </h2>
          <div className="flex flex-col gap-3">
            {threatFeed.map((t) => (
              <div key={t.title} className="p-4 rounded-xl2 border border-digi-mist">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="font-body font-semibold text-[14px] text-digi-forest">
                    {t.title}
                  </p>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${severityColor[t.severity]}`}>
                    {t.severity}
                  </span>
                </div>
                <p className="font-body text-[13px] text-digi-forest/60">{t.detail}</p>
                <p className="font-body text-[11px] text-digi-steel mt-1.5">{t.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-body font-semibold text-[14px] text-digi-forest/80 mb-3">
            Device Status
          </h2>
          <div className="flex flex-col gap-2">
            {devices.map((d) => (
              <div key={d.id} className="flex items-center justify-between px-1 py-1.5">
                <span className="font-body text-[13px] text-digi-forest">{d.name}</span>
                <StatusPill status={d.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
