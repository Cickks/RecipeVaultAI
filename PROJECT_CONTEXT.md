# RecipeVault AI Project Context

Last verified: 2026-07-12 on `agent/phase1-supabase-security` at `e9edbc5`.

## Product

**Purpose:** RecipeVault AI is a production-minded personal cookbook for saving, organizing, finding, and using recipes from manual entry, family sources, notes, and user-authorized imports.

**Vision:** Give home cooks one dependable, premium place for private recipes, meal planning, grocery workflows, and eventually compliant AI-assisted import without losing ownership, privacy, or offline reliability.

**Target users:** Home cooks, meal planners, families preserving recipes, social-content recipe collectors, and nutrition-conscious users.

**Platforms:** iOS and Android from one Expo/React Native codebase. Web is available through Expo tooling but is not a documented release target.

## Current State

- Development phase: **Phase 1 - Supabase Auth and Recipe CRUD**
- Milestone: securely complete real Supabase auth and private recipe CRUD under RLS.
- Status: **In progress; not production ready.**
- Draft PR: [#3 Harden Supabase auth and recipe ownership](https://github.com/Cickks/RecipeVaultAI/pull/3), targeting `main`.
- Verified foundations: Supabase connection, initial migration applied, first-user signup/login, backend email confirmation, recipe create/list/detail, logout UI, user-aware query caches, and Android custom-scheme route rendering.
- Remaining gate: real verification/recovery callbacks, callback transaction binding, update/delete, two-user direct RLS denial tests, server-side recipe resource bounds, and final Android/check/review evidence.

The detailed phase gates live in [docs/ROADMAP.md](docs/ROADMAP.md). Feature-level truth lives in [FEATURE_STATUS.md](FEATURE_STATUS.md).

## Technology

- TypeScript 6 strict mode, React 19, React Native 0.86, Expo SDK 57.
- Expo Router for file-based navigation.
- NativeWind and React Native StyleSheet with tokens in `src/theme`.
- React Query for server state; Zustand for auth/local app state.
- React Hook Form and Zod for forms and validation.
- Supabase JS, Auth, hosted Postgres/PostgREST, migrations, and RLS.
- AsyncStorage for the current Supabase session adapter; SecureStore is installed but not yet the active adapter.
- Vitest for unit tests; GitHub Actions for CI.
- Sentry and PostHog are installed but production configuration is not verified.
- RevenueCat and EAS release configuration are planned, not implemented.

See [TECH_STACK.md](TECH_STACK.md) for versions and conventions.

## Repository Map

| Path | Responsibility |
| --- | --- |
| `app/` | Expo Router routes, tab shell, auth callbacks, and screen composition |
| `src/components/` | Reusable product UI primitives |
| `src/features/` | Feature logic, hooks, validation, repositories, and focused tests |
| `src/lib/` | External clients and cross-cutting adapters |
| `src/providers/` | Application providers and lifecycle/cache coordination |
| `src/theme/` | Design tokens |
| `src/types/` | Shared domain types |
| `src/data/` | Local sample/fallback data |
| `supabase/migrations/` | Versioned database schema, ownership constraints, indexes, and RLS |
| `.github/` | CI workflow and pull request template |
| `docs/` | Product, architecture, security, database, deployment, design, and AI workflow docs |

## Architecture Decisions

- Feature-first modules with Expo routes kept thin.
- Screens call hooks; hooks use React Query/Zustand; repositories isolate Supabase access.
- Supabase is the Phase 1 backend. No separate custom API exists.
- Every user-owned database row carries `user_id`; RLS binds access to `auth.uid()`.
- Composite foreign keys couple child/join rows to same-owner parents.
- Client checks improve UX but never replace backend authorization.
- React Query keys include user identity and private cache is cleared on account changes.
- Missing Supabase environment values use a local sample-data fallback for development only.
- Database evolution is migration-based. Dashboard-only schema changes are not authoritative.
- AI providers, privileged secrets, rate limits, and tool authorization must remain in a protected backend boundary.

Settled decisions and alternatives are recorded in [DECISION_LOG.md](DECISION_LOG.md).

## Auth, Data, Backend, and Frontend

**Authentication:** Supabase email/password Auth with verification, resend, login, logout, session restoration, password recovery, and custom scheme `recipevaultai://`. The callback implementation currently validates provider credentials but does not correlate callbacks to a locally initiated transaction/flow; this is an open security finding.

**Database:** Hosted Supabase Postgres with `0001_initial_schema.sql`, RLS on user-owned tables, owner policies, indexes, and owner-coupled foreign keys. Real two-user denial and complete CRUD tests are still required.

**Backend:** Direct Supabase Auth/PostgREST for current features. Future Storage and Edge Functions must add explicit authentication, authorization, schema limits, shared atomic rate limits, observability, and server-held secrets.

**Frontend:** Mobile-native Expo Router screens with reusable components and theme tokens. Auth and recipe screens are functional foundations; placeholder grocery, planner, AI, and admin surfaces are not complete backend features.

## Engineering Standards

- Keep TypeScript strict and prefer `@/*` imports for `src/*`.
- Preserve feature/repository boundaries; do not call Supabase ad hoc throughout screens.
- Use structured Supabase APIs, typed inputs, Zod validation, and generic user-safe errors.
- Never trust submitted `user_id`; derive identity from the authenticated session and enforce RLS.
- Never commit secrets. Track only placeholder `.env.example`; all `.env*` variants remain ignored.
- Keep privileged prompts static. Encode/delimit user content in untrusted user/data positions only.
- Add succinct comments only where behavior is not self-evident.
- Keep UI accessible, token-driven, safe-area aware, and native to iOS/Android.
- Update persistent context docs after significant implementation work.

## Git and Delivery

- `main` is the integration branch.
- Meaningful work uses a focused branch and pull request.
- Current Phase 1 branch is `agent/phase1-supabase-security`; PR #3 remains draft until its checklist is verified.
- Commit coherent, reviewed slices with imperative messages; do not mix unrelated changes.
- Mark a draft PR ready only after tests, device checks, security review, documentation, and manual evidence pass.
- Merge the PR before deleting its branch. Never delete an open PR branch.

## Testing Strategy

- Unit tests: Vitest beside feature code.
- Required local/CI checks: `npm run typecheck`, `npm run test`, `npx expo install --check`.
- Device verification: Android emulator now; physical Android/iOS before release.
- Backend verification: direct Supabase tests with two users for every user-owned CRUD surface and child relationship.
- Security verification: hostile auth links, callback/recovery mismatch, direct API bypass attempts, input bounds, RLS, secrets, and future endpoint rate limits.
- CI currently runs install, typecheck, tests, and Expo dependency compatibility on PRs and pushes to `main`.

## Agent Workflow

Follow [docs/AI_WORKFLOW.md](docs/AI_WORKFLOW.md) and [docs/WORKSPACE_SKILL_AGENT_USAGE.md](docs/WORKSPACE_SKILL_AGENT_USAGE.md). Start from this file and [SESSION_HANDOFF.md](SESSION_HANDOFF.md), inspect implementation, load only relevant workspace agents/skills, implement the smallest production slice, verify it, then synchronize these context documents.

## Definition of Done

A feature or phase is done only when:

- Acceptance criteria work against the real intended backend, not only local/sample data.
- Authorization and RLS pass direct negative tests with at least two users.
- Relevant typecheck, tests, Expo checks, and device smoke tests pass.
- Security, accessibility, privacy, error, loading, empty, and offline states are reviewed in proportion to risk.
- Secrets remain untracked and logs contain no tokens/private content.
- Database changes are versioned migrations with recovery guidance.
- Documentation, feature status, decisions, and handoff are current.
- Work is intentionally committed, pushed, reviewed, and merged through a green PR.

## Priorities and Debt

Current priorities:

1. Bind auth callbacks to pending transaction, route, and recovery intent.
2. Add server-side recipe size/cardinality/quota controls and atomic creation.
3. Implement recipe update/delete through repository boundaries.
4. Complete real verification/recovery and two-user RLS tests.
5. Run final checks, Android smoke test, security/production review, and update PR #3.

Known technical debt:

- Callback state/intent correlation is absent.
- Recipe text/child rows and cumulative per-user writes lack server-enforced limits.
- Recipe create uses separate inserts and can leave partial records.
- Update/delete repository operations are absent.
- Session persistence uses AsyncStorage; platform-backed secure storage remains an evaluation item.
- Real RLS integration tests, secret scanning, and dependency scanning are not in CI.
- Local `main` is stale; use remote/PR state carefully and do not reset user branches.

## Roadmap Summary

Phase 1 completes secure auth and private recipe CRUD. Later phases add reliable offline sync and private images, organization/search, meal planning/groceries, compliant AI import, observability/accessibility/hardening, then monetization and store release. The authoritative gates are in [docs/ROADMAP.md](docs/ROADMAP.md).
