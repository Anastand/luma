import { Container } from "@/components/container";

export default function LoadingDashboard() {
  return (
    <Container className="py-10 sm:py-12">
      <div className="animate-pulse">
        <div className="mb-8 space-y-3">
          <div className="h-4 w-32 rounded-full bg-muted" />
          <div className="h-8 w-48 rounded-full bg-muted" />
          <div className="h-4 w-64 rounded-full bg-muted" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-border/60 bg-card/70 overflow-hidden">
              <div className="h-36 bg-muted" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-3/4 rounded-full bg-muted" />
                <div className="h-3 w-1/2 rounded-full bg-muted" />
                <div className="h-9 w-full rounded-full bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
