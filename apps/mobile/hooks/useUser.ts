
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase, userT } from 'sgk-commanders-shared';
import { getUserById } from 'sgk-commanders-shared/dist/supabase/users';
import useToast from './useToast';

export function useUser() {
    const [user, setUser] = useState<userT>();

    const toast = useToast()

    useEffect(() => {
    //supabase.auth.signOut();
    supabase.supabase.auth.onAuthStateChange((event, session) => { 
      if (session?.user) {
        getUserById(session.user.id).then((res) => {
          if (res) {
            setUser(res);
            event === "SIGNED_IN" &&
              toast.show({ message: "Successfully signed in" });
            router.push("/tabs");
          }
        });
      }
      if (event === "SIGNED_OUT") {
        console.log("signout");
        router.dismissAll();
        router.replace("/login");
        toast.show({message:"Signed Out", status:"info"})
      }
    });
  }, []);
    
    return { user, setUser };

}