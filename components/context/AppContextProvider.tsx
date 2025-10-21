import useLanguage from "@/hooks/useLanguage";
import useMessage from "@/hooks/useMessage";
import useSOS from "@/hooks/useSOS";
import useToast from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/supabase";
import { getMessages } from "@/supabase/messages";
import { getSettings } from "@/supabase/settings";
import { getAllSOS, getMyLastResponse } from "@/supabase/sos";
import { getSubscriptions } from "@/supabase/subscriptions";
import { getUserById } from "@/supabase/users";
import { settingsT, subscriptionT, userT } from "@/types";
import { unknownErrorHandler } from "@/utils";
import { router } from "expo-router";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type appContextT = {
  userMethods: ReturnType<typeof useUser>;
  sosMethods: ReturnType<typeof useSOS>;
  messagesMethods: ReturnType<typeof useMessage>;
  languagesMethods: ReturnType<typeof useLanguage>;
  subscriptions: subscriptionT[];
  settings: settingsT["settings"];
};

const AppContext = createContext<appContextT | null>(null);

export const useAppContext = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return appContext;
};

const AppContextProvider: FC<PropsWithChildren> = (props) => {
  const [subscriptions, setSubscriptions] = useState<subscriptionT[]>([]);
  const [settings, setSettings] = useState<settingsT["settings"]>({});
  const userMethods = useUser();
  const sosMethods = useSOS();
  const messagesMethods = useMessage();
  const languagesMethods = useLanguage();
  const toast = useToast();
  const { user } = userMethods;

  useEffect(() => {
    //supabase.auth.signOut();
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        let success = false;
        console.log("userID", session.user.id);

        async function getUserFromDB() {
          const { data, error } = await getUserById(session?.user.id!);
          if (data) {
            userMethods.setUser(data as userT);
            success = true;
            event === "SIGNED_IN" &&
              toast.show({ message: "Successfully signed in" });
            router.push("/tabs");
          } else if (error) {
            unknownErrorHandler(error);
          }
        }
        getUserFromDB();
        const interval = setInterval(() => {
          success ? clearInterval(interval) : getUserFromDB();
        }, 3000);
      }
      if (event === "SIGNED_OUT") {
        console.log("signout");

        router.dismissAll();
        router.replace("/login");
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      getSubscriptions().then((res) => {
        if (Array.isArray(res.data)) {
          setSubscriptions(res.data);
        }
      });
      getSettings().then((res) => {
        res && setSettings(res);
      });
    }

    if (user?.is_agent) {
      if (!sosMethods.sos.length) {
        getAllSOS().then((res) => {
          if (res.data && Array.isArray(res.data)) {
            sosMethods.setSos(res.data);
          }
        });
      }
      getMyLastResponse(user.id)
        .then((res) => {
          res.data && sosMethods.setLastSosResponse(res.data);
        })
        .catch((e) => {
          unknownErrorHandler(e);
        });
    }

    if (user && !messagesMethods.messages.length) {
      getMessages(user)
        .then((res) => {
          if (res.error) {
            return unknownErrorHandler(res.error);
          }
          res.data &&
            Array.isArray(res.data) &&
            messagesMethods.setMessages(res.data);
        })
        .catch((e) => {
          unknownErrorHandler(e);
        });
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        userMethods,
        sosMethods,
        messagesMethods,
        subscriptions,
        settings,
        languagesMethods,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
