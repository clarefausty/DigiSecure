"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import AuthHero from "@/components/AuthHero";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.ok) {
      router.push("/home");
    } else {
      setError(res.error || "Something went wrong.");
    }
  }

  return (
    <AuthHero>
      <div className="flex-1 flex flex-col items-center justify-center gap-12 animate-fade-in">
        <div className="flex flex-col items-center gap-6 w-full">
          <Logo size={56} showWordmark={false} />
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="font-display font-semibold text-[24px] text-digi-ice">
              Welcome Back!
            </h1>
            <p className="font-body text-[16px] text-digi-ice/80">
              Please sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p className="text-[13px] text-[#ff9d97] font-body -mt-1">{error}</p>
            )}
            <div className="flex justify-end -mt-1">
              <Link
                href="/forgot-password"
                className="text-[14px] text-digi-ice/80 font-body"
              >
                Forget Password?
              </Link>
            </div>

            <div className="flex flex-col items-center gap-6 mt-6">
              <Button type="submit" variant="primary" loading={loading}>
                Sign In
              </Button>
              <p className="text-[12px] text-digi-ice font-body flex gap-1.5">
                Don&rsquo;t Have An Account?
                <Link href="/signup" className="font-bold text-digi-slate">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </AuthHero>
  );
}
