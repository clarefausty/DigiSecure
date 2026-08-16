import type { Metadata, Viewport } from "next";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/600.css";
import "@fontsource/raleway/700.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { DeviceProvider } from "@/lib/device-context";
import PhoneChrome from "@/components/PhoneChrome";

export const metadata: Metadata = {
  title: "DigiSecure — Device Security & Monitoring",
  description:
    "DigiSecure is an intelligent device security app giving businesses and consumers cutting-edge device protection, tracking, and incident response.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#344D3C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body antialiased bg-digi-dark min-h-dvh">
        <AuthProvider>
          <DeviceProvider>
            <PhoneChrome>{children}</PhoneChrome>
          </DeviceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
