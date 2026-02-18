create extension if not exists "postgis" with schema "extensions";

create type "public"."organisation_roles" as enum ('manager', 'editor', 'client', 'agent');

drop trigger if exists "add_main_member_trigger" on "public"."groups";

drop trigger if exists "set_user_unsafe_trigger" on "public"."sos";

revoke delete on table "public"."agent_duty" from "anon";

revoke insert on table "public"."agent_duty" from "anon";

revoke references on table "public"."agent_duty" from "anon";

revoke select on table "public"."agent_duty" from "anon";

revoke trigger on table "public"."agent_duty" from "anon";

revoke truncate on table "public"."agent_duty" from "anon";

revoke update on table "public"."agent_duty" from "anon";

revoke delete on table "public"."agent_duty" from "authenticated";

revoke insert on table "public"."agent_duty" from "authenticated";

revoke references on table "public"."agent_duty" from "authenticated";

revoke select on table "public"."agent_duty" from "authenticated";

revoke trigger on table "public"."agent_duty" from "authenticated";

revoke truncate on table "public"."agent_duty" from "authenticated";

revoke update on table "public"."agent_duty" from "authenticated";

revoke delete on table "public"."agent_duty" from "service_role";

revoke insert on table "public"."agent_duty" from "service_role";

revoke references on table "public"."agent_duty" from "service_role";

revoke select on table "public"."agent_duty" from "service_role";

revoke trigger on table "public"."agent_duty" from "service_role";

revoke truncate on table "public"."agent_duty" from "service_role";

revoke update on table "public"."agent_duty" from "service_role";

revoke delete on table "public"."group_members" from "anon";

revoke insert on table "public"."group_members" from "anon";

revoke references on table "public"."group_members" from "anon";

revoke select on table "public"."group_members" from "anon";

revoke trigger on table "public"."group_members" from "anon";

revoke truncate on table "public"."group_members" from "anon";

revoke update on table "public"."group_members" from "anon";

revoke delete on table "public"."group_members" from "authenticated";

revoke insert on table "public"."group_members" from "authenticated";

revoke references on table "public"."group_members" from "authenticated";

revoke select on table "public"."group_members" from "authenticated";

revoke trigger on table "public"."group_members" from "authenticated";

revoke truncate on table "public"."group_members" from "authenticated";

revoke update on table "public"."group_members" from "authenticated";

revoke delete on table "public"."group_members" from "service_role";

revoke insert on table "public"."group_members" from "service_role";

revoke references on table "public"."group_members" from "service_role";

revoke select on table "public"."group_members" from "service_role";

revoke trigger on table "public"."group_members" from "service_role";

revoke truncate on table "public"."group_members" from "service_role";

revoke update on table "public"."group_members" from "service_role";

revoke delete on table "public"."groups" from "anon";

revoke insert on table "public"."groups" from "anon";

revoke references on table "public"."groups" from "anon";

revoke select on table "public"."groups" from "anon";

revoke trigger on table "public"."groups" from "anon";

revoke truncate on table "public"."groups" from "anon";

revoke update on table "public"."groups" from "anon";

revoke delete on table "public"."groups" from "authenticated";

revoke insert on table "public"."groups" from "authenticated";

revoke references on table "public"."groups" from "authenticated";

revoke select on table "public"."groups" from "authenticated";

revoke trigger on table "public"."groups" from "authenticated";

revoke truncate on table "public"."groups" from "authenticated";

revoke update on table "public"."groups" from "authenticated";

revoke delete on table "public"."groups" from "service_role";

revoke insert on table "public"."groups" from "service_role";

revoke references on table "public"."groups" from "service_role";

revoke select on table "public"."groups" from "service_role";

revoke trigger on table "public"."groups" from "service_role";

revoke truncate on table "public"."groups" from "service_role";

revoke update on table "public"."groups" from "service_role";

revoke delete on table "public"."messages" from "anon";

revoke insert on table "public"."messages" from "anon";

revoke references on table "public"."messages" from "anon";

revoke select on table "public"."messages" from "anon";

revoke trigger on table "public"."messages" from "anon";

revoke truncate on table "public"."messages" from "anon";

