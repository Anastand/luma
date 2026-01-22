"use client";

import { createCheckoutSession } from "../action";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export function CheckoutButton({
  courseId,
  price,
}: {
  courseId: string;
  price: string;
}) {
  const [pending, startTransition] = useTransition();

  const handleCheckout = () => {
    startTransition(async () => {
      const result = await createCheckoutSession(courseId);
      window.location.href = result.url;
    });
  };

  return (
    <Button onClick={handleCheckout} disabled={pending}>
      {pending ? "Loading..." : `Buy for $${price}`}
    </Button>
  );
}