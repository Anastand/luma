# LUMA - AI-Powered YouTube Learning Platform

> **Shipped in 10 days. Built for execution.**
> **Current Version:** 0.1.0 MVP | **Status:** Functional with AI Integration Roadmap

---

## 📋 Table of Contents

1. [Project Vision](#project-vision)
2. [Current Architecture](#current-architecture)
3. [Tech Stack](#tech-stack)
4. [Database Schema](#database-schema)
5. [Current Features](#current-features)
6. [Technical Decisions](#technical-decisions)
7. [Current Issues & Technical Debt](#current-issues--technical-debt)
8. [AI Integration Roadmap](#ai-integration-roadmap)
9. [Environment Setup](#environment-setup)
10. [API Documentation](#api-documentation)
11. [Component Architecture](#component-architecture)
12. [Security Considerations](#security-considerations)
13. [Performance Optimizations](#performance-optimizations)
14. [Future Enhancements](#future-enhancements)

---

## 🎯 Project Vision

LUMA is a minimal viable marketplace that transforms scattered YouTube educational content into structured, AI-enhanced learning experiences. Unlike traditional course platforms that require instructors to upload videos, LUMA allows curators to:

- **Import YouTube videos** as course content
- **Structure content** into chapters and lessons
- **Monetize via Stripe** (free or paid courses)
- **Enhance with AI** (context-aware tutoring, auto-generated quizzes, smart recommendations)

### Core Value Proposition

**For Instructors/Curators:**
- Zero video hosting costs (YouTube handles storage/bandwidth)
- AI-powered content enhancement (summaries, quizzes, recommendations)
- Simple course creation workflow
- Built-in monetization with Stripe

**For Students:**
- Access to curated learning paths from existing YouTube content
- AI tutor for asking questions about specific videos
- Auto-generated quizzes to test understanding
- Personalized course recommendations

---

## 🏗 Current Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Next.js    │  │  React 19    │  │ Tailwind v4  │       │
│  │   App Router │  │  Components  │  │   + Shadcn   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                     API LAYER                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Next.js Server Actions                   │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐│   │
│  │  │ createCourse │  │   manage     │  │   enroll     ││   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘│   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              API Routes                               │   │
│  │  ┌──────────────┐  ┌──────────────┐                  │   │
│  │  │Stripe Webhook│  │  Set Role    │                  │   │
│  │  └──────────────┘  └──────────────┘                  │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   SERVICE LAYER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │    Clerk     │  │    Stripe    │  │   YouTube    │       │
│  │     Auth     │  │   Payments   │  │     API      │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   DATA LAYER                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Neon PostgreSQL + Prisma                 │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │   │
│  │  │   User   │ │  Course  │ │  Chapter │ │  Lesson  │ │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │   │
│  │  ┌──────────┐                                          │   │
│  │  │Enrollment│                                          │   │
│  │  └──────────┘                                          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Authentication Flow

```
User Sign Up (Clerk)
        │
        ▼
Onboarding Page ───────┐
        │              │
   Select Role         │
   (Student/          │
   Instructor)         │
        │              │
        ▼              │
   API Call            │
   /api/set-role       │
        │              │
        ▼              │
   Prisma User         │
   Record Created      │
        │              │
        └──────────────┘
               │
               ▼
   Redirect to Dashboard
```

### Payment & Enrollment Flow

```
Student Views Course
        │
        ▼
   Clicks Buy/Enroll
        │
        ▼
   Checkout Button
   Component
        │
        ▼
   Stripe Checkout
   Session Created
        │
        ▼
   Stripe Hosted
   Checkout Page
        │
        ▼
   Payment Success
        │
        ▼
   Stripe Webhook
   /api/webhooks/stripe
        │
        ▼
   Enrollment Record
   Created in DB
        │
        ▼
   Student Can Now
   Access Course
```

---

## 🛠 Tech Stack

### Core Framework
- **Next.js 16.1.3** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type safety

### Database & ORM
- **Neon** - Serverless PostgreSQL
- **Prisma 7.2.0** - Type-safe database client
- **@prisma/adapter-neon** - Neon-specific adapter

### Authentication
- **Clerk** - Complete auth solution with role management
- **@clerk/nextjs** - Next.js integration

### Payments
- **Stripe** - Payment processing
- **stripe** - Node.js SDK

### UI/UX
- **Tailwind CSS v4** - Utility-first CSS
- **Shadcn UI** - Component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icons
- **Next Themes** - Dark/light mode

### Development Tools
- **ESLint 9** - Linting
- **eslint-config-next** - Next.js lint rules

---

## 🗄 Database Schema

### Entity Relationship Diagram

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│     User     │         │    Course    │         │    Chapter   │
├──────────────┤         ├──────────────┤         ├──────────────┤
│ id (PK)      │         │ id (PK)      │         │ id (PK)      │
│ clerkId (UQ) │◄────────┤ instructorId │         │ courseId(FK) │
│ email        │    1:M  │ title        │         │ title        │
│ name         │         │ description  │         │ order        │
│ role         │         │ price        │         │ createdAt    │
│ createdAt    │         │ thumbnailUrl │         │ updatedAt    │
│ updatedAt    │         │ stripeProdId │         └──────┬───────┘
└──────┬───────┘         │ stripePriceId│                │
       │                 │ createdAt    │                │ 1:M
       │                 │ updatedAt    │                │
       │                 └──────┬───────┘                ▼
       │                        │                 ┌──────────────┐
       │                        │                 │    Lesson    │
       │                        │                 ├──────────────┤
       │                        │                 │ id (PK)      │
       │                        │                 │ chapterId(FK)│
       │                        │                 │ title        │
       │                        │                 │ description  │
       │                        │                 │ youtubeVidId │
       │                        │                 │ order        │
       │                        │                 │ createdAt    │
       │                        │                 │ updatedAt    │
       │                        │                 └──────────────┘
       │                        │
       │              ┌─────────┴──────────┐
       │              │                    │
       │              ▼                    ▼
       │      ┌──────────────┐     ┌──────────────┐
       │      │  Enrollment  │     │  (Future)    │
       │      ├──────────────┤     │  VideoTrans  │
       │      │ id (PK)      │     │  cript       │
       └──────┤ userId (FK)  │     │              │
         M:M  │ courseId(FK) │     │  (Future)    │
              │ createdAt    │     │  ChatMessage │
              └──────────────┘     │              │
                                   └──────────────┘
```

### Detailed Schema Definitions

#### User Model
```prisma
model User {
  id          String       @id @default(uuid())
  clerkId     String       @unique              // Links to Clerk auth
  name        String?                           // Optional display name
  email       String
  role        Role         @default(STUDENT)    // STUDENT or INSTRUCTOR
  courses     Course[]     @relation("InstructorCourses")
  enrollments Enrollment[]
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}

enum Role {
  STUDENT
  INSTRUCTOR
}
```

**Key Design Decisions:**
- `clerkId` stored as unique identifier instead of auto-generated UUID
- Direct mapping between Clerk auth and database records
- Eliminates redundant lookups when querying user-specific data

#### Course Model
```prisma
model Course {
  id              String       @id @default(uuid())
  title           String
  description     String?
  price           Decimal      @default(0) @db.Decimal(10, 2)
  thumbnailUrl    String?
  instructorId    String                              // References User.clerkId
  instructor      User         @relation("InstructorCourses", fields: [instructorId], references: [clerkId])
  chapters        Chapter[]
  enrollments     Enrollment[]
  stripeProductId String?                             // Stripe product reference
  stripePriceId   String?                             // Stripe price reference
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
}
```

**Key Design Decisions:**
- Price stored as Decimal with 2 decimal places for currency precision
- Stripe IDs stored for payment processing integration
- Cascade delete not implemented (manual cleanup required)

#### Chapter Model
```prisma
model Chapter {
  id        String   @id @default(uuid())
  title     String
  order     Int                              // For sorting chapters
  courseId  String
  course    Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  lessons   Lesson[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### Lesson Model
```prisma
model Lesson {
  id             String   @id @default(uuid())
  title          String
  description    String?
  youtubeVideoId String?                       // YouTube video URL/ID
  order          Int                           // For sorting within chapter
  chapterId      String
  chapter        Chapter  @relation(fields: [chapterId], references: [id], onDelete: Cascade)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

**Key Design Decisions:**
- YouTube video ID stored instead of hosting videos directly
- Zero video storage costs for platform
- Order field for manual sorting (drag-and-drop planned)

#### Enrollment Model
```prisma
model Enrollment {
  id        String   @id @default(uuid())
  userId    String
  courseId  String
  user      User     @relation(fields: [userId], references: [clerkId], onDelete: Cascade)
  course    Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@unique([userId, courseId])                 // Prevent duplicate enrollments
}
```

---

## ✅ Current Features

### Implemented Features

#### 1. Authentication System
- **Clerk Integration:** Complete auth with email/password, social providers
- **Role-Based Access:** Student vs Instructor roles with different permissions
- **Onboarding Flow:** Post-signup role selection
- **Protected Routes:** Middleware protection for dashboard and management pages

#### 2. Course Management (Instructors)
- **Create Course:** Form with title, description, price
- **Stripe Integration:** Automatic product/price creation for paid courses
- **Chapter Management:** Add/edit/delete chapters with ordering
- **Lesson Management:** Add lessons with YouTube video URLs
- **Course Dashboard:** View all created courses with edit links

#### 3. Course Discovery (Students)
- **Course Listing:** Grid view of all available courses
- **Course Details:** Individual course pages with pricing and description
- **Instructor Info:** Shows course creator details

#### 4. Learning Experience
- **Video Player:** Embedded YouTube player with custom controls disabled
- **Course Navigation:** Sidebar with collapsible chapters and lesson list
- **Responsive Design:** Mobile-friendly with hamburger menu
- **Enrollment Check:** Validates access before showing content

#### 5. Payment System
- **Stripe Checkout:** Hosted checkout pages for paid courses
- **Free Courses:** Direct enrollment without payment
- **Webhook Processing:** Automatic enrollment on successful payment
- **Enrollment Verification:** Database checks before granting access

### Feature Gaps (Not Yet Implemented)

- ❌ Progress tracking (mark lessons as complete)
- ❌ Course editing after creation
- ❌ Chapter/lesson reordering (drag-and-drop)
- ❌ Course thumbnails/upload
- ❌ Search and filtering
- ❌ Student analytics for instructors
- ❌ Reviews and ratings
- ❌ Certificate generation

---

## 🧠 Technical Decisions

### 1. Clerk-to-Prisma Sync Pattern

**Decision:** Use `clerkId` as the unique identifier in User table instead of auto-generated UUID.

**Rationale:**
- Eliminates redundant lookups when querying user-specific data
- Direct mapping between Clerk auth context and database records
- Simplifies queries: `where: { instructorId: user.id }` works immediately

**Implementation:**
```typescript
// User model
clerkId String @unique

// Query pattern
const courses = await prisma.course.findMany({
  where: { instructorId: user.id }, // user.id is clerkId
});
```

### 2. Decimal Serialization Strategy

**Problem:** Prisma Decimal type doesn't serialize to JSON for client components.

**Solution:** Explicit string conversion before sending to client.

**Implementation:**
```typescript
const plainCourses = courses.map((course) => ({
  ...course,
  price: String(course.price), // Decimal -> string
}));
```

### 3. Relational Query Optimization

**Decision:** Use nested Prisma `.include()` queries for fetching related data.

**Rationale:**
- Reduces database round-trips
- Single query fetches Course → Chapters → Lessons hierarchy
- Better performance for course player view

**Implementation:**
```typescript
const course = await prisma.course.findUnique({
  where: { id },
  include: {
    chapters: {
      orderBy: { order: "asc" },
      include: {
        lessons: { orderBy: { order: "asc" } },
      },
    },
  },
});
```

### 4. Webhook-Based Enrollment

**Decision:** Decouple enrollment creation from checkout success redirect.

**Rationale:**
- Ensures enrollment even if browser session interrupted
- Handles edge cases (browser crash, network issues)
- Stripe webhooks are reliable and retry on failure

**Implementation:**
```typescript
// Client redirects to success page immediately
// Webhook handles actual enrollment creation
export async function POST(req: Request) {
  const body = await req.json();
  if (body.type === "checkout.session.completed") {
    await prisma.enrollment.create({ data: { userId, courseId } });
  }
}
```

### 5. YouTube Video Integration

**Decision:** Store YouTube video URLs instead of uploading/hosting videos.

**Rationale:**
- Zero video storage costs
- YouTube handles bandwidth and streaming optimization
- Leverages existing educational content ecosystem
- Simplifies content creation (just need URLs)

**Trade-offs:**
- Dependent on YouTube availability
- Can't control video quality or playback
- Ads may appear (unless YouTube Premium)

---

## ⚠️ Current Issues & Technical Debt

### Critical Issues

#### 1. TypeScript Errors (5 errors, 3 warnings)
**Status:** ❌ Needs immediate attention

**Errors:**
- `any` type usage in `dashboard/course-card.tsx:14`
- `any` type usage in `dashboard/page.tsx:124`
- `any` type usage in `lib/db/prisma.ts:15,16,21`

**Impact:**
- Reduced type safety
- Potential runtime errors
- Lower code quality score

**Fix:**
```typescript
// Replace any with proper types
// Use Prisma generated types
import { Course } from '@prisma/client';
```

#### 2. Stripe Webhook Security
**Status:** ⚠️ Currently bypassed for rapid deployment

**Issue:** HMAC signature verification disabled in webhook handler.

**Risk:**
- Potential webhook spoofing attacks
- Unauthorized enrollment creation

**Fix Required:**
```typescript
import { headers } from 'next/headers';
import Stripe from 'stripe';

const signature = headers().get('stripe-signature');
const event = stripe.webhooks.constructEvent(
  body,
  signature,
  process.env.STRIPE_WEBHOOK_SECRET
);
```

#### 3. Missing Environment Variables
**Status:** ⚠️ Incomplete `.env.example`

**Missing:**
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_APP_URL`
- `STRIPE_WEBHOOK_SECRET`

### Technical Debt

#### 1. Decimal Serialization Pattern
**Issue:** Manual string conversion scattered across components.

**Better Approach:**
Create a serialization utility:
```typescript
export function serializeCourse(course: Course) {
  return {
    ...course,
    price: course.price.toString(),
  };
}
```

#### 2. Error Handling
**Issue:** Inconsistent error handling across server actions.

**Some actions throw errors, others redirect.**

**Standardize:**
```typescript
try {
  // operation
} catch (error) {
  console.error('Action failed:', error);
  throw new Error('User-friendly message');
}
```

#### 3. Loading States
**Issue:** No loading UI for async operations.

**Solution:**
- Add loading.tsx files for route segments
- Use React Suspense boundaries
- Implement skeleton screens

#### 4. Form Validation
**Issue:** Client-side validation only, no server-side validation in some forms.

**Solution:**
- Implement Zod schemas for form validation
- Validate on both client and server

---

## 🤖 AI Integration Roadmap

### Phase 1: Content Intelligence (Weeks 1-2)

#### 1.1 YouTube Transcript Pipeline
**Feature:** Fetch and process YouTube video transcripts

**Implementation:**
```typescript
// New model
model VideoTranscript {
  id                String @id @default(uuid())
  videoId           String @unique
  courseId          String
  rawTranscript     String @db.Text
  condensedTranscript String? @db.Text
  keyTopics         String[]
  createdAt         DateTime @default(now())
}
```

**Tech Stack:**
- YouTube Data API v3 (captions endpoint)
- OpenRouter API (free tier) for condensation
- Background job processing

**Cost:** ~$0 (OpenRouter free tier: 20 req/min, 200/day)

#### 1.2 AI Content Condensation
**Feature:** Reduce transcript verbosity while preserving educational value

**OpenRouter Prompt:**
```
You are an educational content optimizer.
Given this YouTube video transcript, create a condensed version that:
1. Removes filler words and off-topic segments
2. Keeps all educational key points
3. Reduces length by 60-70%
4. Extracts 5-7 main topics

Return JSON:
{
  "condensedTranscript": "...",
  "keyTopics": ["topic1", "topic2", ...],
  "estimatedReadingTime": "X minutes"
}
```

**Benefits:**
- Faster client-side loading
- Focused AI tutor context
- Better search indexing

### Phase 2: AI Tutor System (Weeks 2-3)

#### 2.1 Context-Aware Chat Interface
**Feature:** AI tutor that answers questions based on specific video content

**Architecture:**
```
Student watches video
        │
        ▼
Load condensed transcript client-side
        │
        ▼
Student asks question
        │
        ▼
Send to OpenRouter with context
        │
        ▼
AI responds based on video content + limited general knowledge
```

**System Prompt:**
```
You are a focused educational assistant for this specific video.

CONTEXT:
- Video Title: [TITLE]
- Key Topics: [TOPICS]
- Condensed Transcript: [CONDENSED_TRANSCRIPT]

RULES:
1. Answer primarily based on video content
2. Use general knowledge only to clarify video concepts
3. Redirect unrelated questions back to video content
4. Keep responses concise (2-4 sentences)
5. Use examples from video when possible
```

**UI Component:**
- Slide-out chat panel (Intercom-style)
- Message bubbles with typing indicator
- "Ask about this video" placeholder

#### 2.2 Chat Persistence
**Feature:** Save chat history per video

**Database Schema:**
```prisma
model ChatMessage {
  id        String   @id @default(uuid())
  userId    String
  courseId  String
  videoId   String
  role      String   // 'user' | 'assistant'
  content   String   @db.Text
  context   Json?    // Store transcript version used
  createdAt DateTime @default(now())
}
```

**Features:**
- Resume conversations when student returns
- Show "Previously asked" quick questions
- Context versioning (if transcript updated)

### Phase 3: Smart Recommendations (Week 3)

#### 3.1 Tag-Based Course Organization
**Feature:** Database-driven recommendations using tags and categories

**Enhanced Schema:**
```prisma
model Course {
  // ... existing fields
  tags        String[] // ["react", "javascript", "frontend"]
  category    String   // "Programming", "Design", "Business"
  difficulty  String   // "Beginner", "Intermediate", "Advanced"
  keyTopics   String[] // AI-extracted from content
}

model UserPreference {
  id            String   @id @default(uuid())
  userId        String   @unique
  interests     String[] // Tags user is interested in
  completedCourses String[]
}
```

#### 3.2 Recommendation Algorithm
**Implementation:**
```typescript
function getRecommendations(userId: string, currentCourse: Course) {
  // 1. Same category + similar difficulty
  const similar = await prisma.course.findMany({
    where: {
      category: currentCourse.category,
      difficulty: currentCourse.difficulty,
      id: { not: currentCourse.id }
    },
    take: 3
  });
  
  // 2. Shared tags (at least 2 common)
  const related = await prisma.course.findMany({
    where: {
      tags: { hasSome: currentCourse.tags },
      id: { notIn: [currentCourse.id, ...similar.map(c => c.id)] }
    },
    take: 3
  });
  
  return [...similar, ...related];
}
```

**Why This Works:**
- No ML infrastructure needed
- Fast database queries
- Easy to understand and debug
- Impressive for resume (shows algorithmic thinking)

### Phase 4: Auto-Generated Quizzes (Weeks 3-4)

#### 4.1 Per-Video Quiz Generator
**Feature:** AI generates 5-question quizzes from video content

**OpenRouter Prompt:**
```
Create a 5-question multiple choice quiz based on this video content.

Video Title: [TITLE]
Key Topics: [TOPICS]
Condensed Content: [CONDENSED_TRANSCRIPT]

Requirements:
1. Test understanding, not memorization
2. Mix conceptual and practical questions
3. 4 options per question (1 correct, 3 plausible distractors)
4. Include explanation for correct answer

Return JSON:
{
  "questions": [
    {
      "question": "...",
      "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
      "correctAnswer": "B",
      "explanation": "..."
    }
  ]
}
```

**Database Schema:**
```prisma
model Quiz {
  id          String   @id @default(uuid())
  videoId     String   @unique
  courseId    String
  questions   Json     // Array of question objects
  generatedAt DateTime @default(now())
}

model QuizAttempt {
  id          String   @id @default(uuid())
  userId      String
  quizId      String
  score       Int      // 0-100
  answers     Json     // User's answers
  completedAt DateTime @default(now())
}
```

**UI:**
- Quiz appears below video player
- "Test Your Knowledge" button
- Immediate feedback with explanations
- Score tracking

### Phase 5: AI Course Previews (Week 4)

#### 5.1 Auto-Generated Metadata
**Feature:** AI generates course summary, objectives, prerequisites

**OpenRouter Prompt:**
```
Analyze this YouTube video and generate structured course metadata.

Title: [TITLE]
Description: [DESCRIPTION]
Transcript Preview: [FIRST_1000_CHARS]

Generate:
1. One-paragraph summary
2. 3-5 learning objectives
3. Prerequisites
4. Target audience
5. Estimated completion time
```

**Benefits:**
- Saves manual data entry
- Consistent, professional descriptions
- SEO-friendly content

---

## 🔧 Environment Setup

### Required Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding

# Payments (Stripe)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# AI Integration (OpenRouter)
OPENROUTER_API_KEY="sk-or-v1-..."

# YouTube API
YOUTUBE_API_KEY="AIza..."
```

### Setup Instructions

1. **Clone & Install:**
```bash
git clone <repo-url>
cd luma
pnpm install
```

2. **Database Setup:**
```bash
# Update DATABASE_URL in .env
pnpm prisma migrate dev
pnpm prisma generate
```

3. **Environment Configuration:**
```bash
# Copy example and fill in values
cp .env.example .env.local
# Edit .env.local with your keys
```

4. **Development:**
```bash
pnpm dev
```

5. **Stripe Webhook (Local Testing):**
```bash
# Install Stripe CLI
# Forward webhooks to localhost
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## 📚 API Documentation

### Server Actions

#### createCourse
**File:** `app/(pages)/create/action.ts`

**Purpose:** Create new course with Stripe product/price

**Input:**
```typescript
{
  title: string;        // Required, trimmed
  description: string;  // Optional
  price: number;        // 0 to 1,000,000
}
```

**Flow:**
1. Validate user is authenticated and is INSTRUCTOR
2. Upsert user record in database
3. Validate price range
4. If price > 0, create Stripe product and price
5. Create course in database
6. Redirect to dashboard

**Errors:**
- "Title required" - empty title
- "Price must be between $0 and $1000000" - invalid price
- "Failed to create Stripe product" - Stripe API error

#### manageChapters
**File:** `app/(pages)/Courses/[id]/manage/actions.ts`

**Purpose:** CRUD operations for chapters and lessons

**Actions:**
- `createChapter` - Add new chapter to course
- `updateChapter` - Edit chapter title
- `deleteChapter` - Remove chapter and lessons
- `createLesson` - Add lesson to chapter
- `updateLesson` - Edit lesson details
- `deleteLesson` - Remove lesson

**Input:** FormData with action type and relevant fields

### API Routes

#### POST /api/webhooks/stripe
**File:** `app/api/webhooks/stripe/route.ts`

**Purpose:** Handle Stripe webhook events

**Events:**
- `checkout.session.completed` - Create enrollment

**Security:** ⚠️ Currently lacks HMAC verification (see Technical Debt)

**Request Body:**
```json
{
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "metadata": {
        "userId": "user_abc123",
        "courseId": "course_xyz789"
      }
    }
  }
}
```

**Response:**
- `200 OK` - Success
- `500 Internal error` - Processing failed

#### POST /api/set-role
**File:** `app/api/set-role/route.ts`

**Purpose:** Set user role during onboarding

**Request Body:**
```json
{
  "role": "STUDENT" | "INSTRUCTOR"
}
```

**Response:**
- `200 OK` - Role updated
- `401 Unauthorized` - No user session

---

## 🧩 Component Architecture

### Key Components

#### Layout Components
- **Container** - Wrapper with max-width and responsive padding
- **Navbar** - Navigation with auth state, theme toggle, mobile menu

#### Page Components
- **Dashboard** - Role-based dashboard (instructor courses or student learning)
- **CourseCard** - Course display card with actions
- **CreatePage** - Course creation form
- **CoursePage** - Course details with enrollment/purchase
- **StudentView** - Video player with sidebar navigation
- **ManageChaptersClient** - Chapter/lesson management interface

#### UI Components (Shadcn)
- Button, Card, Input, Textarea, Label
- Alert Dialog, Badge, Dropdown Menu
- Select, Separator, Combobox

### Component Hierarchy

```
RootLayout
├── ClerkProvider
│   └── ThemeProvider
│       └── Navbar
│       └── Main Content
│           ├── / (Landing)
│           ├── /Courses (Listing)
│           ├── /course/[id] (Details)
│           │   └── CheckoutButton
│           ├── /course/[id]/view (Player)
│           │   └── StudentView
│           │       └── Sidebar
│           │       └── Video Player
│           ├── /dashboard
│           │   └── CourseCard
│           ├── /create
│           ├── /Courses/[id]/manage
│           │   └── ManageChaptersClient
│           ├── /onboarding
│           ├── /sign-in
│           └── /sign-up
```

---

## 🔒 Security Considerations

### Current Security Measures

✅ **Authentication:**
- Clerk handles auth with secure session management
- Role-based access control implemented
- Protected routes with middleware

✅ **Database:**
- Prisma prevents SQL injection
- Cascade deletes prevent orphaned records
- Unique constraints prevent duplicates

✅ **Payments:**
- Stripe handles PCI compliance
- Webhook-based enrollment (reliable)

### Security Gaps

⚠️ **Critical:**
- Stripe webhook lacks HMAC signature verification
- No rate limiting on API endpoints
- Some forms lack server-side validation

⚠️ **Medium:**
- No Content Security Policy headers
- No CORS configuration
- Error messages expose internal details

⚠️ **Low:**
- No input sanitization on text fields
- No brute force protection
- Missing security headers

### Recommended Fixes

1. **Enable Webhook Verification:**
```typescript
const event = stripe.webhooks.constructEvent(
  body,
  signature,
  process.env.STRIPE_WEBHOOK_SECRET
);
```

2. **Add Rate Limiting:**
```typescript
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500
});
```

3. **Input Validation:**
```typescript
import { z } from 'zod';

const courseSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  price: z.number().min(0).max(1000000)
});
```

---

## ⚡ Performance Optimizations

### Current Optimizations

✅ **Database:**
- Prisma Neon adapter for serverless PostgreSQL
- Nested includes reduce round-trips
- Connection pooling in production

✅ **Frontend:**
- Next.js 16 with Turbopack
- React Server Components where possible
- Client components only when needed

✅ **Images:**
- Next.js Image component (not yet fully utilized)

### Recommended Optimizations

1. **Database Indexing:**
```prisma
model Course {
  // ... fields
  @@index([instructorId])
  @@index([category])
  @@index([tags])
}
```

2. **Caching:**
- React Server Components caching
- SWR for client-side data fetching
- Redis for session caching (future)

3. **Lazy Loading:**
- Dynamic imports for heavy components
- Intersection Observer for below-fold content

4. **Bundle Optimization:**
- Tree shaking
- Code splitting by route
- Analyze bundle size with `@next/bundle-analyzer`

---

## 🚀 Future Enhancements

### Short Term (1-2 Months)

1. **Fix Technical Debt**
   - Resolve TypeScript errors
   - Add webhook HMAC verification
   - Implement proper error handling

2. **Core Features**
   - Progress tracking system
   - Chapter/lesson reordering (drag-and-drop)
   - Course editing functionality
   - Toast notifications (sonner)

3. **AI Integration Phase 1**
   - YouTube transcript pipeline
   - Content condensation
   - Basic AI tutor

### Medium Term (3-6 Months)

1. **AI Integration Phase 2**
   - Smart recommendations
   - Auto-generated quizzes
   - AI course previews

2. **UX Improvements**
   - Search and filtering
   - Course thumbnails
   - Mobile app (React Native)

3. **Instructor Tools**
   - Analytics dashboard
   - Student progress tracking
   - Revenue reports

### Long Term (6+ Months)

1. **Advanced Features**
   - Live streaming integration
   - Community features (forums, chat)
   - Certificates and credentials
   - Affiliate program

2. **Scale & Infrastructure**
   - CDN for video content
   - Microservices architecture
   - Multi-region deployment
   - Advanced caching (Redis)

3. **AI Advancements**
   - Personalized learning paths
   - Adaptive difficulty
   - Predictive analytics
   - Multi-language support

---

## 📊 Success Metrics

### Technical Metrics
- **TypeScript Coverage:** Target 100% (currently ~85%)
- **Test Coverage:** Target 80% (currently 0%)
- **Lighthouse Score:** Target 90+ (not measured)
- **Bundle Size:** Target <200KB initial (not measured)

### Business Metrics
- **Courses Created:** Track instructor adoption
- **Enrollments:** Track student engagement
- **Completion Rate:** Track course effectiveness
- **Revenue:** Track monetization success

---

## 🎯 Resume Impact

### Current Project Rating: 7/10

**Strengths:**
- Modern tech stack (Next.js 16, React 19, TypeScript)
- Full-stack implementation with real payments
- Clean architecture with thoughtful decisions
- Working MVP shipped in 10 days

**Gaps:**
- TypeScript errors reduce code quality score
- No AI/ML features (critical in 2025)
- Missing testing and documentation
- Security gaps (webhook verification)

### With AI Integration: 8.5-9/10

**After implementing AI roadmap:**
- ✅ Context-aware AI tutor (RAG architecture)
- ✅ Smart recommendations (algorithmic approach)
- ✅ Auto-generated content (AI pipeline)
- ✅ Cost-effective AI integration (OpenRouter free tier)
- ✅ Real-world problem solving (content condensation)

**Interview Talking Points:**
1. "I built a RAG-based AI tutor that grounds responses in specific video content"
2. "Implemented algorithmic recommendations without expensive ML infrastructure"
3. "Created an AI content pipeline that processes YouTube videos at zero cost"
4. "Designed a webhook-based payment system that handles edge cases reliably"

---

## 📝 Development Notes

### Code Style
- Use TypeScript strict mode
- Prefer Server Components when possible
- Use `useTransition` for form submissions
- Comment complex logic with "WTF" style explanations

### Git Workflow
- Main branch: Production-ready code
- Feature branches: `feature/ai-tutor`, `fix/webhook-security`
- Commit messages: Conventional commits format

### Deployment Checklist
- [ ] All TypeScript errors resolved
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Stripe webhooks configured
- [ ] Clerk JWT template configured
- [ ] Security headers added
- [ ] Error tracking (Sentry) configured
- [ ] Analytics (Plausible/GA) added

---

## 🏁 Conclusion

LUMA represents a solid foundation for an AI-powered educational platform. The current MVP demonstrates full-stack capabilities with modern technologies, while the AI integration roadmap positions it as a standout portfolio project.

**Key Takeaways:**
1. **Ship fast, iterate:** MVP completed in 10 days proves execution ability
2. **Technical depth:** Thoughtful architecture decisions show senior-level thinking
3. **AI readiness:** Clear roadmap for integrating AI without expensive infrastructure
4. **Real-world impact:** Solves actual problems (content curation, personalized learning)

**Next Steps:**
1. Fix technical debt (TypeScript errors, security)
2. Implement AI features incrementally
3. Add testing and documentation
4. Deploy and gather user feedback
5. Iterate based on real usage

---

**Built with ❤️ and ☕ by [Your Name]**

**License:** Private (for portfolio use)

**Last Updated:** January 2026
