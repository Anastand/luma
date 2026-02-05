import { Container } from "@/components/container";

export default function LoadingCourse() {
  return (
    <Container className="py-10 sm:py-16 max-w-3xl">
      <div className="animate-pulse space-y-6">
        <div className="h-4 w-32 rounded-full bg-muted" />
        <div className="rounded-3xl border border-border/60 bg-card/70 p-6 sm:p-8 space-y-4">
          <div className="h-4 w-24 rounded-full bg-muted" />
          <div className="h-10 w-2/3 rounded-full bg-muted" />
          <div className="h-4 w-40 rounded-full bg-muted" />
          <div className="h-16 w-full rounded-2xl bg-muted" />
          <div className="flex items-center justify-between">
            <div className="h-8 w-24 rounded-full bg-muted" />
            <div className="h-4 w-24 rounded-full bg-muted" />
          </div>
          <div className="h-11 w-full rounded-full bg-muted" />
        </div>
      </div>
    </Container>
  );
}
