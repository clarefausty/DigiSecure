"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDevices } from "@/lib/device-context";
import PageHeader from "@/components/PageHeader";
import Input from "@/components/Input";
import Button from "@/components/Button";
import type { Device } from "@/lib/types";
import { Laptop, Smartphone, Tablet, Monitor, CheckCircle2 } from "lucide-react";

const types: { value: Device["type"]; icon: typeof Laptop }[] = [
  { value: "Laptop", icon: Laptop },
  { value: "Phone", icon: Smartphone },
  { value: "Tablet", icon: Tablet },
  { value: "Desktop", icon: Monitor },
];

export default function RegisterDevicePage() {
  const { registerDevice } = useDevices();
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState<Device["type"]>("Laptop");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    registerDevice(name, type);
    setLoading(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="min-h-[70dvh] flex flex-col items-center justify-center gap-4 px-6 text-center animate-fade-in">
        <CheckCircle2 className="w-16 h-16 text-digi-sage" strokeWidth={1.5} />
        <h1 className="font-display font-bold text-[22px] text-digi-forest">
          Device Registered
        </h1>
        <p className="font-body text-[14px] text-digi-forest/60 max-w-[280px]">
          {name || "Your device"} is now protected and being monitored by
          DigiSecure.
        </p>
        <div className="w-full max-w-[300px] flex flex-col gap-3 mt-4">
          <Button onClick={() => router.push("/devices/manage")}>
            View My Devices
          </Button>
          <Button variant="ghost" onClick={() => router.push("/home")}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Register a Device"
        subtitle="Basic specifications will be detected automatically"
        backHref="/devices"
      />
      <form onSubmit={handleSubmit} className="px-4 py-5 flex flex-col gap-6">
        <div>
          <p className="font-body font-semibold text-[14px] text-digi-forest mb-3">
            Device Type
          </p>
          <div className="grid grid-cols-4 gap-3">
            {types.map(({ value, icon: Icon }) => (
              <button
                type="button"
                key={value}
                onClick={() => setType(value)}
                className={`flex flex-col items-center gap-1.5 py-3 rounded-xl2 border-2 transition-colors ${
                  type === value
                    ? "border-digi-forest bg-digi-mist"
                    : "border-digi-mist bg-white"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${type === value ? "text-digi-forest" : "text-digi-steel"}`}
                />
                <span
                  className={`text-[11px] font-body ${
                    type === value ? "text-digi-forest font-medium" : "text-digi-steel"
                  }`}
                >
                  {value}
                </span>
              </button>
            ))}
          </div>
        </div>

        <Input
          placeholder="Device Name (e.g. Emeka's MacBook Pro)"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button type="submit" loading={loading}>
          Register Device
        </Button>
      </form>
    </div>
  );
}
