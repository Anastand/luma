import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./providers/themeProvider";
import { Navbar } from "../components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "LUMA",
  description: "E-Course Selling Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/onboarding"
    >
      <html
        lang="en"
        suppressHydrationWarning
      >
        {/* hydration warning needs to be supressed */}
        <body suppressHydrationWarning className="antialiased">
          <ThemeProvider>
            <Navbar />
            <main>{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
