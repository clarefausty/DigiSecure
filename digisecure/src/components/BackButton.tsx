"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({
  href,
  light = false,
}: {
  href?: string;
  light?: boolean;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => (href ? router.push(href) : router.back())}
      aria-label="Go back"
      className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
        light ? "border-digi-cyan text-digi-cyan" : "border-digi-forest text-digi-forest"
      }`}
    >
      <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
    </button>
  );
}
