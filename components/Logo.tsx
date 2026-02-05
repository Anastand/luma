import Link from "next/link"
import React from "react"
import { cn } from "@/lib/utils"

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      {/* Added gap-2 for better spacing */}
      <LOGO_ICON className="w-8 h-8" /> {/* Default size */}
      <span className="text-lg font-semibold tracking-tight text-foreground/80">
        Luma
      </span>
      {/* Added font-semibold + dark mode text support */}
    </Link>
  );
};

export const LOGO_ICON = ({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-12 h-12", className)} // Default size unless overridden
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient
          id="bg"
          x1="4"
          y1="4"
          x2="44"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#050816" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>

        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.56
                0 0 0 0 0.63
                0 0 0 0 0.99
                0 0 0 0.8 0"
            result="glowColor"
          />
          <feMerge>
            <feMergeNode in="glowColor" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="14"
        ry="14"
        fill="url(#bg)"
      />

      <rect
        x="4.5"
        y="4.5"
        width="39"
        height="39"
        rx="13.5"
        ry="13.5"
        fill="none"
        stroke="#1f2933"
        strokeWidth="1" // ✅ React standard
      />

      <path
        filter="url(#glow)"
        d="M26 6L14 25.5h7.8L20 42l14-23.5h-7.8L26 6z"
        fill="white"
        stroke="white"
        strokeWidth="1.4" // ✅ React standard
        strokeLinejoin="round" // ✅ React standard
      />
    </svg>
  );
};
