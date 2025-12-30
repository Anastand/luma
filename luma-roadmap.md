# LUMA Project Roadmap

## Phase 1: The Core Foundation (Days 1-3)
- [ ] **Database Setup**
  - [ ] Initialize Prisma (`npx prisma init`)
  - [ ] Define `Course`, `Module`, `Lesson`, `Attachment` models in `schema.prisma`
  - [ ] Push schema to DB (`npx prisma db push`)
  - [ ] Create `lib/db.ts` singleton
- [ ] **Seed Data**
  - [ ] Create `prisma/seed.ts`
  - [ ] Generate 3 dummy courses (1 free, 2 paid)
- [ ] **Public UI (Read-Only)**
  - [ ] Create `components/course-card.tsx`
  - [ ] Update `app/page.tsx` to fetch and list courses from DB
  - [ ] Create `app/courses/[courseId]/page.tsx` (Course Landing Page)

## Phase 2: The Learning Engine (Days 4-8)
- [ ] **Course Player Layout**
  - [ ] Create `app/courses/[courseId]/chapters/[chapterId]/page.tsx`
  - [ ] Build Sidebar (List of chapters/lessons)
  - [ ] Build Video Player Area
- [ ] **Video Integration**
  - [ ] Implement YouTube Player (Free content)
  - [ ] Implement Video Player for uploads (Paid content)
- [ ] **Progress Tracking**
  - [ ] Create API endpoint `/api/courses/[courseId]/progress`
  - [ ] Add "Mark as Complete" button logic

## Phase 3: Auth & Commerce (Days 9-14)
- [ ] **Authentication**
  - [ ] Setup Clerk or NextAuth
  - [ ] Protect `/dashboard` routes
- [ ] **Checkout Flow**
  - [ ] Setup Stripe (Test Mode)
  - [ ] Create checkout API route
  - [ ] Handle Stripe Webhook (Enroll user on success)

## Phase 4: Teacher Mode (Days 15-20)
- [ ] **Creator Dashboard**
  - [ ] Create `/teacher/create` page
  - [ ] Build form to reorder chapters (Drag & Drop)
  - [ ] Build form to edit price/description
