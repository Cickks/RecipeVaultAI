# Workspace Skills And Agents Usage

RecipeVault AI should use the `C:\Apps` workspace system intentionally. Do not load every file blindly for tiny edits, but for any meaningful feature, review, design, database, AI, payment, deployment, or release work, load the relevant agent and skill files before changing code.

## Agents

| Agent | Use In RecipeVault AI |
| --- | --- |
| `lead-software-engineer.md` | Architecture, feature sequencing, code quality, naming, maintainability, and final decisions. |
| `ui-ux-designer.md` | Premium mobile design, layout, typography, spacing, accessibility, light/dark mode, and interaction polish. |
| `frontend-engineer.md` | Expo Router, React Native, TypeScript, React Query, Zustand, React Hook Form, NativeWind, and components. |
| `database-architect.md` | Supabase/Postgres schema, RLS, indexes, migrations, seed data, and query performance. |
| `security-reviewer.md` | Supabase Auth, RLS, Storage policies, secrets, AI safety, payment security, and safe defaults. |
| `qa-test-engineer.md` | Unit tests, integration tests, component tests, smoke checks, and release confidence. |
| `devops-release-engineer.md` | EAS builds, CI, environment docs, app store readiness, deployment guide, and release process. |
| `dotnet-backend-engineer.md` | Reserve for a future .NET service, admin API, or backend expansion outside Supabase. |

## Core Skills For Every Major App Pass

| Skill | Use In RecipeVault AI |
| --- | --- |
| `mobile-app-design.skill.md` | Native-feeling iOS/Android layouts, safe areas, tap targets, permissions, offline states. |
| `ui-ux-pro-max.skill.md` | Deep premium redesign and product-quality visual polish. |
| `frontend-design.skill.md` | Component structure, responsive UI, frontend maintainability, and states. |
| `accessibility-review.skill.md` | Labels, focus, contrast, target sizes, semantic structure, and motion tolerance. |
| `testing-strategy.skill.md` | Practical test coverage for recipes, grocery lists, AI drafts, auth, and sync. |
| `documentation.skill.md` | README, setup, architecture, Supabase, deployment, and handoff docs. |
| `code-review.skill.md` | Bug-focused review before larger changes are considered done. |
| `production-readiness.skill.md` | Launch blockers, app-store readiness, environment, security, tests, and monitoring. |
| `impeccable.skill.md` | Final client-ready polish across UI, code, docs, tests, security, and repo hygiene. |

## Feature-Specific Skills

| Skill | Use In RecipeVault AI |
| --- | --- |
| `ai-app-development.skill.md` | AI import, cleanup, nutrition estimation, meal planning, shopping agent, cooking assistant. |
| `sql-database-design.skill.md` | Recipe, ingredient, instruction, collection, meal plan, grocery, tag, and settings schemas. |
| `auth-security.skill.md` | Supabase Auth, RLS, Storage access, secure configuration, validation, and rate limits. |
| `analytics-monitoring.skill.md` | PostHog events, Sentry, crash reports, retention, conversions, feature usage. |
| `payment-integration.skill.md` | RevenueCat entitlement architecture, Pro one-time purchase, future subscription support. |
| `admin-dashboard.skill.md` | User management, moderation, analytics, feature flags, subscriptions, announcements. |
| `deployment-hosting.skill.md` | EAS builds, staging/production setup, CI, release channels, rollback notes. |
| `seo-content.skill.md` | App Store metadata, marketing copy, landing pages, support content, discoverability. |
| `github-repo-polish.skill.md` | GitHub readiness, CI, PR templates, README quality, and repo hygiene. |
| `frontend-refactor.skill.md` | Component cleanup after features grow. |
| `ui-ux-polish.skill.md` | Smaller UI refinement passes. |
| `website-design.skill.md` | Future RecipeVault AI marketing website or landing page. |

## Backend Skills Not Usually Needed

These are available but not primary because RecipeVault AI uses Supabase rather than ASP.NET Core:
- `dotnet-api-design.skill.md`
- `clean-architecture-dotnet.skill.md`
- `entity-framework-core.skill.md`

Use them only if the app later adds a .NET API, admin service, billing service, or AI orchestration backend.

## Default Workflow

1. Read `CODEX_WORKSPACE_GUIDE.md`.
2. Read this usage map.
3. Load relevant agents and skills for the task.
4. Inspect existing app files before changing them.
5. Implement the smallest professional slice that advances the product.
6. Run:

```powershell
npm run typecheck
npm run test
npx expo install --check
```

7. Report checks, changed files, remaining blockers, and the next production step.
