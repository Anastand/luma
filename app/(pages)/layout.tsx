import { Breadcrumbs } from "@/components/breadcrumbs";
import { ToastMount } from "@/components/toast-mount";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumbs />
      {children}
      <ToastMount />
    </>
  );
}
