# RecipeVault AI Agent Instructions

Before changing this app, use the appropriate skills, agents, prompts, checklists, templates, and guides from `C:\Apps`.

## Required Workspace Context

Read these first for significant work:
- `C:\Apps\CODEX_WORKSPACE_GUIDE.md`
- `C:\Apps\mobile-apps\RecipeVaultAI\docs\WORKSPACE_SKILL_AGENT_USAGE.md`
- The relevant files in `C:\Apps\_codex\agents`
- The relevant files in `C:\Apps\_codex\skills`

## Expo Version Rule

Expo changes quickly. Read the exact versioned docs at `https://docs.expo.dev/versions/v57.0.0/` before changing Expo APIs, native modules, routing, builds, notifications, images, or app config.

## Default Agent Set

For RecipeVault AI, think with these roles:
- Lead Software Engineer: architecture, scope, quality bar, maintainability.
- UI/UX Designer: premium mobile experience, accessibility, responsive behavior.
- Frontend Engineer: Expo, React Native, routing, state, components, TypeScript.
- Database Architect: Supabase/Postgres schema, RLS, indexing, migrations.
- Security Reviewer: auth, secrets, storage, RLS, rate limits, AI safety.
- QA Test Engineer: unit, integration, component, smoke, regression tests.
- DevOps Release Engineer: EAS, CI, environment docs, app-store readiness.
- .NET Backend Engineer: only if a future .NET service is added.

## Default Skill Set

Use the relevant local skills from `C:\Apps\_codex\skills`. For full feature work, include mobile app design, UI/UX Pro Max, frontend design, accessibility review, AI app development, SQL database design, auth security, analytics monitoring, payment integration, admin dashboard, testing strategy, deployment hosting, documentation, code review, production readiness, and impeccable.

## Quality Gate

Do not call work complete until available checks pass or the reason they could not run is stated:

```powershell
npm run typecheck
npm run test
npx expo install --check
```