revoke update on table "public"."messages" from "anon";

revoke delete on table "public"."messages" from "authenticated";

revoke insert on table "public"."messages" from "authenticated";

revoke references on table "public"."messages" from "authenticated";

revoke select on table "public"."messages" from "authenticated";

revoke trigger on table "public"."messages" from "authenticated";

revoke truncate on table "public"."messages" from "authenticated";

revoke update on table "public"."messages" from "authenticated";

revoke delete on table "public"."messages" from "service_role";

revoke insert on table "public"."messages" from "service_role";

revoke references on table "public"."messages" from "service_role";

revoke select on table "public"."messages" from "service_role";

revoke trigger on table "public"."messages" from "service_role";

revoke truncate on table "public"."messages" from "service_role";

revoke update on table "public"."messages" from "service_role";

revoke delete on table "public"."notifications" from "anon";

revoke insert on table "public"."notifications" from "anon";

revoke references on table "public"."notifications" from "anon";

revoke select on table "public"."notifications" from "anon";

revoke trigger on table "public"."notifications" from "anon";

revoke truncate on table "public"."notifications" from "anon";

revoke update on table "public"."notifications" from "anon";

revoke delete on table "public"."notifications" from "authenticated";

revoke insert on table "public"."notifications" from "authenticated";

revoke references on table "public"."notifications" from "authenticated";

revoke select on table "public"."notifications" from "authenticated";

revoke trigger on table "public"."notifications" from "authenticated";

revoke truncate on table "public"."notifications" from "authenticated";

revoke update on table "public"."notifications" from "authenticated";

revoke delete on table "public"."notifications" from "service_role";

revoke insert on table "public"."notifications" from "service_role";

revoke references on table "public"."notifications" from "service_role";

revoke select on table "public"."notifications" from "service_role";

revoke trigger on table "public"."notifications" from "service_role";

revoke truncate on table "public"."notifications" from "service_role";

revoke update on table "public"."notifications" from "service_role";

revoke delete on table "public"."payments" from "anon";

revoke insert on table "public"."payments" from "anon";

revoke references on table "public"."payments" from "anon";

revoke select on table "public"."payments" from "anon";

revoke trigger on table "public"."payments" from "anon";

revoke truncate on table "public"."payments" from "anon";

revoke update on table "public"."payments" from "anon";

revoke delete on table "public"."payments" from "authenticated";

revoke insert on table "public"."payments" from "authenticated";

revoke references on table "public"."payments" from "authenticated";

revoke select on table "public"."payments" from "authenticated";

revoke trigger on table "public"."payments" from "authenticated";

revoke truncate on table "public"."payments" from "authenticated";

revoke update on table "public"."payments" from "authenticated";

revoke delete on table "public"."payments" from "service_role";

revoke insert on table "public"."payments" from "service_role";

revoke references on table "public"."payments" from "service_role";

revoke select on table "public"."payments" from "service_role";

revoke trigger on table "public"."payments" from "service_role";

revoke truncate on table "public"."payments" from "service_role";

revoke update on table "public"."payments" from "service_role";

revoke delete on table "public"."settings" from "anon";

revoke insert on table "public"."settings" from "anon";

revoke references on table "public"."settings" from "anon";

revoke select on table "public"."settings" from "anon";

revoke trigger on table "public"."settings" from "anon";

revoke truncate on table "public"."settings" from "anon";

revoke update on table "public"."settings" from "anon";

revoke delete on table "public"."settings" from "authenticated";

revoke insert on table "public"."settings" from "authenticated";

revoke references on table "public"."settings" from "authenticated";

revoke select on table "public"."settings" from "authenticated";

revoke trigger on table "public"."settings" from "authenticated";

revoke truncate on table "public"."settings" from "authenticated";

revoke update on table "public"."settings" from "authenticated";

revoke delete on table "public"."settings" from "service_role";

revoke insert on table "public"."settings" from "service_role";

revoke references on table "public"."settings" from "service_role";

revoke select on table "public"."settings" from "service_role";

revoke trigger on table "public"."settings" from "service_role";

revoke truncate on table "public"."settings" from "service_role";

