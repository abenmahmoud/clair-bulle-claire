-- ============================================================================
-- Migration 0001 — Schéma initial Clair / Bulle Claire (Sprint 3)
-- Tables : profiles, analyses
-- Row Level Security activée sur les deux
-- ============================================================================

-- ---- TABLE profiles ----
-- Étend auth.users avec le rôle utilisateur et un display_name optionnel
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text check (role in (
    'parent',
    'aesh',
    'enseignant',
    'cpe',
    'pro_sante',
    'adulte_neuroatypique',
    'autre'
  )),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger pour mettre à jour updated_at automatiquement
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Trigger pour créer automatiquement un profile vide à l'inscription auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---- TABLE analyses ----
create table public.analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  original_text text not null,
  direction text not null check (direction in (
    'neurotypique-neuroatypique',
    'neuroatypique-neurotypique',
    'adulte-enfant',
    'enfant-adulte'
  )),
  context text not null check (context in (
    'travail',
    'couple',
    'famille',
    'amitie',
    'ecole',
    'administration',
    'inconnu'
  )),
  result_json jsonb not null,
  favorite boolean not null default false,
  created_at timestamptz not null default now()
);

-- Index pour requêtes fréquentes
create index analyses_user_id_created_at_idx
  on public.analyses(user_id, created_at desc);

create index analyses_user_id_favorite_idx
  on public.analyses(user_id, favorite) where favorite = true;

-- ============================================================================
-- Row Level Security : chaque utilisateur ne voit QUE ses propres données
-- ============================================================================

alter table public.profiles enable row level security;
alter table public.analyses enable row level security;

-- PROFILES : un utilisateur peut lire et modifier son propre profile
create policy "users_select_own_profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "users_update_own_profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Pas de policy DELETE : la cascade auth.users → profiles s'en charge

-- ANALYSES : un utilisateur ne voit, n'insère, ne modifie, ne supprime que les siennes
create policy "users_select_own_analyses"
  on public.analyses for select
  using (auth.uid() = user_id);

create policy "users_insert_own_analyses"
  on public.analyses for insert
  with check (auth.uid() = user_id);

create policy "users_update_own_analyses"
  on public.analyses for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users_delete_own_analyses"
  on public.analyses for delete
  using (auth.uid() = user_id);
