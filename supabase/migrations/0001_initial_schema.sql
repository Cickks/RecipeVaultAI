create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  pro_status text not null default 'free' check (pro_status in ('free', 'pro', 'premium')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  prep_minutes integer,
  cook_minutes integer,
  servings integer,
  difficulty text check (difficulty in ('easy', 'medium', 'hard')),
  cuisine text,
  calories integer,
  protein_grams numeric(8,2),
  carbs_grams numeric(8,2),
  fat_grams numeric(8,2),
  notes text,
  is_favorite boolean not null default false,
  source_name text,
  source_author text,
  source_url text,
  video_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id)
);

create table if not exists public.recipe_ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  position integer not null,
  amount text,
  unit text,
  name text not null,
  notes text,
  foreign key (recipe_id, user_id) references public.recipes(id, user_id) on delete cascade
);

create table if not exists public.recipe_instructions (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  position integer not null,
  body text not null,
  timer_minutes integer,
  foreign key (recipe_id, user_id) references public.recipes(id, user_id) on delete cascade
);

create table if not exists public.recipe_images (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  foreign key (recipe_id, user_id) references public.recipes(id, user_id) on delete cascade
);

create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  color text,
  created_at timestamptz not null default now(),
  unique (id, user_id),
  unique(user_id, name)
);

create table if not exists public.collection_recipes (
  collection_id uuid not null references public.collections(id) on delete cascade,
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(collection_id, recipe_id),
  foreign key (collection_id, user_id) references public.collections(id, user_id) on delete cascade,
  foreign key (recipe_id, user_id) references public.recipes(id, user_id) on delete cascade
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  unique (id, user_id),
  unique(user_id, name)
);

create table if not exists public.recipe_tags (
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  primary key(recipe_id, tag_id),
  foreign key (recipe_id, user_id) references public.recipes(id, user_id) on delete cascade,
  foreign key (tag_id, user_id) references public.tags(id, user_id) on delete cascade
);

create table if not exists public.meal_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  created_at timestamptz not null default now(),
  unique (id, user_id),
  unique(user_id, week_start)
);

create table if not exists public.meal_plan_recipes (
  id uuid primary key default gen_random_uuid(),
  meal_plan_id uuid not null references public.meal_plans(id) on delete cascade,
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  planned_for date not null,
  meal_type text not null check (meal_type in ('breakfast','lunch','dinner','snack')),
  foreign key (meal_plan_id, user_id) references public.meal_plans(id, user_id) on delete cascade,
  foreign key (recipe_id, user_id) references public.recipes(id, user_id) on delete cascade
);

create table if not exists public.shopping_lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (id, user_id)
);

create table if not exists public.shopping_items (
  id uuid primary key default gen_random_uuid(),
  list_id uuid not null references public.shopping_lists(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  amount text,
  category text,
  checked boolean not null default false,
  position integer not null default 0,
  foreign key (list_id, user_id) references public.shopping_lists(id, user_id) on delete cascade
);

create table if not exists public.user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  theme text not null default 'system' check (theme in ('system','light','dark')),
  measurement_system text not null default 'us' check (measurement_system in ('us','metric')),
  notifications_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists recipes_user_updated_idx on public.recipes(user_id, updated_at desc);
create index if not exists recipes_user_favorite_idx on public.recipes(user_id, is_favorite);
create index if not exists recipe_ingredients_recipe_idx on public.recipe_ingredients(recipe_id, position);
create index if not exists recipe_instructions_recipe_idx on public.recipe_instructions(recipe_id, position);
create index if not exists shopping_items_list_idx on public.shopping_items(list_id, position);

alter table public.profiles enable row level security;
alter table public.recipes enable row level security;
alter table public.recipe_ingredients enable row level security;
alter table public.recipe_instructions enable row level security;
alter table public.recipe_images enable row level security;
alter table public.collections enable row level security;
alter table public.collection_recipes enable row level security;
alter table public.tags enable row level security;
alter table public.recipe_tags enable row level security;
alter table public.meal_plans enable row level security;
alter table public.meal_plan_recipes enable row level security;
alter table public.shopping_lists enable row level security;
alter table public.shopping_items enable row level security;
alter table public.user_settings enable row level security;
alter table public.notifications enable row level security;

create policy "profiles own rows" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "recipes own rows" on public.recipes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "ingredients own rows" on public.recipe_ingredients for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "instructions own rows" on public.recipe_instructions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "images own rows" on public.recipe_images for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "collections own rows" on public.collections for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "collection recipes own rows" on public.collection_recipes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "tags own rows" on public.tags for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "recipe tags own rows" on public.recipe_tags for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "meal plans own rows" on public.meal_plans for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "meal plan recipes own rows" on public.meal_plan_recipes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "shopping lists own rows" on public.shopping_lists for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "shopping items own rows" on public.shopping_items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "settings own row" on public.user_settings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "notifications own rows" on public.notifications for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