revoke update on table "public"."settings" from "service_role";

revoke delete on table "public"."sos" from "anon";

revoke insert on table "public"."sos" from "anon";

revoke references on table "public"."sos" from "anon";

revoke select on table "public"."sos" from "anon";

revoke trigger on table "public"."sos" from "anon";

revoke truncate on table "public"."sos" from "anon";

revoke update on table "public"."sos" from "anon";

revoke delete on table "public"."sos" from "authenticated";

revoke insert on table "public"."sos" from "authenticated";

revoke references on table "public"."sos" from "authenticated";

revoke select on table "public"."sos" from "authenticated";

revoke trigger on table "public"."sos" from "authenticated";

revoke truncate on table "public"."sos" from "authenticated";

revoke update on table "public"."sos" from "authenticated";

revoke delete on table "public"."sos" from "service_role";

revoke insert on table "public"."sos" from "service_role";

revoke references on table "public"."sos" from "service_role";

revoke select on table "public"."sos" from "service_role";

revoke trigger on table "public"."sos" from "service_role";

revoke truncate on table "public"."sos" from "service_role";

revoke update on table "public"."sos" from "service_role";

revoke delete on table "public"."sos_responses" from "anon";

revoke insert on table "public"."sos_responses" from "anon";

revoke references on table "public"."sos_responses" from "anon";

revoke select on table "public"."sos_responses" from "anon";

revoke trigger on table "public"."sos_responses" from "anon";

revoke truncate on table "public"."sos_responses" from "anon";

revoke update on table "public"."sos_responses" from "anon";

revoke delete on table "public"."sos_responses" from "authenticated";

revoke insert on table "public"."sos_responses" from "authenticated";

revoke references on table "public"."sos_responses" from "authenticated";

revoke select on table "public"."sos_responses" from "authenticated";

revoke trigger on table "public"."sos_responses" from "authenticated";

revoke truncate on table "public"."sos_responses" from "authenticated";

revoke update on table "public"."sos_responses" from "authenticated";

revoke delete on table "public"."sos_responses" from "service_role";

revoke insert on table "public"."sos_responses" from "service_role";

revoke references on table "public"."sos_responses" from "service_role";

revoke select on table "public"."sos_responses" from "service_role";

revoke trigger on table "public"."sos_responses" from "service_role";

revoke truncate on table "public"."sos_responses" from "service_role";

revoke update on table "public"."sos_responses" from "service_role";

revoke delete on table "public"."subscriptions" from "anon";

revoke insert on table "public"."subscriptions" from "anon";

revoke references on table "public"."subscriptions" from "anon";

revoke select on table "public"."subscriptions" from "anon";

revoke trigger on table "public"."subscriptions" from "anon";

revoke truncate on table "public"."subscriptions" from "anon";

revoke update on table "public"."subscriptions" from "anon";

revoke delete on table "public"."subscriptions" from "authenticated";

revoke insert on table "public"."subscriptions" from "authenticated";

revoke references on table "public"."subscriptions" from "authenticated";

revoke select on table "public"."subscriptions" from "authenticated";

revoke trigger on table "public"."subscriptions" from "authenticated";

revoke truncate on table "public"."subscriptions" from "authenticated";

revoke update on table "public"."subscriptions" from "authenticated";

revoke delete on table "public"."subscriptions" from "service_role";

revoke insert on table "public"."subscriptions" from "service_role";

revoke references on table "public"."subscriptions" from "service_role";

revoke select on table "public"."subscriptions" from "service_role";

revoke trigger on table "public"."subscriptions" from "service_role";

revoke truncate on table "public"."subscriptions" from "service_role";

revoke update on table "public"."subscriptions" from "service_role";

alter table "public"."agent_duty" drop constraint "agent_duty_agent_id_users_id_fk";

alter table "public"."group_members" drop constraint "group_members_group_id_groups_id_fk";

alter table "public"."group_members" drop constraint "group_members_member_id_users_id_fk";

alter table "public"."groups" drop constraint "groups_admin_id_users_id_fk";

alter table "public"."groups" drop constraint "groups_subcription_subscriptions_id_fk";

