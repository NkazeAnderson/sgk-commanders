import { tables } from "../constants.js";
import type { messageT, userT, withoutIdT } from "../types.js";
import { messagesSchema } from "../zodSchema.js";
import { supabase } from "./instance.js";

export async function createMessage(message:withoutIdT<messageT>) {
   return await  supabase.from(tables.messages).insert(message)
}

export async function getMessages(user:userT) {
  const res = await  supabase.from(tables.messages)
    .select("*")
    .or(`sentBy.eq.${user.id},sentTo.eq.${user.id}`);
    if (res.error) {
      throw res.error;
    }
    return messagesSchema.array().parse(res.data)
}


