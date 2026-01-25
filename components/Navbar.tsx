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
    <div className="border-b border-neutral-200 dark:border-neutral-800">
      <Container className="flex justify-between items-center py-4">
        <div className="flex items-center gap-4 lg:gap-8">
          <Logo />
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4">
            {Nav_links.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-sm text-neutral-600 dark:text-neutral-400 font-medium hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
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
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">Sign up</Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-600 dark:text-neutral-400"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800">
          <Container className="py-4 space-y-3">
            {Nav_links.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm text-neutral-600 dark:text-neutral-400 font-medium hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors py-2"
              >
                {item.title}
              </Link>
            ))}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
              <SignedOut>
                <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Sign in</Button>
                </Link>
                <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Account:</span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};
