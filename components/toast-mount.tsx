"use client";

import dynamic from "next/dynamic";

const ToastProvider = dynamic(
  () => import("@/components/toast-provider").then((mod) => mod.ToastProvider),
  { ssr: false }
);

export function ToastMount() {
  return <ToastProvider />;
}
