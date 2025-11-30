import React from "react";
import { Logo } from "./Logo";
import { Container } from "./container";
import Link from "next/link";
import { Button } from "./ui/button";

export const Navbar = () => {
  const Nav_links = [
    { title: "Courses", href: "/courses" },
    { title: "Bootcamp", href: "/bootcamp" },
    { title: "create", href: "/create" },
  ];

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800">
      <Container className=" flex justify-between py-4">
        <Logo />
        <div className="flex items-center gap-4">
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
        <div className="flex items-center gap-4">
          <Link
            href={"/login"}
            className="text-sm ext-neutral-600 dark:text-neutral-400 font-medium"
          >
            Login
          </Link>
          <Button
            variant={"default"}
            className="text-sm ext-neutral-600 dark:text-neutral-400 font-medium"
          >
            Signup
          </Button>
        </div>
      </Container>
    </div>
  );
};
