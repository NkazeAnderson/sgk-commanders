import useLanguage from "@/hooks/useLanguage";
import useMessage from "@/hooks/useMessage";
import useSOS from "@/hooks/useSOS";
import useToast from "@/hooks/useToast";
import { useUser } from "@/hooks/useUser";
import { router } from "expo-router";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  settingsT,
  subscriptionT,
  supabase
} from "sgk-commanders-shared";

const { getMessages } = supabase.messages;
const { getSettings } = supabase.settings;
const { getAllSOS, getMyLastResponse } = supabase.sos;
const { getSubscriptions } = supabase.subscriptions;
const { getUserById } = supabase.users;

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
    supabase.supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        getUserById(session.user.id).then((res) => {
          if (res) {
            userMethods.setUser(res);
            event === "SIGNED_IN" &&
              toast.show({ message: "Successfully signed in" });
            router.push("/tabs");
          }
        });
        getSubscriptions().then((res) => {
         setSubscriptions(res);
        });
        getSettings().then((res) => {
          res && setSettings(res);
        });
      }
      if (event === "SIGNED_OUT") {
        console.log("signout");

        router.dismissAll();
        router.replace("/login");
      }
    });
  }, []);

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
