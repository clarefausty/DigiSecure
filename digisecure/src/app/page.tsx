"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import AuthHero from "@/components/AuthHero";
import Button from "@/components/Button";
import Logo from "@/components/Logo";

export default function SplashPage() {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && user) router.replace("/home");
  }, [ready, user, router]);

  return (
    <AuthHero>
      <div className="flex-1 flex flex-col items-center justify-center gap-10 animate-fade-in">
        <Logo size={96} tagline="Tracking & Monitoring" />
        <p className="text-center text-digi-ice/80 text-[15px] max-w-[300px] font-body">
          Locate, protect, and monitor every device your business depends on
          — in real time.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Link href="/signup" className="block">
          <Button variant="secondary">Get Started</Button>
        </Link>
        <Link href="/login" className="block">
          <Button variant="outline" className="!border-digi-ice/40 !text-white">
            I already have an account
          </Button>
        </Link>
      </div>
    </AuthHero>
  );
}
