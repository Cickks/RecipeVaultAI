# Supabase Setup

1. Create a Supabase project.
2. Copy project URL and anon key into local environment values from `.env.example`.
3. Run `supabase/migrations/0001_initial_schema.sql` in the Supabase SQL editor or via Supabase CLI.
4. Create private Storage buckets:
   - `recipe-images`
   - `avatars`
   - `imports`
5. Enable email auth and email verification.
6. Add these exact mobile redirect URLs under Authentication URL Configuration:
   - `recipevaultai://auth/callback`
   - `recipevaultai://auth/recovery`
7. Use an Expo development build or standalone build to test stable custom-scheme auth redirects. Expo Go uses a development server URL instead of the production custom scheme.
8. Review RLS policies before production.

## Security Notes
- Never use the service role key in the mobile app.
- Keep AI provider keys in Supabase Edge Functions or another backend.
- Use Storage policies to restrict files by authenticated user ownership.
