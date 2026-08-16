"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { ActivityLogEntry, Device } from "./types";

const DEVICES_KEY = "digisecure.devices";
const LOG_KEY = "digisecure.log";

const SEED_DEVICES: Device[] = [
  {
    id: "dev-1",
    name: "Emeka's MacBook Pro",
    type: "Laptop",
    status: "secure",
    lastSeen: "2 minutes ago",
    location: "Leipzig, Germany",
    battery: 82,
    lat: 51.3397,
    lng: 12.3731,
    lockEnabled: true,
    registeredAt: "2026-03-14",
  },
  {
    id: "dev-2",
    name: "Work iPhone 15",
    type: "Phone",
    status: "at-risk",
    lastSeen: "6 hours ago",
    location: "Berlin, Germany",
    battery: 34,
    lat: 52.52,
    lng: 13.405,
    lockEnabled: true,
    registeredAt: "2026-01-09",
  },
  {
    id: "dev-3",
    name: "Office iPad",
    type: "Tablet",
    status: "offline",
    lastSeen: "3 days ago",
    location: "Last seen: Munich, Germany",
    battery: 12,
    lat: 48.1351,
    lng: 11.582,
    lockEnabled: false,
    registeredAt: "2025-11-22",
  },
];

type DeviceContextValue = {
  devices: Device[];
  log: ActivityLogEntry[];
  ready: boolean;
  registerDevice: (name: string, type: Device["type"]) => Device;
  locateDevice: (id: string) => Promise<Device>;
  toggleLock: (id: string) => void;
  markLost: (id: string) => void;
  eraseDevice: (id: string) => void;
  addLog: (deviceId: string, message: string) => void;
};

const DeviceContext = createContext<DeviceContextValue | null>(null);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [log, setLog] = useState<ActivityLogEntry[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const rawDevices = localStorage.getItem(DEVICES_KEY);
      const rawLog = localStorage.getItem(LOG_KEY);
      setDevices(rawDevices ? JSON.parse(rawDevices) : SEED_DEVICES);
      setLog(rawLog ? JSON.parse(rawLog) : []);
    } catch {
      setDevices(SEED_DEVICES);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(DEVICES_KEY, JSON.stringify(devices));
  }, [devices, ready]);

  useEffect(() => {
    if (ready) localStorage.setItem(LOG_KEY, JSON.stringify(log));
  }, [log, ready]);

  const addLog = (deviceId: string, message: string) => {
    setLog((prev) => [
      {
        id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        deviceId,
        message,
        timestamp: new Date().toLocaleString(),
      },
      ...prev,
    ].slice(0, 50));
  };

  const registerDevice: DeviceContextValue["registerDevice"] = (
    name,
    type
  ) => {
    const newDevice: Device = {
      id: `dev-${Date.now()}`,
      name,
      type,
      status: "secure",
      lastSeen: "Just now",
      location: "Leipzig, Germany",
      battery: 100,
      lat: 51.3397 + (Math.random() - 0.5) * 0.05,
      lng: 12.3731 + (Math.random() - 0.5) * 0.05,
      lockEnabled: true,
      registeredAt: new Date().toISOString().slice(0, 10),
    };
    setDevices((prev) => [newDevice, ...prev]);
    addLog(newDevice.id, `${name} registered to your DigiSecure account.`);
    return newDevice;
  };

  const locateDevice: DeviceContextValue["locateDevice"] = async (id) => {
    await new Promise((r) => setTimeout(r, 1600));
    const device = devices.find((d) => d.id === id);
    if (!device) throw new Error("Device not found");
    addLog(id, `Location refreshed — found near ${device.location}.`);
    return device;
  };

  const toggleLock = (id: string) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, lockEnabled: !d.lockEnabled } : d))
    );
    const device = devices.find((d) => d.id === id);
    if (device) {
      addLog(id, device.lockEnabled ? "Remote lock disabled." : "Device locked remotely.");
    }
  };

  const markLost = (id: string) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "at-risk" } : d))
    );
    addLog(id, "Marked as lost. Security team notified.");
  };

  const eraseDevice = (id: string) => {
    addLog(id, "Remote erase command sent to device.");
  };

  return (
    <DeviceContext.Provider
      value={{
        devices,
        log,
        ready,
        registerDevice,
        locateDevice,
        toggleLock,
        markLost,
        eraseDevice,
        addLog,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevices() {
  const ctx = useContext(DeviceContext);
  if (!ctx) throw new Error("useDevices must be used within DeviceProvider");
  return ctx;
}
