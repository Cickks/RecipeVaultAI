# RecipeVault AI Production Roadmap

## Purpose

This roadmap is the source of truth for moving RecipeVault AI from its current development state to a published iOS and Android product. A phase is complete only when its exit criteria are verified. Screens or code foundations alone do not complete a phase.

## Current Status

- Active phase: Phase 1 - Supabase Auth and Recipe CRUD.
- Readiness verdict: In progress; not yet Phase 1 complete or production ready.
- Verified: real Supabase connection, initial migration applied, first-user registration/login, email confirmation at the backend, recipe creation, and recipe list/detail loading.
- Still required: mobile auth callback handling, password recovery, two-user RLS isolation, final Android smoke test, final checks, review, commit, push, and follow-up pull request.

## Phase 0 - Production Foundation

Status: Complete.

Scope:

- Expo SDK 57 React Native and TypeScript application.
- Expo Router, React Query, Zustand, React Hook Form, NativeWind, and Supabase client foundations.
- Feature-first architecture and repository boundaries.
- Initial product, architecture, database, deployment, and store-readiness documentation.
- CI workflow and pull request template.

Exit criteria:

- Starter app runs on the Android emulator.
- Baseline typecheck, tests, and Expo dependency checks pass.
- Repository, branch workflow, and GitHub remote exist.

## Phase 1 - Supabase Auth and Recipe CRUD

Status: In progress.

Goal: A user can securely manage private recipes against the real Supabase backend.

Scope:

- Supabase environment configuration without committed secrets.
- Versioned initial Postgres migration, ownership indexes, foreign keys, and RLS policies.
- Registration, email verification, login, logout, and password recovery.
- Create, read, update, and delete recipe behavior through repository/service boundaries.
- User-aware React Query cache keys and session transitions.
- Accessible signed-in, signed-out, loading, empty, and error states.

Remaining verification checklist:

- [ ] Verification links return to the mobile app without a blank or dead-end screen.
- [ ] Password reset opens the app and allows the user to choose a new password.
- [x] User A can create and load a recipe from Supabase.
- [ ] User B cannot list or open User A's recipe.
- [ ] User B can create and load only User B's recipes.
- [ ] Recipe update and delete are verified against Supabase under RLS.
- [ ] Login, logout, relaunch, and session restoration pass on the Android emulator.
- [ ] `npm run typecheck` passes.
- [ ] `npm run test` passes.
- [ ] `npx expo install --check` passes.
- [ ] Security, code-review, and production-readiness checks find no Phase 1 blocker.
- [ ] Environment files are ignored and a staged-change secret scan passes.
- [ ] Changes are committed, pushed, and reviewed in a follow-up pull request.

Exit gate: All checklist items above are verified. Phase 1 must not be marked complete while auth callbacks, recovery, or two-user RLS isolation remain untested.

## Phase 2 - Reliable Offline Cookbook

Status: Planned.

Goal: Recipe management remains dependable during poor connectivity and app restarts.

Scope:

- Complete recipe edit and delete UX if any Phase 1 surface remains incomplete.
- Durable local persistence and offline mutation queue.
- Sync metadata, retry behavior, idempotent writes, and reconnect handling.
- Explicit conflict resolution for recipe text and safe last-write-wins rules for low-risk settings.
- Image upload through private Supabase Storage buckets and signed URLs.
- Broader repository integration and failure-path tests.

Exit gate: Create, edit, delete, image upload, offline use, reconnect, retry, and conflict scenarios pass without data loss or cross-user leakage.

## Phase 3 - Organization and Search

Status: Planned.

Goal: Users can quickly organize and retrieve a growing cookbook.

Scope:

- Real Supabase-backed favorites, collections, and tags.
- Search by title, ingredient, cuisine, source, and favorite state.
- Indexed Postgres search with measured query performance.
- Polished filters, empty states, and accessible result navigation.

Exit gate: Organization and search work against real user data, remain private under RLS, and meet agreed performance and accessibility checks.

## Phase 4 - Meal Planning and Groceries

Status: Planned.

