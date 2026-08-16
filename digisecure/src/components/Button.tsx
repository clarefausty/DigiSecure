import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-digi-forest text-white hover:bg-[#2a3f30] active:scale-[0.98]",
  secondary: "bg-digi-sage text-white hover:bg-[#63a074] active:scale-[0.98]",
  outline: "bg-transparent border-2 border-digi-forest text-digi-forest hover:bg-digi-mist",
  ghost: "bg-digi-mist text-digi-forest hover:bg-digi-fog",
  danger: "bg-[#B3413C] text-white hover:bg-[#9c3631] active:scale-[0.98]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", loading, fullWidth = true, className = "", children, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`h-[48px] rounded-xl2 px-4 font-body text-[18px] font-medium transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none ${
          fullWidth ? "w-full" : ""
        } ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
