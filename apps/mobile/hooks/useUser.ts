
import { LocationObjectCoords } from 'expo-location';
import { useState } from 'react';
import { userT } from 'sgk-commanders-shared';
import { groupMembersJoinedSchemaT } from 'sgk-commanders-shared/dist/supabase/groups';

export function useUser() {
    const [user, setUser] = useState<userT>();
    const [userLocation, setUserLocation] = useState<LocationObjectCoords>();
    const [myGroups, setMyGroups] = useState<Record<string,groupMembersJoinedSchemaT[]>>({});
    
    return { user, setUser, userLocation, setUserLocation, myGroups, setMyGroups };
}