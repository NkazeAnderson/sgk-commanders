import { tables } from "../constants.js";
import type { User } from "../zodSchema.js";
import { usersSchema } from "../zodSchema.js";
import { supabase } from "./instance.js";

const userTableRef = supabase.from(tables.users)

export async function createUser(user:User ){
  const { data, error } = await userTableRef.insert(user).select().single();
  if (error) throw error;
  return usersSchema.parse(data)
}

export async function getUsers() {
  const res =  await userTableRef.select("*");
  if (res.error) throw res.error;
  return usersSchema.array().parse(res.data ?? []);
}

export async function getUserByEmail(email:string) {
  const res =  await userTableRef.select("*").eq("email", email).single();
  if (res.error) throw res.error;
  return usersSchema.parse(res.data);
}

export async function getUserByPhone(phone:number) {
  const res =  await userTableRef.select("*").eq("phone", phone).single();
  if (res.error) throw res.error;
  return usersSchema.parse(res.data);
}

export async function getUserById(id:string) {
   const res = await userTableRef.select("*").eq("id", id).single()
   if (res.error) throw res.error;
   return usersSchema.parse(res.data);
}

export async function updateUser( user:Partial<User> & {id:string}) {
    const {id, ...rest} = user; // Exclude id from the update
    const { data, error } = await userTableRef.update(rest).eq("id", id).select().single();
    if (error) throw error;
    return usersSchema.parse(data);
}

export async function deleteUser(id:string) {
    const { error } = await userTableRef.delete().eq("id", id);
    if (error) throw error;
    return true;
}