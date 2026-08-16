"use client";

import { useEffect, useState } from "react";
import { Signal, Wifi, BatteryFull } from "lucide-react";

export default function StatusBar({ light = false }: { light?: boolean }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
      );
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  const color = light ? "text-white" : "text-digi-forest";

  return (
    <div className={`flex items-center justify-between px-5 pt-3 pb-1 text-sm font-medium ${color}`}>
      <span className="font-display font-semibold tabular-nums">{time}</span>
      <div className="flex items-center gap-1.5">
        <Signal className="w-4 h-4" strokeWidth={2.2} />
        <Wifi className="w-4 h-4" strokeWidth={2.2} />
        <BatteryFull className="w-5 h-5" strokeWidth={2} />
      </div>
    </div>
  );
}
