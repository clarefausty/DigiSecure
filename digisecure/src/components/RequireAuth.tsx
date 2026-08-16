"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { ShieldCheck } from "lucide-react";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-3 bg-digi-forest">
        <ShieldCheck className="w-9 h-9 text-digi-cyan animate-pulse" />
        <p className="text-digi-ice/70 text-sm font-body">Securing your session…</p>
      </div>
    );
  }

  return <>{children}</>;
}
