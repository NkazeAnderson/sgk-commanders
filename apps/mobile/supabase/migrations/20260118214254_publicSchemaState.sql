set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_main_member_to_group()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into group_members (group_id, member_id, role, invitation_accepted)
  values (
    new.id,
    auth.uid(),
    'main',
    true
  );
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
  user_data jsonb;
begin
  -- Assume NEW.raw_user_meta_data contains the required user fields as a JSON object
  user_data := NEW.raw_user_meta_data;

  insert into public.users (
    id,
    name,
    email,
    phone,
    home_address,
    accepted_terms,
    subcription
  )
  values (
    NEW.id,
    user_data->>'name',
    user_data->>'email',
    (user_data->>'phone')::integer,
    user_data->>'home_address',
    (user_data->>'accepted_terms')::boolean,
    (select id from public.subscriptions where is_defualt is true order by id limit 1)
  );

  return NEW;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.set_user_unsafe_on_sos_insert()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  update users
  set is_safe = false
  where id = new.sent_by;
  return new;
end;
$function$
;

CREATE TRIGGER add_main_member_trigger AFTER INSERT ON public.groups FOR EACH ROW EXECUTE FUNCTION public.add_main_member_to_group();

CREATE TRIGGER set_user_unsafe_trigger AFTER INSERT ON public.sos FOR EACH ROW EXECUTE FUNCTION public.set_user_unsafe_on_sos_insert();

CREATE TRIGGER after_auth_user_signup AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();


