"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShieldAlert, Radar, UserCircle2 } from "lucide-react";

const items = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/devices", label: "Devices", icon: ShieldAlert },
  { href: "/threat-intelligence", label: "Threats", icon: Radar },
  { href: "/account", label: "Account", icon: UserCircle2 },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-digi-mist px-2 pt-2 pb-3 flex items-center justify-around z-20">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-1 px-3 py-1 min-w-[64px]"
          >
            <Icon
              className={`w-5 h-5 ${active ? "text-digi-forest" : "text-digi-steel"}`}
              strokeWidth={active ? 2.4 : 2}
            />
            <span
              className={`text-[11px] font-body ${
                active ? "text-digi-forest font-semibold" : "text-digi-steel"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
