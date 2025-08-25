import { useAppContext } from "@/components/context/AppContextProvider";
import Gradient from "@/components/Gradient";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { primaryColors, tables } from "@/constants";
import { registerToPostgresChanges } from "@/supabase/realtime";
import { joinedSOSSchemaT } from "@/supabase/sos";
import { getUserById, updateUser } from "@/supabase/users";
import { getUserLocation, unknownErrorHandler } from "@/utils";
import { sosSchema, usersSchema } from "@/zodSchema";
import { Tabs } from "expo-router";
import { LayoutDashboard, Settings, Siren } from "lucide-react-native";
import React, { useEffect, useState } from "react";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
//@eslint-ignore
import "@/localisation/i18n";
import { Platform } from "react-native";

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
    console.log(pushTokenString);
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
    userMethods: { setUserLocation, user, setUser, myGroups, setMyGroups },
    sosMethods: { setSos },
  } = useAppContext();
  console.log({ expoPushToken, notification });

  const [
    postgresChangesRegistrationStatus,
    setPostgresChangesRegistrationStatus,
  ] = useState<boolean | undefined>(undefined);

  // get the user location and set it in the context
  useEffect(() => {
    getUserLocation()
      .then((location) => setUserLocation(location?.coords ?? undefined))
      .catch((err) => {
        console.error("Error getting user location:", err);
      });

    registerForPushNotificationsAsync()
      .then((token) => {
        console.log({ user, token });

        user &&
          token &&
          !(user?.deviceIds ?? []).includes(token) &&
          updateUser({
            id: user.id,
            deviceIds: [...(user?.deviceIds ?? []), token],
          }).then((res) => {
            console.log(res);
          });
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
  }, []);

  useEffect(() => {
    postgresChangesRegistrationStatus === undefined &&
      registerToPostgresChanges(
        (payload) => {
          console.log({ payload });
          try {
            if (payload.table === tables.users) {
              const schema = usersSchema;
              if (payload.new) {
                const newUser = schema.parse(payload.new);
                if (newUser.id === user?.id) {
                  setUser(newUser);
                }
              }
            } else if (payload.table === tables.groups) {
              switch (payload.eventType) {
                case "DELETE":
                  setMyGroups((prev) => {
                    delete prev[payload.old.id];
                    return { ...prev };
                  });
                  break;

                default:
                  setUser((prev) => (prev ? { ...prev } : prev));
                  break;
              }
            } else if (payload.table === tables.group_members) {
              setUser((prev) => (prev ? { ...prev } : prev));
            } else if (payload.table === tables.sos) {
              if (
                payload.eventType === "INSERT" ||
                payload.eventType === "UPDATE"
              ) {
                const sos = sosSchema.parse(payload.new);
                getUserById(sos.sent_by).then((res) => {
                  if (res.data && !Array.isArray(res.data)) {
                    const joinedSos: joinedSOSSchemaT = {
                      ...sos,
                      sent_by: res.data,
                    };
                    setSos((prev) => {
                      const index = prev.findIndex(
                        (item) => item.id === joinedSos.id
                      );
                      if (index >= 0) {
                        prev[index] = joinedSos;
                        return prev;
                      } else {
                        return [joinedSos, ...prev];
                      }
                    });
                  }
                });
              }
            }
          } catch (error) {
            unknownErrorHandler(error);
          }
        },
        (registered) => {
          setPostgresChangesRegistrationStatus(registered);
        }
      );

    return () => {
      // postgresChangesChannel.unsubscribe().then(() => {
      //   setPostgresChangesRegistrationStatus(undefined);
      // });
    };
  }, [postgresChangesRegistrationStatus]);

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
