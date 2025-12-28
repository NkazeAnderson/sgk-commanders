import { tables } from "@/constants";
import { sosResponseT, sosT, withoutIdT } from "@/types";
import { parseDatabaseResponse } from "@/utils";
import { sosResponseSchema, sosSchema, usersSchema } from "@/zodSchema";
import { z } from "zod";
import { supabase } from ".";

export const joinedSOSSchema = sosSchema.extend({sent_by: usersSchema})
export type joinedSOSSchemaT = z.infer<typeof joinedSOSSchema>
const sosTableRef = supabase.from(tables.sos)
const sosResponseTableRef = supabase.from(tables.sos_responses)

export async function createSOS(data:withoutIdT<sosT>) {
   const res = await supabase.functions.invoke("sos", {body:{action:"create", data}})
   console.log(res);
   
   // return parseDatabaseResponse(res, sosSchema)
}

export async function addMessageToSOS({id, message}:{id:string, message:string}) {
   const res = await sosTableRef.update({message}).eq("id", id)
   return res 
}

export async function getAllSOS() {
   const res = await sosTableRef.select("*, sent_by (*)")
   return parseDatabaseResponse(res, joinedSOSSchema)
}

export async function addSOSResponse(data:withoutIdT<sosResponseT>) {
   const res = await sosResponseTableRef.insert(data).select().single()
   return {...res, data:sosResponseSchema.parse(res.data)}
}

export async function resolveSOS(data:sosResponseT) {
   const {id, ...rest} =  data
  const sosResponseRes = await sosResponseTableRef.update(rest).eq("id", id)
  const sosRes =  await sosTableRef.update({resolved:true}).eq("id", rest.sos)
   return [sosRes, sosResponseRes]
}

export async function getMyLastResponse(userId:string){
 const res = await sosResponseTableRef.select("*").eq("response_by", userId).order('created_at', { ascending: false }).limit(1)
 const parsedData = res.data?  sosResponseSchema.array().parse(res.data): null
 return {data:parsedData ? parsedData[0] : undefined, error:res.error}
}