alter table "public"."messages" drop constraint "messages_sentBy_users_id_fk";

alter table "public"."messages" drop constraint "messages_sentTo_users_id_fk";

alter table "public"."notifications" drop constraint "notifications_userId_users_id_fk";

alter table "public"."payments" drop constraint "payments_by_users_id_fk";

alter table "public"."payments" drop constraint "payments_group_groups_id_fk";

alter table "public"."payments" drop constraint "payments_subscription_subscriptions_id_fk";

alter table "public"."sos" drop constraint "sos_sent_by_users_id_fk";

alter table "public"."sos_responses" drop constraint "sos_responses_response_by_users_id_fk";

alter table "public"."sos_responses" drop constraint "sos_responses_sos_sos_id_fk";

alter table "public"."users" drop constraint "users_email_unique";

alter table "public"."users" drop constraint "users_phone_unique";

alter table "public"."users" drop constraint "users_subcription_subscriptions_id_fk";

alter table "public"."agent_duty" drop constraint "agent_duty_pkey";

alter table "public"."group_members" drop constraint "group_members_pkey";

alter table "public"."groups" drop constraint "groups_pkey";

alter table "public"."messages" drop constraint "messages_pkey";

alter table "public"."notifications" drop constraint "notifications_pkey";

alter table "public"."payments" drop constraint "payments_pkey";

alter table "public"."settings" drop constraint "settings_pkey";

alter table "public"."sos" drop constraint "sos_pkey";

alter table "public"."sos_responses" drop constraint "sos_responses_pkey";

alter table "public"."subscriptions" drop constraint "subscriptions_pkey";

drop index if exists "public"."agent_duty_pkey";

drop index if exists "public"."group_members_pkey";

drop index if exists "public"."groups_pkey";

drop index if exists "public"."messages_pkey";

drop index if exists "public"."notifications_pkey";

drop index if exists "public"."payments_pkey";

drop index if exists "public"."settings_pkey";

drop index if exists "public"."sos_pkey";

drop index if exists "public"."sos_responses_pkey";

drop index if exists "public"."subscriptions_pkey";

drop index if exists "public"."users_email_unique";

drop index if exists "public"."users_phone_unique";

drop table "public"."agent_duty";

drop table "public"."group_members";

drop table "public"."groups";

drop table "public"."messages";

drop table "public"."notifications";

drop table "public"."payments";

drop table "public"."settings";

drop table "public"."sos";

drop table "public"."sos_responses";

drop table "public"."subscriptions";


  create table "public"."agent_assignments" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "agent" uuid not null,
    "dedicated_location" uuid not null,
    "shifts" jsonb not null,
    "active" boolean not null default true
      );


alter table "public"."agent_assignments" enable row level security;


  create table "public"."dedicated_locations" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "client" uuid not null default gen_random_uuid(),
    "location" extensions.geography not null,
    "check_frequency" integer not null default 2
      );


alter table "public"."dedicated_locations" enable row level security;


  create table "public"."organisation_branch_members" (
    "created_at" timestamp with time zone not null default now(),
    "user" uuid not null,
    "branch" uuid not null,
    "metadata" jsonb,
    "role" public.organisation_roles not null,
    "id" uuid not null default gen_random_uuid()
      );


alter table "public"."organisation_branch_members" enable row level security;


  create table "public"."organisation_branches" (
    "created_at" timestamp with time zone not null default now(),
    "name" character varying not null,
    "organisation" uuid not null,
    "id" uuid not null default gen_random_uuid()
      );


alter table "public"."organisation_branches" enable row level security;


  create table "public"."organisations" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying not null,
    "created_at" timestamp with time zone not null default now(),
    "admin" uuid not null
      );


alter table "public"."organisations" enable row level security;

alter table "public"."users" drop column "deviceIds";

alter table "public"."users" drop column "is_agent";

alter table "public"."users" drop column "is_safe";

alter table "public"."users" drop column "last_known_location";

alter table "public"."users" drop column "subcription";

alter table "public"."users" drop column "subcriptionExpiration";

alter table "public"."users" add column "device_fcm_ids" character varying[];

