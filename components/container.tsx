import React from "react"
import { cn } from "@/lib/utils"
// this is the entire code of the container which allow us to put our content in fixed width

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
};
