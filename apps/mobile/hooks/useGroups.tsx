import { useEffect, useState } from "react";
import { userT } from "sgk-commanders-shared";
import { getGroupMembers, getGroups, groupMembersJoinedSchemaT } from "sgk-commanders-shared/dist/supabase/groups";

export function useGroups (user:userT){
    const [myGroups, setMyGroups] = useState<Record<string,groupMembersJoinedSchemaT[]>>({});

    useEffect(()=>{
         getGroups(user.id).then(async (res)=>{
            const groups: typeof myGroups = {}
            for(let group of res) {
              try {
                  const members = await getGroupMembers(group.id)
                  groups[group.id] = members
                  setMyGroups(groups)
              } catch (error) {
                  console.log(error);
              }
            }
        }).catch(e=>console.log(e)
        )
    },[])
    return {myGroups}
}