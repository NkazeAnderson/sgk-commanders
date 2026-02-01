import { useAppContext } from "@/components/context/AppContextProvider";
import Gradient from "@/components/Gradient";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { unknownErrorHandler } from "@/utils";
import { Tabs } from "expo-router";
import { LayoutDashboard, Settings, Siren } from "lucide-react-native";
import React, { useLayoutEffect, useState } from "react";
import { supabase, zodSchemas } from "sgk-commanders-shared";

const { registerToPostgresChanges } = supabase.realtime;
const { getUserById, updateUser } = supabase.users;
const { sosSchema, usersSchema } = zodSchemas;

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
//@eslint-ignore
import { primaryColors } from "@/constants";
import "@/localisation/i18n";
import { Platform } from "react-native";
import { getMyLastResponse } from "sgk-commanders-shared/dist/supabase/sos";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// async function sendPushNotification(expoPushToken: string) {
//   const message = {
//     to: expoPushToken,
//     sound: "default",
//     title: "Original Title",
//     body: "And here is the body!",
//     data: { someData: "goes here" },
//   };

// }

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    handleRegistrationError(
      "Permission not granted to get push token for push notification!"
    );
    return;
  }
  const projectId =
    Constants?.expoConfig?.extra?.eas?.projectId ??
    Constants?.easConfig?.projectId;
  if (!projectId) {
    handleRegistrationError("Project ID not found");
  }
  try {
    const pushTokenString = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;
    return pushTokenString;
  } catch (e: unknown) {
    handleRegistrationError(`${e}`);
  }
}

const _layout = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const {
    userMethods: { user},
  } = useAppContext();

  const [
    postgresChangesRegistrationStatus,
    setPostgresChangesRegistrationStatus,
  ] = useState<boolean | undefined>(undefined);

  useLayoutEffect(() => {
      if (!user) return
       
    registerForPushNotificationsAsync()
      .then((token) => {
        user &&
          token &&
          !(user?.deviceIds ?? []).includes(token) &&
          updateUser({
            id: user.id,
            deviceIds: [...(user?.deviceIds ?? []), token],
          })
      })
      .catch((error: any) => console.log(error));

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    if (user?.is_agent) {
      getMyLastResponse(user.id)
        .then((res) => {
          // res.data && sosMethods.setLastSosResponse(res.data);
        })
        .catch((e) => {
          unknownErrorHandler(e);
        });
     
    }
  
  }, []);

  // useEffect(() => {
  //   postgresChangesRegistrationStatus === undefined &&
  //     registerToPostgresChanges(
  //       (payload) => {
  //         console.log({ payload });
  //         try {
  //           if (payload.table === tables.users) {
  //             const schema = usersSchema;
  //             if (payload.new) {
  //               const newUser = schema.parse(payload.new);
  //               if (newUser.id === user?.id) {
  //                 setUser(newUser);
  //               }
  //               setMyGroups((prev)=>{
  //                 for(let item of Object.keys(prev)) {
  //                   const index = prev[item].findIndex(m=>m.member_id?.id === newUser.id)
  //                   if(index >=0 ) {
  //                     prev[item][index].member_id = newUser
  //                   }
  //                 }
  //                 return prev
  //                })
  //             }
  //           } else if (payload.table === tables.groups) {
  //             switch (payload.eventType) {
  //               case "DELETE":
  //                 setMyGroups((prev) => {
  //                   //@ts-ignore
  //                   delete prev[payload.old.id];
  //                   return { ...prev };
  //                 });

  //                 break;

  //               default:
  //                 setUser((prev) => (prev ? { ...prev } : prev));
  //                 break;
  //             }
  //           } else if (payload.table === tables.group_members) {
  //             setUser((prev) => (prev ? { ...prev } : prev));
  //           } else if (payload.table === tables.sos) {
  //             if (
  //               payload.eventType === "INSERT" ||
  //               payload.eventType === "UPDATE"
  //             ) {
  //               const sos = sosSchema.parse(payload.new);
  //               getUserById(sos.sent_by).then((res) => {
  //                 if (res) {
  //                   const joinedSos: joinedSOSSchemaT = {
  //                     ...sos,
  //                     sent_by: res,
  //                   };
  //                   sosMethods.setSos((prev) => {
  //                     const index = prev.findIndex(
  //                       (item) => item.id === joinedSos.id
  //                     );
  //                     if (index >= 0) {
  //                       prev[index] = joinedSos;
  //                       return [...prev];
  //                     } else {
  //                       return [joinedSos, ...prev];
  //                     }
  //                   });
  //                 }
  //               });
  //             }
  //           }
  //           else if (payload.table === tables.sos_responses) {
  //             if (
  //               payload.eventType === "INSERT" ||
  //               payload.eventType === "UPDATE"
  //             ) {
  //               const sosResponsePayload = sosResponseSchema.parse(payload.new);
  //               getSOSResponses({sosId: sosResponsePayload.sos}).then((res) => {
  //                 sosMethods.setSosResponses((prev) => {
  //                   const otherResponses = prev.filter(item=>item.sos.id !== sosResponsePayload.sos)
  //                   return [...otherResponses, ...res]
  //                 });
  //               });
  //             }
  //           }
  //         } catch (error) {
  //           unknownErrorHandler(error);
  //         }
  //       },
  //       (registered) => {
  //         setPostgresChangesRegistrationStatus(registered);
  //       }
  //     );

  //   return () => {
  //     // postgresChangesChannel.unsubscribe().then(() => {
  //     //   setPostgresChangesRegistrationStatus(undefined);
  //     // });
  //   };
  // }, [postgresChangesRegistrationStatus]);
 
  return (
      <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: primaryColors["--color-primary-950"],
        },
        // headerStyle: {
        //   backgroundColor: primaryColors["--color-primary-950"],
        // },
        headerShown: false,
        animation: "none",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon({ focused }) {
            return (
              <Icon
                className={focused ? "text-primary-600" : "text-typography-600"}
                as={LayoutDashboard}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="sos"
        options={{
          title: "SOS",
          tabBarIcon: ({ focused }) => {
            return (
              <Box
                className={`${
                  focused ? " w-20" : "w-12"
                }  aspect-square rounded-full relative ${
                  focused ? "-top-6" : "-top-3"
                } `}
              >
                <Gradient
                  className="w-full h-full rounded-full overflow-hidden"
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0.4, y: 0 }}
                >
                  <Center className="w-full h-full">
                    {user?.is_agent ? (
                      <Icon className=" text-typography-0" as={Siren} />
                    ) : (
                      <Heading
                        size={focused ? "md" : "xs"}
                        className=" text-typography-200"
                      >
                        SOS
                      </Heading>
                    )}
                  </Center>
                </Gradient>
              </Box>
            );
          },
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Settings",
          tabBarIcon({ focused }) {
            return (
              <Icon
                className={focused ? "text-primary-600" : "text-typography-600"}
                as={Settings}
              />
            );
          },
        }}
      />
      </Tabs>
  );
};

export default _layout;
