"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const HIDE_ON = new Set(["/sign-in", "/sign-up", "/onboarding"]);

const LABELS: Record<string, string> = {
  courses: "Courses",
  course: "Course",
  dashboard: "Dashboard",
  create: "Create",
  edit: "Edit",
  bootcamp: "Bootcamp",
  signin: "Sign in",
  signup: "Sign up",
  "sign-in": "Sign in",
  "sign-up": "Sign up",
  onboarding: "Onboarding",
};

function toLabel(segment: string) {
  const key = segment.toLowerCase();
  if (LABELS[key]) return LABELS[key];
  if (key.length > 16) return "Details";
  return key
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function Breadcrumbs({ className }: { className?: string }) {
  const pathname = usePathname();
  if (!pathname) return null;
  if (HIDE_ON.has(pathname)) return null;
  if (pathname.startsWith("/course/") && pathname.endsWith("/view")) return null;

  const segments = pathname.split("?")[0].split("#")[0].split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const crumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    return { href, label: toLabel(segment) };
  });

  return (
    <div className={cn("border-b border-border/60 bg-background/70 backdrop-blur", className)}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <nav aria-label="Breadcrumb" className="flex items-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          {crumbs.map((crumb, index) => (
            <span key={crumb.href} className="flex items-center">
              <ChevronRight className="mx-2 h-3 w-3 text-muted-foreground/70" />
              {index === crumbs.length - 1 ? (
                <span className="text-foreground/80">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-foreground transition-colors">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
