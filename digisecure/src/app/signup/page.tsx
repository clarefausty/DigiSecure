"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import AuthHero from "@/components/AuthHero";
import Input from "@/components/Input";
import Button from "@/components/Button";
import BackButton from "@/components/BackButton";

export default function SignUpPage() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    const res = await signUp(fullName, email, password);
    setLoading(false);
    if (res.ok) {
      router.push("/home");
    } else {
      setError(res.error || "Something went wrong.");
    }
  }

  return (
    <AuthHero topSlot={<div className="px-4 pt-2"><BackButton href="/" light /></div>}>
      <div className="flex-1 flex flex-col justify-center gap-12 animate-fade-in">
        <div className="flex flex-col gap-1">
          <h1 className="font-display font-semibold text-[24px] text-digi-ice">
            Create New Account
          </h1>
          <p className="font-body text-[16px] text-digi-ice/80">
            Please fill in the form to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            tone="fog"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            tone="fog"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            tone="fog"
            type="password"
            placeholder="Confirm Password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {error && (
            <p className="text-[13px] text-[#ff9d97] font-body -mt-1">{error}</p>
          )}

          <div className="flex flex-col items-center gap-6 mt-4">
            <Button type="submit" variant="primary" loading={loading}>
              Sign Up
            </Button>
            <p className="text-[12px] text-digi-ice font-body flex gap-1.5">
              Have An Account?
              <Link href="/login" className="font-bold text-digi-slate">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthHero>
  );
}
