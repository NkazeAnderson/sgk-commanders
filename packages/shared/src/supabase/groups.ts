import { z } from "zod"
import { tables } from "../constants.js"
import type { groupMemberT, groupT, withoutIdT } from "../types.js"
import { groupMembersSchema, groupsSchema, usersSchema } from "../zodSchema.js"
import { supabase } from "./instance.js"
import { parseDatabaseResponse } from "./utils.js"

export const groupMembersJoinedSchema = groupMembersSchema.extend({group_id:groupsSchema, member_id:usersSchema.nullable().optional()})
export type groupMembersJoinedSchemaT = z.infer<typeof groupMembersJoinedSchema>

export const getMyGroups = async (id:string)=>{
const groupsRes = await supabase.from(tables.group_members).select("group_id").eq("member_id", id)
const myGroups:Record<string, groupMembersJoinedSchemaT[]> ={}
const errors = [groupsRes.error]
if (groupsRes.data) {
    const groups = groupMembersSchema.pick({group_id:true}).array().parse(groupsRes.data)
    
    for(let group of groups) {
        const membersRes = await supabase.from(tables.group_members).select("*, group_id (*), member_id (*)").eq("group_id", group.group_id)
        const members = groupMembersJoinedSchema.array().parse(membersRes.data)
        myGroups[group.group_id] = members
        membersRes.error && errors.push(membersRes.error)
    }
}

return {data:myGroups, errors}
}

export const getGroups = async (userId?:string)=>{
const res = userId ?
 await supabase.from(tables.group_members).select("*, group_id (*)").eq("member_id", userId):
 await supabase.from(tables.groups).select("*")
    if( res.error )throw res.error
    return userId? groupMembersJoinedSchema.omit({"member_id":true}).array().parse(res.data).map(item=>item.group_id) : groupsSchema.array().parse(res.data)
}


export async function getGroupMembers(groupId?:string) {
    const res = !groupId ?
     await supabase.from(tables.group_members).select("*, member_id (*), group_id (*)")
    : await supabase.from(tables.group_members).select("*, member_id (*), group_id (*)").eq("group_id", groupId)
    console.log(res);
    if (res.error) {
        throw res.error
    }
    return groupMembersJoinedSchema.array().parse(res.data)
}

export async function getGroupMember(membershipId:string) {
    const membersRes = await supabase.from(tables.group_members).select("*").eq("id", membershipId).limit(1).single()
    console.log(membersRes);

    return parseDatabaseResponse(membersRes, groupMembersJoinedSchema)
}

export async function createGroup(group:withoutIdT<groupT>) {
    return await supabase.from(tables.groups).insert(group)
}

export async function editGroup(group:Partial<groupT> & {id:string}) {
    return await supabase.from(tables.groups).update({name: group.name}).eq("id", group.id)
}

export async function deleteGroup(id:string) {
    return await supabase.from(tables.groups).delete().eq("id", id)
}

export async function createGroupMember(groupMember:withoutIdT<groupMemberT> & {
    phone:number
}) {
    const {phone, ...rest} = groupMember
    const res = await supabase.from(tables.group_members).insert(rest).select().single()
   if ( res.data?.id ){
    const smsres =  await supabase.functions.invoke("sendsms", {
            body: {
              phone: String(phone),
              message: `You have been invited to join a family on SGK Commanders. Click the link below to accept the invitation: sgkcommanders://./?phone=${phone}&membership_id=${res.data.id}`,
            },
          });
          console.log(smsres);
        }
        
    return res
}

export async function deleteGroupMember(groupMember:groupMemberT) {
    const res = await supabase.from(tables.group_members).delete().eq("id", groupMember.id)
    return res
}

export async function updateGroupInviteStatus(userId:string, membership_id:string, acceptance:boolean) {
    const member:Partial<groupMemberT> = {member_id: userId, invitation_accepted:acceptance}
    const res = await supabase.from(tables.group_members).update(member).eq("id", membership_id.trim()).select().single()   
    return res
}