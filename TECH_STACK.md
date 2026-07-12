# Technology Stack

Last verified from `package.json`, `app.json`, CI, and source on 2026-07-12.

## Languages and Runtime

- TypeScript `~6.0.3`, strict mode.
- JavaScript/Node.js for tooling; CI uses Node 24.
- SQL for versioned Supabase/Postgres migrations.
- React 19.2.3 and React Native 0.86.0.

## Frontend

- Expo SDK `~57.0.4` and Expo Router `^57.0.4`.
- NativeWind 4 plus React Native StyleSheet and tokens.
- Lucide React Native icons.
- React Hook Form 7 and Zod 4.
- Zustand 5 for auth/local state.
- TanStack React Query 5 for remote/cache state.
- Expo modules for linking, secure store, files, images, notifications, print, sharing, haptics, and development builds.

## Backend and Data

- Supabase JS `^2.110.1`.
- Supabase email/password Auth.
- Hosted Postgres and PostgREST/Data API.
- SQL migrations and Row Level Security.
- Supabase Storage and Edge Functions are planned but not implemented.
- Local sample recipe fallback is used only when Supabase public env values are absent.

## Authentication and Security

- Custom mobile scheme: `recipevaultai`.
- Callback paths: `auth/callback` and `auth/recovery`.
- Supabase sessions currently persist through AsyncStorage.
- `expo-secure-store` is installed but not the active Supabase adapter.
- Owner RLS uses `auth.uid()`; child ownership uses composite foreign keys.
- Only public Supabase URL/anon configuration belongs in `EXPO_PUBLIC_*`.
- All real `.env*` files are ignored except placeholder `.env.example`.

## Testing and Quality

- Vitest 4 for feature unit tests.
- TypeScript compiler with `--noEmit`.
- Expo dependency compatibility check.
- Android emulator/manual smoke testing.
- Real two-user Supabase integration testing is required but not automated.

Commands:

```powershell
npm run typecheck
npm run test
npx expo install --check
```

## CI/CD and Deployment

- GitHub Actions runs `npm ci`, typecheck, tests, and Expo checks on PRs and pushes to `main`.
- EAS Build is the documented future mobile build/release system.
- Development, staging, and production Supabase/EAS separation is planned.
- No verified EAS production profile, release channel, signing workflow, or store deployment exists yet.

## Observability and Commercial Services

- Sentry React Native and PostHog React Native dependencies are installed; production configuration, privacy, redaction, and event verification are pending.
- RevenueCat is planned for future entitlements but is not currently a dependency.

## Developer Tools

- npm and lockfile-based installs.
- PowerShell commands in Windows workspace documentation.
- GitHub CLI for PR/check inspection.
- Android Emulator and Expo development client.
- Workspace-specific Codex agents and skills under `C:\Apps\_codex`.

## Code Conventions

- Use strict TypeScript and explicit domain types.
- `@/*` resolves to `src/*`.
- Keep routes in `app/`; reusable UI in `src/components/`; feature logic and tests in `src/features/`.
- Keep external clients in `src/lib/` and global providers in `src/providers/`.
- Prefer repository methods and React Query hooks over direct data access from screens.
- Use structured validation and safe generic errors at trust boundaries.
- Use migrations for schema/RLS changes; do not rely on undocumented dashboard edits.
- Keep tests adjacent to feature code as `*.test.ts`.
- Keep privileged secrets and privileged AI instructions out of the mobile bundle and user-controlled positions.

## Directory Conventions

| Directory | Convention |
| --- | --- |
| `app/` | Route files and navigation shells only |
| `src/components/` | Shared presentational/product components |
| `src/features/<feature>/` | Feature repository, state, hooks, validation, utilities, and tests |
| `src/lib/` | Vendor clients and infrastructure adapters |
| `src/providers/` | Root lifecycle/context providers |
| `src/theme/` | Stable visual tokens |
| `src/types/` | Cross-feature domain contracts |
| `supabase/migrations/` | Ordered immutable migration history |
| `docs/` | Durable product and engineering guidance |
