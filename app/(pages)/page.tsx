import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, GraduationCap, Video, ArrowRight, CheckCircle } from "lucide-react";

export default function Page() {
  const features = [
    {
      icon: Video,
      title: "Learn from YouTube",
      description: "Access curated educational content from the best creators",
    },
    {
      icon: GraduationCap,
      title: "Expert Instructors",
      description: "Learn from industry professionals and experienced educators",
    },
    {
      icon: BookOpen,
      title: "Structured Learning",
      description: "Follow organized courses with chapters and lessons",
    },
  ];

  const stats = [
    { value: "10+", label: "Courses" },
    { value: "100+", label: "Students" },
    { value: "5+", label: "Instructors" },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background py-16 sm:py-24 lg:py-32">
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Welcome to{" "}
              <span className="text-primary">LUMA</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your platform for learning and teaching. Transform scattered YouTube 
              content into structured, engaging learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/Courses">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Browse Courses
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </Container>

        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 border-y border-border">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose LUMA?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We bring structure to online learning with curated content from the best educators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap justify-center gap-12 sm:gap-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* For Instructors Section */}
      <section className="py-16 sm:py-24 bg-muted/50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Become an Instructor
                </h2>
                <p className="text-muted-foreground mb-6">
                  Share your knowledge and earn. Create courses using YouTube videos 
                  and reach students worldwide.
                </p>
                <ul className="space-y-3">
                  {[
                    "Zero video hosting costs",
                    "Easy course creation",
                    "Built-in monetization",
                    "Reach global audience",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/sign-up">
                    <Button className="gap-2">
                      Start Teaching
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-8xl">👨‍🏫</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of students learning on LUMA today. Browse our courses 
              and start your learning journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/Courses">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore All Courses
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} LUMA. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/Courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Courses
              </Link>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </main>
  );
}
