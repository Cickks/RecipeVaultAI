# RecipeVault AI

RecipeVault AI is a production-minded cross-platform recipe manager for iOS and Android, built with Expo, React Native, TypeScript, Supabase, Postgres, PostHog, Sentry, and a future RevenueCat entitlement layer.

## Getting Started

```powershell
npm install
npm run start
npm run typecheck
```

Copy `.env.example` to your local Expo environment configuration and fill in Supabase/PostHog/Sentry values. Never commit real secrets.

## Device Smoke Test

This app targets Expo SDK 57. If Expo Go reports that the project requires a newer version, update Expo Go from the App Store or Play Store, then restart Metro with a clean cache:

```powershell
npx expo start --clear
```

For native modules that require a development build, use the generated Android/iOS project with Expo development client instead of Expo Go.

## Current Foundation

- Expo SDK 57, React Native 0.86, React 19.2.3.
- Expo Router app navigation.
- Feature-first `src/features` architecture.
- Supabase client and schema migration draft.
- Product docs, PRD, architecture, design system, app store checklist, and deployment guide.
- Premium mobile dashboard, recipe browsing, add recipe, search, grocery list, meal planner, profile/settings, and auth screens.
- Project-specific workspace usage map in `docs/WORKSPACE_SKILL_AGENT_USAGE.md`.

## Quality Commands

```powershell
npm run typecheck
npm run test
npx expo install --check
```

`npm audit` currently reports moderate findings from the generated Expo dependency tree. Do not run `npm audit fix --force` without checking Expo compatibility.
