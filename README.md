# LUMA | Minimal Course Marketplace
**Shipped in 10 days.**

LUMA is a minimal viable marketplace for instructors to create and sell courses. It focuses on the core loop: content creation, secure payment, and immediate student access.

## CORE FEATURES
- **Instructor Dashboard:** Full CRUD for courses, chapters, and lessons.
- **Stripe Integration:** Dynamic product/price creation on course setup and secure hosted checkout.
- **Role-Based Auth:** Distinct flows for Students and Instructors via Clerk.
- **Student Experience:** Clean sidebar navigation for enrolled content and embedded video player.
- **Architecture:** Next.js 15+ (App Router), Prisma ORM, Neon PostgreSQL, and Shadcn UI.

## TECHNICAL DECISIONS (THE "WHY")
- **Clerk-to-Prisma Sync:** Used `clerkId` as the primary key in the User table to avoid redundant UUID lookups and simplify relational queries.
- **Stripe Webhooks:** Decoupled enrollment logic from the redirect URL to ensure student access even if the browser is closed mid-transaction.
- **Nested Prisma Queries:** Optimized the student view by fetching Course -> Chapters -> Lessons in a single database round-trip using `.include()`.
- **Decimal-to-String:** Handled Prisma’s Decimal type serialization issues for the frontend using string conversion to prevent runtime crashes.

## CURRENT STACK
- **Framework:** Next.js 15 (App Router)
- **Database:** Neon (PostgreSQL) + Prisma ORM
- **Auth:** Clerk
- **Payments:** Stripe (Hosted Checkout + Webhooks)
- **UI:** Tailwind CSS + Shadcn UI

## SETUP
1. Clone repo and `pnpm install`.
2. Push schema: `pnpm prisma migrate dev`.
3. Set `.env` (Clerk keys, Stripe Secret, Stripe Webhook Secret, Database URL).
4. Run: `pnpm dev`.

## PROJECT STATUS: MVP (PHASE 5.5)
The core loop is functional. Stripe signature verification is currently bypassed for deployment speed; production-level security hardening is the next milestone.

---
**Build fast. Fix later.**
