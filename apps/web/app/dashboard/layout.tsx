import { SOSProvider } from "@/components/alerts/SOSContext";
import AppLogo from "@/components/AppLogo";
import { GroupsProvider } from "@/components/groups/GroupsContext";
import DashboardSideBar from "@/components/navbars/DashboardSideBar";
import DashboardTopBar from "@/components/navbars/DashboardTopBar";
import { PaymentsProvider } from "@/components/payments/PaymentsContext";
import { SOSResponsesProvider } from "@/components/reports/SOSResponsesContext";
import { UsersProvider } from "@/components/users/UsersContext";
import { users } from "@/mockdata";
import { PropsWithChildren } from "react";

function dashboardLayout(props: PropsWithChildren) {
  return (
    <UsersProvider>
      <GroupsProvider>
        <SOSProvider>
          <SOSResponsesProvider>
            <PaymentsProvider>
              <main className="w-full h-full overflow-hidden bg-blue-100">
                <div className="flex w-full h-full">
                  <div className="w-1/5 h-full bg-blue-200 flex flex-col gap-14 items-center p-8">
                    <div className="flex flex-col items-center">
                      <AppLogo />
                      <h4 className=" text-blue-700">SGK Commanders</h4>
                    </div>
                    <DashboardSideBar />
                  </div>
                  <div className="w-4/5 h-full relative text-blue-black p-10">
                    <DashboardTopBar user={users[1]} />
                    {props.children}
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

export default dashboardLayout;
