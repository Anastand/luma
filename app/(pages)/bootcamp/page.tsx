import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

export default function BootcampPage() {
  return (
    <>
      <Container className="flex flex-col items-center justify-center min-h-[70vh] py-16">
        <div className="max-w-xl text-center rounded-3xl border border-border/70 bg-card/80 p-8 shadow-lg">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-3">
            Bootcamp
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">Coming soon</h2>
          <p className="text-muted-foreground mb-6">
            We’re crafting a premium, cohort-based learning experience. Join the waitlist to be the first to know.
          </p>
          <div className="flex justify-center">
            <Button variant="outline">Join waitlist</Button>
          </div>
        </div>
      </Container>
    </>
  );
}
