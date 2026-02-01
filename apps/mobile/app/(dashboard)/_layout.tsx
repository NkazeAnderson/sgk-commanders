import { useAppContext } from "@/components/context/AppContextProvider";
import DashboardContextProvider from "@/components/context/DashboardContextProvider";
import { Slot } from "expo-router";
import React from "react";

const _layout = () => {
  const { userMethods:{user}}= useAppContext()
  if (!user) {
    return null
  }
  return (
    
      <DashboardContextProvider user={user}>
        <Slot />
      </DashboardContextProvider>
 
  );
};

export default _layout;
