# Database Design

See `supabase/migrations/0001_initial_schema.sql` for the initial schema.

## Key Principles
- Every user-owned table has `user_id`.
- RLS is enabled on user-owned tables.
- Recipe composition uses separate ingredients, instructions, images, tags, and collections.
- Future AI and monetization metadata are modeled without blocking the MVP.
- Search uses indexed text fields first and can evolve to Postgres full-text search.

## Growth Notes
- Add full-text indexes for recipe title, description, notes, ingredients, and tags.
- Move AI processing to Supabase Edge Functions or a dedicated backend if workload grows.
- Store images in Supabase Storage with private buckets and signed URLs.
- Add analytics exports to a warehouse when product analytics outgrow PostHog reports.
