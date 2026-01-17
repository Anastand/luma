import React from "react";
import { Logo } from "./Logo";
import { Container } from "./container";
import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  const Nav_links = [
    { title: "Courses", href: "/Courses" },
    { title: "Bootcamp", href: "/bootcamp" },
    { title: "create", href: "/create" },
    { title: "Dashboard", href: "/dashboard" },
  ];

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800">
      <Container className=" flex justify-between py-4">
        <div className="flex items-center gap-8">
          <Logo />
          <div className="flex gap-4">
            {Nav_links.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-sm text-neutral-600 dark:text-neutral-400 font-medium"
              >
                {" "}
                {item.title}{" "}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign up</Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </Container>
    </div>
  );
};
