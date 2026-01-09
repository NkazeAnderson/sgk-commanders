import { tables } from "../constants.js";
import type { messageT, userT, withoutIdT } from "../types.js";
import { messagesSchema } from "../zodSchema.js";
import { supabase } from "./instance.js";
import { parseDatabaseResponse } from "./utils.js";

const messageTableRef = supabase.from(tables.messages)



export async function createMessage(message:withoutIdT<messageT>) {
   return await messageTableRef.insert(message)
}

export async function getMessages(user:userT) {
  const res = await messageTableRef
    .select("*")
    .or(`sentBy.eq.${user.id},sentTo.eq.${user.id}`);
    return parseDatabaseResponse(res, messagesSchema);
}


