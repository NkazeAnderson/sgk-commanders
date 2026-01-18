
import { LocationObjectCoords } from 'expo-location';
import { useEffect, useState } from 'react';
import { userT } from 'sgk-commanders-shared';
import { getMyGroups, groupMembersJoinedSchemaT } from 'sgk-commanders-shared/dist/supabase/groups';

export function useUser() {
    const [user, setUser] = useState<userT>();
    const [userLocation, setUserLocation] = useState<LocationObjectCoords>();
    const [myGroups, setMyGroups] = useState<Record<string,groupMembersJoinedSchemaT[]>>({});

    useEffect(()=>{
       if (user ) {
            getMyGroups(user.id).then(res=>{
                if (res.data) {
                    setMyGroups(res.data)
                    
                } else {
                    console.log("my groups data", res);
                }
            }).catch(e=>console.log(e)
            )
        }
    },[user])

    return { user, setUser, userLocation, setUserLocation, myGroups, setMyGroups };
}