"use client"

import React, { useState } from "react";
import { Logo } from "./Logo";
import { Container } from "./container";
import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const Nav_links = [
    { title: "Courses", href: "/Courses" },
    // { title: "Bootcamp", href: "/bootcamp" },
    // { title: "create", href: "/create" },
    { title: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/70 backdrop-blur">
      <Container className="flex justify-between items-center py-3">
        <div className="flex items-center gap-4 lg:gap-8">
          <Logo />
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4">
            {Nav_links.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Desktop Auth Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="ghost" size="sm" className="rounded-full">Sign in</Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="rounded-full px-4">Sign up</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/70 bg-background/95 backdrop-blur">
          <Container className="py-4 space-y-3">
            {Nav_links.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-2"
              >
                {item.title}
              </Link>
            ))}
            <div className="pt-4 border-t border-border/70 space-y-2">
              <SignedOut>
                <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start rounded-full">Sign in</Button>
                </Link>
                <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full rounded-full">Sign up</Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground/70">Account:</span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};
