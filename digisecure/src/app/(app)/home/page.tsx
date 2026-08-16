"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useDevices } from "@/lib/device-context";
import StatusBar from "@/components/StatusBar";
import Logo from "@/components/Logo";
import {
  ArrowRightCircle,
  UserCircle2,
  Menu,
  MapPin,
  ShieldCheck,
  Bell,
  Radar,
} from "lucide-react";

const featureButtons = [
  { label: "Device Management", href: "/devices" },
  { label: "Incident Response & Recovery", href: "/incident-response" },
  { label: "Threat Intelligence", href: "/threat-intelligence" },
];

const keyFeatures = [
  {
    icon: MapPin,
    title: "Real-Time Device Tracking",
    desc: "Locate any registered device on a live map the moment it goes missing.",
  },
  {
    icon: ShieldCheck,
    title: "Remote Lock & Wipe",
    desc: "Secure sensitive data instantly with one-tap remote actions.",
  },
  {
    icon: Radar,
    title: "Threat Intelligence",
    desc: "Get ahead of vulnerabilities with continuous risk scanning.",
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    desc: "Your security team is notified the second something looks wrong.",
  },
];

export default function HomePage() {
  const { user } = useAuth();
  const { devices } = useDevices();
  const atRisk = devices.filter((d) => d.status !== "secure").length;

  return (
    <div>
      {/* Hero */}
      <div className="bg-digi-forest px-4 pb-10">
        <StatusBar light />
        <div className="flex items-center justify-between pt-2 pb-8">
          <Logo size={40} showWordmark={false} />
          <div className="flex items-center gap-6">
            <Link href="/account" aria-label="Account">
              <UserCircle2 className="w-6 h-6 text-white" />
            </Link>
            <Link href="/devices" aria-label="Menu">
              <Menu className="w-6 h-6 text-white" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <h1 className="font-display font-bold text-[32px] leading-[1.15] text-white">
            Welcome back, {user?.fullName?.split(" ")[0] || "there"}
          </h1>
          <p className="font-body text-[15px] text-white/85 mt-1">
            DigiSecure — device security &amp; monitoring, built for how you
            actually work.
          </p>
        </div>

        {atRisk > 0 && (
          <Link
            href="/devices"
            className="block bg-[#B3413C]/90 rounded-xl2 px-4 py-3 mb-6 animate-fade-in"
          >
            <p className="text-white text-[13px] font-body">
              <strong className="font-semibold">{atRisk} device{atRisk > 1 ? "s" : ""}</strong>{" "}
              need attention — tap to review.
            </p>
          </Link>
        )}

        <div className="flex flex-col gap-4">
          {featureButtons.map((btn) => (
            <Link
              key={btn.href}
              href={btn.href}
              className="bg-digi-sage rounded-xl2 h-[48px] px-4 flex items-center justify-between hover:bg-[#63a074] transition-colors"
            >
              <span className="text-white font-body text-[18px]">
                {btn.label}
              </span>
              <ArrowRightCircle className="w-6 h-6 text-white/90" strokeWidth={1.5} />
            </Link>
          ))}
        </div>
      </div>

      {/* Key features */}
      <div className="px-4 py-8 flex flex-col gap-6">
        <h2 className="font-display font-bold text-[28px] text-digi-forest">
          Key Features
        </h2>
        <div className="flex flex-col gap-4">
          {keyFeatures.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex gap-4 items-start p-4 rounded-xl2 bg-digi-mist"
            >
              <div className="w-10 h-10 rounded-full bg-digi-forest flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-digi-cyan" strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-body font-semibold text-[15px] text-digi-forest">
                  {title}
                </p>
                <p className="font-body text-[13px] text-digi-forest/70 mt-0.5">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
