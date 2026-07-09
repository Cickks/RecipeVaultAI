# CECE Prompt Review

This review captures the working interpretation of `C:\Apps\ceceapp\CeceAppIdea.docx` so RecipeVault AI keeps following the original CECE production plan.

## Core Understanding

RecipeVault AI is not a prototype. It is intended to become a real iOS and Android business: a permanent cookbook for recipes found on TikTok, Instagram, Facebook, YouTube, Pinterest, websites, family, and friends.

The app must make saving, organizing, editing, searching, meal planning, grocery list creation, and future AI-assisted importing feel simple and premium.

## Product North Star

Create the easiest and most beautiful recipe application available.

Every product decision should optimize for:
- Speed.
- Simplicity.
- Beautiful UI/UX.
- Accessibility.
- Performance.
- Security.
- Scalability.
- Maintainability.

## Required Architecture Direction

The prompt intentionally chooses a production mobile stack:
- React Native and Expo for one iOS/Android codebase.
- TypeScript for strict, maintainable code.
- Expo Router for app navigation.
- React Query for server/cache state.
- Zustand for local app state.
- React Hook Form for forms.
- NativeWind and Reanimated for polished UI.
- Supabase for Auth, Postgres, Storage, RLS, and serverless backend work.
- PostHog for analytics.
- Sentry for crash reporting.
- RevenueCat later for Pro and subscription entitlements.

## Business Model Implications

The app must support multiple monetization paths without redesign:
- Free: manual recipes, folders, photos, search, favorites, meal planner, grocery list, dark mode, text export.
- Pro one-time purchase: AI import, OCR, cleanup, nutrition estimation, smart grocery lists, cloud backup, sharing, PDF export, priority features.
- Future Premium subscription: unlimited AI processing, AI meal planning, grocery optimization, cooking assistant, family sharing, multi-device sync, backups, OCR, early access.

Implementation implication: premium gates should go through an entitlement layer, not scattered boolean checks.

## AI Safety And Product Rules

The CECE prompt is explicit: do not violate TikTok, Instagram, or other platform terms. The app should not illegally download videos or scrape protected content.

Allowed path:
- User pastes recipe text, captions, transcripts, ingredient lists, screenshots/OCR text, or notes.
- AI converts user-provided content into structured editable recipes.
- Future link import only where legal APIs or permissions allow it.
- Always preserve source attribution.
- Always keep AI output editable by the user.

## AI Agent Roadmap

The app should eventually treat AI as independent services:
- Recipe Import Agent.
- Recipe Cleanup Agent.
- Nutrition Agent.
- Meal Planning Agent.
- Shopping Agent.
- Cooking Assistant.

Implementation implication: AI logic should live behind service boundaries, ideally Supabase Edge Functions first, and possibly a dedicated backend later if scale or complexity demands it.

## Database Requirements

The schema must support:
- Users/profiles.
- Recipes.
- Ingredients and recipe ingredients.
- Instructions.
- Recipe images.
- Collections and collection recipes.
- Favorites.
- Meal plans and meal plan recipes.
- Shopping lists and items.
- Recipe sources.
- Tags and recipe tags.
- User settings.
- Notifications.

Security requirements:
- Supabase Auth.
- JWT-backed access.
- Row Level Security.
- Validation.
- Rate limiting for server-side/AI work.
- Image upload security.

## UX Requirements

The app should feel comparable in quality to Pinterest, Apple Reminders, Notion, Instagram, Paprika Recipe Manager, and Mealime.

Design requirements:
- Soft colors.
- Modern cards.
- Rounded corners.
- Beautiful typography.
- Smooth animations.
- Light and dark mode.
- Responsive layouts.
- Accessibility.
- Large recipe images.
- Premium feel on every screen.

## Offline Requirements

The app should eventually work offline:
- Browse recipes.
- Edit recipes.
- Create recipes.
- View grocery lists.
- Sync changes automatically when back online.

Implementation implication: do not couple UI directly to online-only Supabase calls. Use repositories and sync boundaries so offline persistence can be added cleanly.

## Admin And Operations

The future admin panel should support:
- User management.
- Analytics.
- Crash reports.
- Recipe moderation.
- Feature flags.
- Subscription management.
- Announcements.

Implementation implication: admin access must be server-authorized and audited. Do not rely on hidden mobile UI for admin security.

## Current Starter Alignment

The starter foundation already covers:
- Expo SDK 57, TypeScript, Expo Router.
- Core requested dependencies.
- Feature-first project structure.
- PRD, architecture, design, database, Supabase setup, deployment, and app store docs.
- Initial Supabase schema and RLS migration.
- Starter screens for home, recipes, search, add recipe, grocery, planner, profile, auth, AI import, recipe detail, and admin preview.
- AI import safety boundary for pasted text.
- Basic tests for grocery merging and AI draft validation.
- Workspace skill/agent usage mapping.

## Gaps To Build Next

After device testing and first GitHub commit, the next production passes should be:
1. Connect real Supabase project credentials through local environment.
2. Implement real Supabase Auth: register, login, logout, forgot password, email verification state.
3. Replace sample data with repository-backed recipe CRUD.
4. Add Supabase Storage image upload, compression, and signed URL handling.
5. Add real collections, favorites, tags, grocery lists, and meal planner persistence.
6. Add offline-first local persistence and sync queue.
7. Add PostHog event taxonomy and Sentry initialization.
8. Add Supabase Edge Function architecture for AI import and cleanup.
9. Add RevenueCat entitlement abstraction before implementing paid features.
10. Add app-store assets, privacy policy, terms, screenshots, and metadata.

## Non-Negotiable Build Rule

RecipeVault AI should be built like a production startup product from the beginning. Each feature pass should include:
- Product reasoning.
- Architecture fit.
- Security review.
- UI/UX polish.
- Accessibility.
- Tests where practical.
- Documentation updates.
- Verification commands.
