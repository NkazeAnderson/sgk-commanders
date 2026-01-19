import { z } from "zod";
import { tables } from "../constants.js";
import type { sosResponseT, sosT, withoutIdT } from "../types.js";
import { sosResponseSchema, sosSchema, usersSchema } from "../zodSchema.js";
import { supabase } from "./instance.js";

export const joinedSOSSchema = sosSchema.extend({sent_by: usersSchema})
export const joinedSOSResponseSchema = sosResponseSchema.extend({sos:joinedSOSSchema, response_by: usersSchema})
export type joinedSOSSchemaT = z.infer<typeof joinedSOSSchema>
export type joinedSOSResponseT = z.infer<typeof joinedSOSResponseSchema>

export async function createSOS(data:withoutIdT<sosT>) {
   const res = await supabase.functions.invoke("sos", {body:{action:"create", data}}) 
   if (res.error) throw res.error
   return sosSchema.parse(res.data)
}

export async function addMessageToSOS({id, message}:{id:string, message:string}) {
   const res = await supabase.from(tables.sos).update({message}).eq("id", id)
   return res 
}

export async function getSOSs(userId?:string):Promise<joinedSOSSchemaT[]> {
   const res = userId ? await supabase.from(tables.sos).select("*, sent_by (*)").eq("sent_by", userId).order('created_at', { ascending: false })  : await supabase.from(tables.sos).select("*, sent_by (*)").order('created_at', { ascending: false }) 
   if (res.error) throw res.error
   return joinedSOSSchema.array().parse(res.data)
}


export async function addSOSResponse(data:withoutIdT<sosResponseT>) {
   const res = await supabase.from(tables.sos_responses).insert(data).select().single()
   return {...res, data:sosResponseSchema.parse(res.data)}
}

export async function resolveSOS(responseData:Pick<sosResponseT, "id" | "description" | "images">, sosId:string) {
   const {id, description, images, ...rest} =  responseData
  const sosResponseRes = await supabase.from(tables.sos_responses).update({description, images}).eq("id", id)
  const sosRes =  await supabase.from(tables.sos).update({resolved:true}).eq("id", sosId)
   return [sosRes, sosResponseRes]
}

export async function getMyLastResponse(userId:string){
 const res = await supabase.from(tables.sos_responses).select("*").eq("response_by", userId).order('created_at', { ascending: false }).limit(1)
 const parsedData = res.data?  sosResponseSchema.array().parse(res.data): null
 return {data:parsedData ? parsedData[0] : undefined, error:res.error}
}

export async function getSOSResponses(filters?:{agentId?:string, sosId?:string; sosIds?:string[]}):Promise<joinedSOSResponseT[]> {
 const res =!filters ? await supabase.from(tables.sos_responses).select("*, response_by(*), sos (*,  sent_by (*))").order('created_at', { ascending: false }) : filters.agentId ? 
 await supabase.from(tables.sos_responses).select("*, response_by(*), sos (*,  sent_by (*))").eq("response_by", filters.agentId).order('created_at', { ascending: false }).limit(1) 
 : filters.sosIds ? await supabase.from(tables.sos_responses).select("*, response_by(*), sos (*,  sent_by (*))").in("sos", filters.sosIds).order('created_at', { ascending: false })
   :await supabase.from(tables.sos_responses).select("*, response_by(*), sos (*,  sent_by (*))").eq("sos", filters?.sosId).order('created_at', { ascending: false }).limit(3)
 if (res.error) {
   throw res.error
 }
 return joinedSOSResponseSchema.array().parse(res.data)
}