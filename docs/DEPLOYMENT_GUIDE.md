# Deployment Guide

## Mobile Builds
Use EAS Build for iOS and Android.

```powershell
npm install -g eas-cli
eas login
eas build:configure
eas build --platform ios
eas build --platform android
```

## Release Environments
- Development: local Expo with Supabase dev project.
- Staging: EAS preview channel with Supabase staging project.
- Production: App Store and Google Play builds with production Supabase project.

## Required Services
- Supabase Auth/Postgres/Storage.
- PostHog project.
- Sentry project.
- RevenueCat project before enabling paid plans.

## Go-Live Checks
- Typecheck passes.
- Auth flow tested on device.
- RLS manually verified.
- No secrets in source control.
- App Store privacy labels drafted.
- Crash reporting verified.
- Analytics events verified.
