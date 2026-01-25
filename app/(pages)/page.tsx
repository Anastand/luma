import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <Container className="py-12 sm:py-16 lg:py-24">
        <div className="text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Welcome to LUMA</h1>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Your platform for learning and teaching. Explore courses or create your own.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/Courses">
              <Button size="lg" className="w-full sm:w-auto">Browse Courses</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">Get Started</Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
