import { tables } from "@/constants"
import { groupMemberT, groupT, withoutIdT } from "@/types"
import { parseDatabaseResponse } from "@/utils"
import { z } from "zod"
import { supabase } from "."

const groupsTableRef = supabase.from(tables.groups)
const groupMembersTableRef = supabase.from(tables.group_members)

export const groupMembersJoinedSchema = groupMembersSchema.extend({group_id:groupsSchema, member_id:usersSchema.optional()})
export type groupMembersJoinedSchemaT = z.infer<typeof groupMembersJoinedSchema>

export const getMyGroups = async (id:string)=>{
const groupsRes = await groupMembersTableRef.select("group_id").eq("member_id", id)
const myGroups:Record<string, groupMembersJoinedSchemaT[]> ={}
const errors = [groupsRes.error]
if (groupsRes.data) {
    const groups = groupMembersSchema.pick({group_id:true}).array().parse(groupsRes.data)
    
    for(let group of groups) {
        const membersRes = await groupMembersTableRef.select("*, group_id (*), member_id (*)").eq("group_id", group.group_id)
        const members = groupMembersJoinedSchema.array().parse(membersRes.data)
        myGroups[group.group_id] = members
        membersRes.error && errors.push(membersRes.error)
    }
}

return {data:myGroups, errors}
}
export async function getGroupMember(membershipId:string) {
    const membersRes = await groupMembersTableRef.select("*").eq("id", membershipId).limit(1).single()
    console.log(membersRes);
    
    return parseDatabaseResponse(membersRes, groupMembersJoinedSchema)
}

export async function createGroup(group:withoutIdT<groupT>) {
    return await groupsTableRef.insert(group)
}

export async function editGroup(group:groupT) {
    return await groupsTableRef.update({name: group.name}).eq("id", group.id)
}

export async function deleteGroup(group:groupT) {
    return await groupsTableRef.delete().eq("id", group.id)
}

export async function createGroupMember(groupMember:withoutIdT<groupMemberT> & {
    phone:number
}) {
    const {phone, ...rest} = groupMember
    const res = await groupMembersTableRef.insert(rest).select().single()
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
    const res = await groupMembersTableRef.delete().eq("id", groupMember.id)
    return res
}

export async function updateGroupInviteStatus(userId:string, membership_id:string, acceptance:boolean) {
    const member:Partial<groupMemberT> = {member_id: userId, invitation_accepted:acceptance}
    const res = await groupMembersTableRef.update(member).eq("id", membership_id.trim()).select().single()   
    return res
}