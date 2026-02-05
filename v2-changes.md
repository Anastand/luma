# v2 changes

- Refined global typography to an Apple-like stack (SF Pro fallbacks) and reduced stretched letter spacing.
- Introduced a premium blue/neutral palette with softer borders and elevated surfaces.
- Updated key pages (Landing, Courses, Course Detail/Viewer, Dashboard, Create/Edit, Onboarding, Manage, Bootcamp) with cleaner hierarchy, spacing, and card treatments.
- Centered Clerk Sign In/Sign Up experiences for a polished, focused auth flow.
- Fixed Clerk sign-in redirect to return users to the app after authentication.
- Added global breadcrumbs for the `(pages)` group with sensible hiding rules.
- Re-enabled the Sign in button in the navbar (desktop + mobile).
- Removed fixed background attachment to reduce repaint work and improve scroll performance.
- Added bundle analyzer support (`@next/bundle-analyzer`) and an `analyze` script.
- Moved `ToastProvider` to `(pages)` layout and lazy-loaded it to reduce base JS.
- Added ISR + cache tags for public course list and course detail pages.
- Added course list pagination and slimmer Prisma selects.
- Added course list, course detail, and dashboard loading skeletons.
- Lazy-loaded the YouTube iframe behind a lightweight poster button.
- Removed full page reloads in course management and updated local state in-place.
- Replaced `next/font` Google fetch with a system font stack to avoid build-time network fetches.
- Added cache tag revalidation with explicit profiles (`"max"`) to match Next 16 API.
- Switched `Courses` page `searchParams` to the Next 16 Promise signature.
- Added a client-only toast mount wrapper to satisfy server component constraints.

## Things you might have overlooked

- `pnpm-lock.yaml` needs an update after adding `@next/bundle-analyzer` (`pnpm install`).
- Lighthouse/bundle analysis baselines were not run yet, so gains aren’t quantified.
- Public pages now cache, but authenticated views remain dynamic; verify the edge cases you care about (pricing edits, enrollments).
- Course list pagination is server-driven; if you want client search/filters, it needs query wiring.
