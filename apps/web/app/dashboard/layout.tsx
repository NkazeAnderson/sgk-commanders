"use client"

import { SOSProvider } from "@/components/alerts/SOSContext";
import AppLogo from "@/components/AppLogo";
import { GroupsProvider } from "@/components/groups/GroupsContext";
import DashboardSideBar from "@/components/navbars/DashboardSideBar";
import DashboardTopBar from "@/components/navbars/DashboardTopBar";
import { PaymentsProvider } from "@/components/payments/PaymentsContext";
import { SOSResponsesProvider } from "@/components/reports/SOSResponsesContext";
import { useUser } from "@/components/users/UserContext";
import { UsersProvider } from "@/components/users/UsersContext";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

function DashboardLayout(props: PropsWithChildren) {
  const {user} = useUser()
  const router = useRouter()

  useEffect(()=>{
    if (!user) {
      router.replace("/login")
    }
  },[])

  if (!user) {
    return null
  }
  return (
    <UsersProvider>
      <GroupsProvider>
        <SOSProvider>
          <SOSResponsesProvider>
            <PaymentsProvider>
              <main className="w-full h-screen overflow-hidden bg-blue-100">
                <div className="flex w-full h-full flex-col">
                  {/* Mobile Horizontal Sidebar */}
                  <div className="md:hidden bg-blue-200 border-b border-blue-300 overflow-x-auto">
                    <div className="flex gap-2 p-2 min-w-min">
                      <DashboardSideBar />
                    </div>
                  </div>

                  {/* Main Layout */}
                  <div className="flex w-full h-full flex-col md:flex-row flex-1">
                    {/* Desktop Sidebar */}
                    <div className="hidden md:flex md:w-1/5 h-auto md:h-full bg-blue-200 flex-col gap-8 md:gap-14 items-center p-6 md:p-8">
                      <div className="flex flex-col items-center">
                        <AppLogo />
                        <h4 className="text-blue-700 text-sm md:text-base">SGK Commanders</h4>
                      </div>
                      <DashboardSideBar />
                    </div>
                    
                    {/* Main Content */}
                    <div className="w-full md:w-4/5 h-full relative text-blue-black overflow-y-auto flex flex-col">
                      <DashboardTopBar user={user} />
                      <div className="flex-1 p-4 md:p-10 overflow-y-auto">
                        {props.children}
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </PaymentsProvider>
          </SOSResponsesProvider>
        </SOSProvider>
      </GroupsProvider>
    </UsersProvider>
  );
}

export default DashboardLayout;
