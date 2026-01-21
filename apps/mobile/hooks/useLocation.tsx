import { getUserLocation } from "@/utils";
import { LocationObjectCoords } from "expo-location";
import { useEffect, useState } from "react";
import { userT } from "sgk-commanders-shared";
import { mockLocationYassa } from "sgk-commanders-shared/dist/constants";
import { updateUser } from "sgk-commanders-shared/dist/supabase/users";

export function useLocation (user?:userT){

    const [userLocation, setUserLocation] = useState<LocationObjectCoords>();

    useEffect(()=>{
        if (!user) {
            return
        }
        if (!__DEV__) {
            getUserLocation()
              .then((location) => setUserLocation(location?.coords ?? undefined))
              .catch((err) => {
                console.error("Error getting user location:", err);
              });
          
          setInterval(() => { 
            getUserLocation()
              .then((location) =>{ setUserLocation(location?.coords ?? undefined)
                updateUser({
                  id: user.id,
                  last_known_location: location?.coords ?? null,
                })
              })
              .catch((err) => {
                console.error("Error getting user location:", err);
              });
          }, 1*60*1000);
                }
                else {
                  setUserLocation(mockLocationYassa);
                   updateUser({
                  id: user.id,
                  last_known_location: mockLocationYassa,
                })
                }
    },[user])

    return {userLocation}
}