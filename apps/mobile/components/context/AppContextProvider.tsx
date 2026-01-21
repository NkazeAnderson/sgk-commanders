import useLanguage from "@/hooks/useLanguage";
import { useUser } from "@/hooks/useUser";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext
} from "react";

type appContextT = {
  userMethods: ReturnType<typeof useUser>;
  languagesMethods:ReturnType<typeof useLanguage>,
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
  const userMethods = useUser();
  const languagesMethods = useLanguage()


  return (
    <AppContext.Provider
      value={{
        userMethods,
        languagesMethods,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
