import { useGroups } from "@/hooks/useGroups";
import { useLocation } from "@/hooks/useLocation";
import useMessage from "@/hooks/useMessage";
import { useSettings } from "@/hooks/useSettings";
import useSOS from "@/hooks/useSOS";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext
} from "react";
import {
  settingsT,
  subscriptionT,
  userT,
} from "sgk-commanders-shared";

type DashboardContextT = {
  sosMethods: ReturnType<typeof useSOS>;
  messagesMethods: ReturnType<typeof useMessage>;
  subscriptions: subscriptionT[];
  settings: settingsT["settings"];
  locationMethods:ReturnType<typeof useLocation>,
  groupsMethods: ReturnType<typeof useGroups>,
  user:userT
};

const DashboardContext = createContext<DashboardContextT | null>(null);

export const useDashboardContext = () => {
  const dashboardContext = useContext(DashboardContext);
  if (!dashboardContext) {
    throw new Error("useDashboardContext must be used within an DashboardContextProvider");
  }
  return dashboardContext;
};

const DashboardContextProvider: FC<PropsWithChildren & {user:userT}> = (props) => {
  const {subscriptions} = useSubscriptions()
  const {settings} = useSettings()
  const locationMethods = useLocation(props.user)
  const sosMethods = useSOS(props.user);
  const messagesMethods = useMessage(props.user);
  const groupsMethods = useGroups(props.user)

  return (
    <DashboardContext.Provider
      value={{
        sosMethods,
        messagesMethods,
        subscriptions,
        settings,
        locationMethods,
        groupsMethods,
        user:props.user
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
