"use client"


import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { subscriptionT, supabase, userT } from "sgk-commanders-shared";
import { getSubscriptions } from "sgk-commanders-shared/dist/supabase/subscriptions";
import { getUserById } from "sgk-commanders-shared/dist/supabase/users";

type UserContextT = {user?:userT, updateUser(user?:userT):void , subscriptions:subscriptionT[]}
const UserContext = createContext<UserContextT|undefined>(undefined)


export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UsersProvider");
  return ctx;
}

function UserContextProvider(props:Required<PropsWithChildren>) {

    const [user, setUser] = useState <userT>()
    const [subscriptions, setSubscriptions] = useState <subscriptionT[]>([])
    const router = useRouter()

    
    
    useEffect(()=>{
        getSubscriptions().then(res=>setSubscriptions(res))
        supabase.supabase.auth.onAuthStateChange(async (e, session)=>{
            if(session){
                try {
                    const user = await getUserById(session.user.id)
                    setUser(user)
                    console.log(user);
                    router.replace("/dashboard")
                } catch (error) {
                    console.log(error);
                }
            }
            else {
             setUser(undefined)
            }

        })
    },[])


    function updateUser(user?:userT) {
        setUser(user)
    }
    
    return (<UserContext.Provider value={{user, updateUser, subscriptions }}>
        {props.children}
    </UserContext.Provider>)
}
export default UserContextProvider