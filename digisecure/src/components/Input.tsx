"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  tone?: "mist" | "fog";
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ tone = "mist", error, type, className = "", ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const isPassword = type === "password";
    const bg = tone === "mist" ? "bg-digi-mist" : "bg-digi-fog";

    return (
      <div className="w-full">
        <div
          className={`h-[48px] ${bg} rounded-xl2 px-4 flex items-center relative ${
            error ? "ring-2 ring-[#B3413C]" : ""
          }`}
        >
          <input
            ref={ref}
            type={isPassword ? (visible ? "text" : "password") : type}
            className={`flex-1 bg-transparent outline-none text-[18px] font-body text-digi-forest placeholder:text-digi-steel ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setVisible((v) => !v)}
              className="text-digi-steel shrink-0 ml-2"
              aria-label={visible ? "Hide password" : "Show password"}
            >
              {visible ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
            </button>
          )}
        </div>
        {error && <p className="text-[12px] text-[#B3413C] mt-1 pl-1 font-body">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
