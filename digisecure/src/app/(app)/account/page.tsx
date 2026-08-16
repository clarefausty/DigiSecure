"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import { UserCircle2, Bell, Fingerprint, Moon, LogOut, ChevronRight } from "lucide-react";

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full relative transition-colors ${
        on ? "bg-digi-forest" : "bg-digi-mist"
      }`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <PageHeader title="Settings & Privacy" backHref="/home" />

      <div className="px-4 py-5 flex flex-col gap-6">
        <div className="flex items-center gap-4 p-4 rounded-xl2 bg-digi-mist">
          <UserCircle2 className="w-12 h-12 text-digi-forest" strokeWidth={1.3} />
          <div className="min-w-0">
            <p className="font-body font-semibold text-[16px] text-digi-forest truncate">
              {user?.fullName || "DigiSecure User"}
            </p>
            <p className="font-body text-[13px] text-digi-forest/60 truncate">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-digi-mist rounded-xl2 border border-digi-mist overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Bell className="w-4.5 h-4.5 text-digi-forest/70" />
              <span className="font-body text-[14px] text-digi-forest">
                Push Notifications
              </span>
            </div>
            <Toggle on={notifications} onToggle={() => setNotifications((v) => !v)} />
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Fingerprint className="w-4.5 h-4.5 text-digi-forest/70" />
              <span className="font-body text-[14px] text-digi-forest">
                Biometric Unlock
              </span>
            </div>
            <Toggle on={biometrics} onToggle={() => setBiometrics((v) => !v)} />
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Moon className="w-4.5 h-4.5 text-digi-forest/70" />
              <span className="font-body text-[14px] text-digi-forest">Dark Mode</span>
            </div>
            <Toggle on={darkMode} onToggle={() => setDarkMode((v) => !v)} />
          </div>
        </div>

        <button className="flex items-center justify-between p-4 rounded-xl2 border border-digi-mist">
          <span className="font-body text-[14px] text-digi-forest">Privacy Policy</span>
          <ChevronRight className="w-4 h-4 text-digi-forest/40" />
        </button>
        <button className="flex items-center justify-between p-4 rounded-xl2 border border-digi-mist -mt-3">
          <span className="font-body text-[14px] text-digi-forest">Contact Us</span>
          <ChevronRight className="w-4 h-4 text-digi-forest/40" />
        </button>

        <Button
          variant="danger"
          className="gap-2 mt-2"
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          <LogOut className="w-4 h-4" /> Log Out
        </Button>
      </div>
    </div>
  );
}
