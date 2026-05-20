# Data Fetching

## Server Components Only

ALL data fetching in this app must be done via **React Server Components**. There are no exceptions.

- **DO NOT** fetch data in Client Components (`"use client"`)
- **DO NOT** fetch data in Route Handlers (`src/app/api/`)
- **DO NOT** use `useEffect` + `fetch` or any client-side data fetching library (SWR, React Query, etc.)
- **ONLY** fetch data in Server Components by calling helper functions from `/data` directly

## /data Helper Functions

All database queries must go through helper functions located in the `/data` directory. These functions are the only place database access is allowed.

Rules for `/data` helper functions:

- **Always use Drizzle ORM** — never write raw SQL strings
- **Always scope queries to the authenticated user** — every query that returns user data must filter by the current user's ID. A logged-in user must never be able to read another user's data.
- Accept the `userId` as an explicit parameter and apply it as a `where` condition in every query

### Example pattern

```ts
// data/workouts.ts
import { db } from "@/db";
import { workouts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getWorkoutsForUser(userId: string) {
  return db.select().from(workouts).where(eq(workouts.userId, userId));
}
```

```tsx
// app/workouts/page.tsx  (Server Component)
import { getWorkoutsForUser } from "@/data/workouts";
import { auth } from "@clerk/nextjs/server";

export default async function WorkoutsPage() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  const workouts = await getWorkoutsForUser(userId);

  return <WorkoutList workouts={workouts} />;
}
```

## Summary

| Concern             | Where it lives                                       |
| ------------------- | ---------------------------------------------------- |
| Database queries    | `/data/*.ts` via Drizzle ORM                         |
| Data access in UI   | Server Components only                               |
| User data isolation | Enforced in every `/data` helper via `userId` filter |
