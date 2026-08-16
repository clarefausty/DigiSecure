"use client";

import { useState } from "react";
import Link from "next/link";
import AuthHero from "@/components/AuthHero";
import Input from "@/components/Input";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";
import { CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  }

  return (
    <AuthHero topSlot={<div className="px-4 pt-2"><BackButton href="/login" light /></div>}>
      <div className="flex-1 flex flex-col justify-center gap-12 animate-fade-in">
        {!sent ? (
          <>
            <div className="flex flex-col gap-1">
              <h1 className="font-display font-semibold text-[24px] text-digi-ice">
                Forgot Password?
              </h1>
              <p className="font-body text-[16px] text-digi-ice/80">
                Enter your email and we&rsquo;ll send a reset link
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" variant="primary" loading={loading} className="mt-4">
                Send Reset Link
              </Button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center animate-fade-in">
            <CheckCircle2 className="w-14 h-14 text-digi-cyan" strokeWidth={1.5} />
            <h1 className="font-display font-semibold text-[22px] text-digi-ice">
              Check your inbox
            </h1>
            <p className="font-body text-[15px] text-digi-ice/80 max-w-[280px]">
              We sent a password reset link to {email || "your email"}.
            </p>
            <Link href="/login" className="text-digi-slate font-bold text-[14px] mt-2">
              Back to Sign In
            </Link>
          </div>
        )}
      </div>
    </AuthHero>
  );
}