Goal: Recipes flow naturally into weekly plans and actionable grocery lists.

Scope:

- Supabase-backed meal plans and meal-plan entries.
- Generate and merge grocery items from selected recipes.
- Add, edit, check off, group, and remove grocery items.
- Preserve user ownership and offline behavior across planning workflows.

Exit gate: A user can plan meals, generate a correct grocery list, use it offline, and never access another user's planning data.

## Phase 5 - Compliant AI Import

Status: Planned.

Goal: Convert user-provided recipe content into a reviewable structured draft.

Scope:

- Backend-only AI provider integration using Supabase Edge Functions or another protected service.
- Pasted text and user-authorized image/OCR inputs.
- Structured validation, rate limits, observability, and cost controls.
- Privileged prompts remain static; clearly delimited user content stays in untrusted user/data positions.
- Mandatory user review and editing before a recipe is saved.
- Privacy disclosures and retention rules for submitted content.

Guardrail: Do not scrape TikTok, Instagram, or other platforms or bypass their access controls or terms. Import only content the user is authorized to provide through compliant interfaces.

Exit gate: Security, privacy, cost, quality, failure-mode, and platform-terms reviews pass with no provider secret present in the mobile application.

## Phase 6 - Observability, Accessibility, and Hardening

Status: Planned.

Goal: The product can be operated and supported safely in production.

Scope:

- Sentry crash reporting with source maps and verified test events.
- PostHog analytics with a documented event taxonomy and privacy controls.
- Performance profiling for launch, recipe lists, images, search, and sync.
- Accessibility review for screen readers, focus, contrast, touch targets, dynamic text, and reduced motion.
- Backup, migration, rollback, incident response, abuse controls, and support procedures.
- Dependency and secret scanning with compatible remediation.

Exit gate: Monitoring, analytics, accessibility, performance, backup/restore, migration rollback, security, and operational runbooks are verified in staging.

## Phase 7 - Monetization and Store Release

Status: Planned.

Goal: Publish stable production builds to Google Play and the Apple App Store.

Scope:

- RevenueCat entitlement integration before enabling paid features.
- Development, staging, and production Supabase separation.
- EAS preview and production build profiles, signing, and release channels.
- App icon, splash screen, screenshots, Android feature graphic, and store metadata.
- Privacy Policy, Terms of Service, support URL, account deletion, privacy labels, and data-safety forms.
- Internal testing, closed beta, staged rollout, rollback plan, and post-launch monitoring.

Exit gate:

- Release candidates pass physical-device testing on supported iOS and Android versions.
- Production secrets and signing credentials are configured outside source control.
- Store compliance, privacy, security, accessibility, and release checklists pass.
- Builds are approved for staged production rollout.

## Definition of Done for Every Phase

- Acceptance criteria are tested, not assumed.
- Typecheck, automated tests, dependency compatibility checks, and relevant builds pass.
- User-facing workflows receive device smoke testing.
- RLS and authorization are tested with at least two users for new user-owned data.
- Secrets remain outside source control and logs.
- Every backend endpoint has tested authentication, authorization, schema validation, and shared rate limits appropriate to its abuse and cost risk.
- User-controlled content never occupies system or developer prompt positions and model outputs are schema-validated.
- Database changes are migration-based and include rollback or recovery guidance.
- Documentation and `.env.example` reflect the implemented system without containing credentials.
- Accessibility, security, privacy, error handling, and observability are reviewed in proportion to risk.
- Work is committed intentionally, pushed, reviewed through a pull request, and linked to its verification evidence.

## Supporting Documents

- Product scope: `docs/PRD.md`
- System boundaries: `docs/ARCHITECTURE.md`
- Database design: `docs/DATABASE.md`
- Supabase setup: `docs/SUPABASE_SETUP.md`
- Deployment environments: `docs/DEPLOYMENT_GUIDE.md`
- Store requirements: `docs/APP_STORE_READINESS.md`
- Security requirements: `docs/SECURITY.md`

Update this roadmap whenever scope, phase status, launch blockers, or release requirements change.