alter table "public"."users" alter column "created_at" set data type timestamp with time zone using "created_at"::timestamp with time zone;

alter table "public"."users" alter column "email" set data type character varying using "email"::character varying;

alter table "public"."users" alter column "emergency_phone" set data type bigint using "emergency_phone"::bigint;

alter table "public"."users" alter column "home_address" drop not null;

alter table "public"."users" alter column "home_address" set data type text using "home_address"::text;

alter table "public"."users" alter column "name" set data type character varying using "name"::character varying;

alter table "public"."users" alter column "phone" set data type bigint using "phone"::bigint;

alter table "public"."users" alter column "profile_picture" set data type text using "profile_picture"::text;

alter table "public"."users" enable row level security;

drop type "public"."payment_status";

drop type "public"."subcription_groups";

CREATE UNIQUE INDEX agent_assignments_pkey ON public.agent_assignments USING btree (id);

CREATE UNIQUE INDEX dedicated_locations_pkey ON public.dedicated_locations USING btree (id);

CREATE UNIQUE INDEX organisation_branch_members_pkey ON public.organisation_branch_members USING btree (id);

CREATE UNIQUE INDEX organisation_branches_pkey ON public.organisation_branches USING btree (id);

CREATE UNIQUE INDEX organisations_pkey ON public.organisations USING btree (id);

alter table "public"."agent_assignments" add constraint "agent_assignments_pkey" PRIMARY KEY using index "agent_assignments_pkey";

alter table "public"."dedicated_locations" add constraint "dedicated_locations_pkey" PRIMARY KEY using index "dedicated_locations_pkey";

alter table "public"."organisation_branch_members" add constraint "organisation_branch_members_pkey" PRIMARY KEY using index "organisation_branch_members_pkey";

alter table "public"."organisation_branches" add constraint "organisation_branches_pkey" PRIMARY KEY using index "organisation_branches_pkey";

alter table "public"."organisations" add constraint "organisations_pkey" PRIMARY KEY using index "organisations_pkey";

alter table "public"."agent_assignments" add constraint "agent_assignments_agent_fkey" FOREIGN KEY (agent) REFERENCES public.organisation_branch_members(id) not valid;

alter table "public"."agent_assignments" validate constraint "agent_assignments_agent_fkey";

alter table "public"."agent_assignments" add constraint "agent_assignments_dedicated_location_fkey" FOREIGN KEY (dedicated_location) REFERENCES public.dedicated_locations(id) not valid;

alter table "public"."agent_assignments" validate constraint "agent_assignments_dedicated_location_fkey";

alter table "public"."dedicated_locations" add constraint "dedicated_locations_client_fkey" FOREIGN KEY (client) REFERENCES public.organisation_branch_members(id) not valid;

alter table "public"."dedicated_locations" validate constraint "dedicated_locations_client_fkey";

alter table "public"."organisation_branch_members" add constraint "organisation_branch_members_branch_fkey" FOREIGN KEY (branch) REFERENCES public.organisation_branches(id) not valid;

alter table "public"."organisation_branch_members" validate constraint "organisation_branch_members_branch_fkey";

alter table "public"."organisation_branch_members" add constraint "organisation_branch_members_user_fkey" FOREIGN KEY ("user") REFERENCES public.users(id) not valid;

alter table "public"."organisation_branch_members" validate constraint "organisation_branch_members_user_fkey";

alter table "public"."organisation_branches" add constraint "organisation_branches_organisation_fkey" FOREIGN KEY (organisation) REFERENCES public.organisations(id) not valid;

alter table "public"."organisation_branches" validate constraint "organisation_branches_organisation_fkey";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."users" validate constraint "users_id_fkey";

grant delete on table "public"."agent_assignments" to "anon";

grant insert on table "public"."agent_assignments" to "anon";

grant references on table "public"."agent_assignments" to "anon";

grant select on table "public"."agent_assignments" to "anon";

grant trigger on table "public"."agent_assignments" to "anon";

grant truncate on table "public"."agent_assignments" to "anon";

grant update on table "public"."agent_assignments" to "anon";

grant delete on table "public"."agent_assignments" to "authenticated";

