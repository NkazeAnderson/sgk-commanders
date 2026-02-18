import { tables } from "../constants.js";
import type { User } from "../entity.types.js";
import { usersSchema } from "../zodSchema.js";
import { supabase } from "./instance.js";

export async function createUser(user: User) {
  const { data, error } = await supabase
    .from(tables.users)
    .insert(user)
    .select()
    .single();
  if (error) throw error;
  return usersSchema.parse(data);
}

export async function getUsers() {
  const res = await supabase.from(tables.users).select("*");
  if (res.error) throw res.error;
  return usersSchema.array().parse(res.data ?? []);
}

export async function getUserByEmail(email: string) {
  const res = await supabase
    .from(tables.users)
    .select("*")
    .eq("email", email)
    .single();
  if (res.error) throw res.error;
  return usersSchema.parse(res.data);
}

export async function getUserByPhone(phone: number) {
  const res = await supabase
    .from(tables.users)
    .select("*")
    .eq("phone", phone)
    .single();
  if (res.error) throw res.error;
  return usersSchema.parse(res.data);
}

export async function getUserById(id: string) {
  const res = await supabase
    .from(tables.users)
    .select("*")
    .eq("id", id)
    .single();
  if (res.error) throw res.error;
  return usersSchema.parse(res.data);
}

export async function updateUser(user: Partial<User> & { id: string }) {
  const { id, ...rest } = user; // Exclude id from the update
  const { data, error } = await supabase
    .from(tables.users)
    .update(rest)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return usersSchema.parse(data);
}

export async function deleteUser(id: string) {
  const { error } = await supabase.from(tables.users).delete().eq("id", id);
  if (error) throw error;
  return true;
}
