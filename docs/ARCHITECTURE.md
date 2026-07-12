# Architecture

## Stack
- React Native with Expo SDK 57.
- TypeScript with strict mode.
- Expo Router for navigation.
- React Query for server/cache state.
- Zustand for local UI/app state.
- React Hook Form and Zod for forms and validation.
- Supabase Auth, Postgres, Storage, Edge Functions, and RLS.
- PostHog for analytics.
- Sentry for crash reporting.
- RevenueCat planned for entitlements.

## App Layers
- `app`: Expo Router routes and navigation shells.
- `src/components`: reusable UI primitives and product components.
- `src/features`: feature modules such as recipes, auth, grocery, meal planning, AI, profile.
- `src/lib`: external clients and cross-cutting infrastructure.
- `src/theme`: design tokens.
- `src/types`: shared domain types.
- `supabase`: SQL migrations and seed data.
- `docs`: PRD, architecture, design, deployment, store readiness.

## Data Flow
UI screens call feature hooks. Feature hooks use React Query and repositories. Repositories call Supabase. Supabase RLS enforces ownership by `auth.uid()`.

## Offline Strategy
Phase 1 stores sample/local state and detects network status. Phase 2 adds a durable offline queue and sync metadata per record. Conflict strategy should prefer explicit user choice for recipe text conflicts and last-write-wins for low-risk settings.

## AI Strategy
AI import is an independent service boundary. The mobile app submits pasted text/captions/transcripts to a backend function. The function validates input, calls an AI provider, returns structured JSON, and the user reviews every field before saving.

Backend AI endpoints must authenticate and authorize callers, validate inputs and outputs, enforce shared per-user abuse and cost limits, and keep provider secrets outside the mobile bundle. Static privileged prompts are version controlled. User content is clearly delimited, escaped or encoded, and sent only as untrusted user/data content; it must never be interpolated into system or developer instructions. See `docs/SECURITY.md`.

## Monetization Strategy
Entitlements are abstracted behind a `useEntitlements` hook and future RevenueCat repository. Free, Pro one-time purchase, and Premium subscription can coexist without redesigning feature checks.