grant insert on table "public"."agent_assignments" to "authenticated";

grant references on table "public"."agent_assignments" to "authenticated";

grant select on table "public"."agent_assignments" to "authenticated";

grant trigger on table "public"."agent_assignments" to "authenticated";

grant truncate on table "public"."agent_assignments" to "authenticated";

grant update on table "public"."agent_assignments" to "authenticated";

grant delete on table "public"."agent_assignments" to "postgres";

grant insert on table "public"."agent_assignments" to "postgres";

grant references on table "public"."agent_assignments" to "postgres";

grant select on table "public"."agent_assignments" to "postgres";

grant trigger on table "public"."agent_assignments" to "postgres";

grant truncate on table "public"."agent_assignments" to "postgres";

grant update on table "public"."agent_assignments" to "postgres";

grant delete on table "public"."agent_assignments" to "service_role";

grant insert on table "public"."agent_assignments" to "service_role";

grant references on table "public"."agent_assignments" to "service_role";

grant select on table "public"."agent_assignments" to "service_role";

grant trigger on table "public"."agent_assignments" to "service_role";

grant truncate on table "public"."agent_assignments" to "service_role";

grant update on table "public"."agent_assignments" to "service_role";

grant delete on table "public"."dedicated_locations" to "anon";

grant insert on table "public"."dedicated_locations" to "anon";

grant references on table "public"."dedicated_locations" to "anon";

grant select on table "public"."dedicated_locations" to "anon";

grant trigger on table "public"."dedicated_locations" to "anon";

grant truncate on table "public"."dedicated_locations" to "anon";

grant update on table "public"."dedicated_locations" to "anon";

grant delete on table "public"."dedicated_locations" to "authenticated";

grant insert on table "public"."dedicated_locations" to "authenticated";

grant references on table "public"."dedicated_locations" to "authenticated";

grant select on table "public"."dedicated_locations" to "authenticated";

grant trigger on table "public"."dedicated_locations" to "authenticated";

grant truncate on table "public"."dedicated_locations" to "authenticated";

grant update on table "public"."dedicated_locations" to "authenticated";

grant delete on table "public"."dedicated_locations" to "postgres";

grant insert on table "public"."dedicated_locations" to "postgres";

grant references on table "public"."dedicated_locations" to "postgres";

grant select on table "public"."dedicated_locations" to "postgres";

grant trigger on table "public"."dedicated_locations" to "postgres";

grant truncate on table "public"."dedicated_locations" to "postgres";

grant update on table "public"."dedicated_locations" to "postgres";

grant delete on table "public"."dedicated_locations" to "service_role";

grant insert on table "public"."dedicated_locations" to "service_role";

grant references on table "public"."dedicated_locations" to "service_role";

grant select on table "public"."dedicated_locations" to "service_role";

grant trigger on table "public"."dedicated_locations" to "service_role";

grant truncate on table "public"."dedicated_locations" to "service_role";

grant update on table "public"."dedicated_locations" to "service_role";

grant delete on table "public"."organisation_branch_members" to "anon";

grant insert on table "public"."organisation_branch_members" to "anon";

grant references on table "public"."organisation_branch_members" to "anon";

grant select on table "public"."organisation_branch_members" to "anon";

grant trigger on table "public"."organisation_branch_members" to "anon";

grant truncate on table "public"."organisation_branch_members" to "anon";

grant update on table "public"."organisation_branch_members" to "anon";

grant delete on table "public"."organisation_branch_members" to "authenticated";

grant insert on table "public"."organisation_branch_members" to "authenticated";

grant references on table "public"."organisation_branch_members" to "authenticated";

grant select on table "public"."organisation_branch_members" to "authenticated";

grant trigger on table "public"."organisation_branch_members" to "authenticated";

grant truncate on table "public"."organisation_branch_members" to "authenticated";

grant update on table "public"."organisation_branch_members" to "authenticated";

grant delete on table "public"."organisation_branch_members" to "postgres";

grant insert on table "public"."organisation_branch_members" to "postgres";

grant references on table "public"."organisation_branch_members" to "postgres";

grant select on table "public"."organisation_branch_members" to "postgres";

