import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  // CTA naranja del branding
  primary:
    "bg-naranja text-white shadow-[0_8px_24px_-10px_rgba(230,126,34,0.7)] hover:bg-naranja-600 active:bg-naranja-700",
  secondary: "bg-verde-profundo text-marfil hover:bg-verde-700 active:bg-verde-900",
  outline:
    "border-2 border-verde-profundo/30 text-verde-profundo hover:border-verde-profundo hover:bg-verde-claro/50",
  ghost: "text-verde-profundo hover:bg-verde-claro/60",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-dorado disabled:cursor-not-allowed disabled:opacity-60";

function classes(variant: Variant, size: Size, className?: string) {
  return `${baseClasses} ${variants[variant]} ${sizes[size]} ${className ?? ""}`;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ComponentProps<"button">) {
  return (
    <button className={classes(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ComponentProps<typeof Link>) {
  return (
    <Link className={classes(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}
