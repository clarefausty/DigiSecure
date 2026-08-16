export type User = {
  fullName: string;
  email: string;
};

export type DeviceStatus = "secure" | "at-risk" | "offline";

export type Device = {
  id: string;
  name: string;
  type: "Laptop" | "Phone" | "Tablet" | "Desktop";
  status: DeviceStatus;
  lastSeen: string;
  location: string;
  battery: number;
  lat: number;
  lng: number;
  lockEnabled: boolean;
  registeredAt: string;
};

export type ActivityLogEntry = {
  id: string;
  deviceId: string;
  message: string;
  timestamp: string;
};
