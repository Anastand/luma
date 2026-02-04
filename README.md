# LUMA | Minimal Course Marketplace
**Shipped in 10 days. Built for execution.**

LUMA is a minimal viable marketplace for instructors to create and sell courses. It focuses on the core loop: content creation, secure payment, and immediate student access. No bloat, just the code required to facilitate learning and transactions.

## CORE FEATURES
- **Instructor Dashboard:** Full CRUD functionality for courses, chapters, and lessons.
- **Stripe Integration:** Dynamic product and price creation via Stripe API during course setup.
- **Role-Based Auth:** Distinct onboarding flows and permissions for Students and Instructors via Clerk.
- **Student Learning View:** Sidebar navigation for course hierarchy with a built-in YouTube video player.
- **Server Actions:** Modern data fetching and mutations using Next.js 15 Server Actions and `useTransition`.

## TECHNICAL DECISIONS (THE "WHY")
- **Clerk-to-Prisma Sync:** Utilized `clerkId` as the unique identifier in the User table. This eliminates redundant lookups and ensures database records are directly mapped to the Auth provider context.
- **Reliable Enrollments:** Decoupled enrollment creation from the success redirect. Logic is handled via background webhooks to ensure students get access even if the browser session is interrupted post-payment.
- **Relational Optimization:** Used nested Prisma `.include()` queries to fetch Course -> Chapter -> Lesson data in a single database round-trip, significantly reducing latency on the student view.
- **Decimal Serialization:** Addressed serialization issues between Prisma (Decimal.js) and the browser by enforcing string conversion for all currency fields, ensuring UI stability.

## TECH STACK
- **Framework:** Next.js 15 (App Router / Turbopack)
- **Database:** Neon (PostgreSQL) + Prisma ORM
- **Auth:** Clerk
- **Payments:** Stripe (Hosted Checkout + Webhooks)
- **UI:** Tailwind CSS + Shadcn UI + Lucide Icons

## SETUP
1. **Clone & Install:** `pnpm install`
2. **Database:** Update `DATABASE_URL` in `.env` and run `pnpm prisma migrate dev`.
3. **Environment:** Set Clerk keys, Stripe Secret, and `NEXT_PUBLIC_APP_URL`.
4. **Development:** `pnpm dev`.

## ROADMAP & TECHNICAL DEBT
> **Note:** The current build is a functional MVP. Hardening security and typing is the immediate post-ship priority.

### **Critical Path**
- [ ] **Webhook Hardening:** Re-enable Stripe HMAC signature verification (currently bypassed for rapid deployment).

### **UX & Refinement**
- [ ] **Consolidated UI:** Merge `/create` and `/manage` flows into a single unified instructor dashboard.
- [ ] **Feedback Systems:** Implement `sonner` for real-time toast notifications on actions.
- [ ] **Progress Tracking:** Add "Mark as Complete" functionality for student lesson tracking.

### **AI Integration**
- [ ] **Automated Summaries:** Use OpenRouter (DeepSeek R1/Flash) to generate lesson summaries from descriptions.
- [ ] **Feedback Analysis:** AI-driven suggestion engine to help instructors improve course content based on student forms.

---
**Build Now . Ship faster . Fix Later .**