grant trigger on table "public"."organisation_branch_members" to "postgres";

grant truncate on table "public"."organisation_branch_members" to "postgres";

grant update on table "public"."organisation_branch_members" to "postgres";

grant delete on table "public"."organisation_branch_members" to "service_role";

grant insert on table "public"."organisation_branch_members" to "service_role";

grant references on table "public"."organisation_branch_members" to "service_role";

grant select on table "public"."organisation_branch_members" to "service_role";

grant trigger on table "public"."organisation_branch_members" to "service_role";

grant truncate on table "public"."organisation_branch_members" to "service_role";

grant update on table "public"."organisation_branch_members" to "service_role";

grant delete on table "public"."organisation_branches" to "anon";

grant insert on table "public"."organisation_branches" to "anon";

grant references on table "public"."organisation_branches" to "anon";

grant select on table "public"."organisation_branches" to "anon";

grant trigger on table "public"."organisation_branches" to "anon";

grant truncate on table "public"."organisation_branches" to "anon";

grant update on table "public"."organisation_branches" to "anon";

grant delete on table "public"."organisation_branches" to "authenticated";

grant insert on table "public"."organisation_branches" to "authenticated";

grant references on table "public"."organisation_branches" to "authenticated";

grant select on table "public"."organisation_branches" to "authenticated";

grant trigger on table "public"."organisation_branches" to "authenticated";

grant truncate on table "public"."organisation_branches" to "authenticated";

grant update on table "public"."organisation_branches" to "authenticated";

grant delete on table "public"."organisation_branches" to "postgres";

grant insert on table "public"."organisation_branches" to "postgres";

grant references on table "public"."organisation_branches" to "postgres";

grant select on table "public"."organisation_branches" to "postgres";

grant trigger on table "public"."organisation_branches" to "postgres";

grant truncate on table "public"."organisation_branches" to "postgres";

grant update on table "public"."organisation_branches" to "postgres";

grant delete on table "public"."organisation_branches" to "service_role";

grant insert on table "public"."organisation_branches" to "service_role";

grant references on table "public"."organisation_branches" to "service_role";

grant select on table "public"."organisation_branches" to "service_role";

grant trigger on table "public"."organisation_branches" to "service_role";

grant truncate on table "public"."organisation_branches" to "service_role";

grant update on table "public"."organisation_branches" to "service_role";

grant delete on table "public"."organisations" to "anon";

grant insert on table "public"."organisations" to "anon";

grant references on table "public"."organisations" to "anon";

grant select on table "public"."organisations" to "anon";

grant trigger on table "public"."organisations" to "anon";

grant truncate on table "public"."organisations" to "anon";

grant update on table "public"."organisations" to "anon";

grant delete on table "public"."organisations" to "authenticated";

grant insert on table "public"."organisations" to "authenticated";

grant references on table "public"."organisations" to "authenticated";

grant select on table "public"."organisations" to "authenticated";

grant trigger on table "public"."organisations" to "authenticated";

grant truncate on table "public"."organisations" to "authenticated";

grant update on table "public"."organisations" to "authenticated";

grant delete on table "public"."organisations" to "postgres";

grant insert on table "public"."organisations" to "postgres";

grant references on table "public"."organisations" to "postgres";

grant select on table "public"."organisations" to "postgres";

grant trigger on table "public"."organisations" to "postgres";

grant truncate on table "public"."organisations" to "postgres";

grant update on table "public"."organisations" to "postgres";

grant delete on table "public"."organisations" to "service_role";

grant insert on table "public"."organisations" to "service_role";

grant references on table "public"."organisations" to "service_role";

grant select on table "public"."organisations" to "service_role";

grant trigger on table "public"."organisations" to "service_role";

grant truncate on table "public"."organisations" to "service_role";

grant update on table "public"."organisations" to "service_role";

grant delete on table "public"."users" to "postgres";

grant insert on table "public"."users" to "postgres";

grant references on table "public"."users" to "postgres";

grant select on table "public"."users" to "postgres";

grant trigger on table "public"."users" to "postgres";

grant truncate on table "public"."users" to "postgres";

grant update on table "public"."users" to "postgres";


