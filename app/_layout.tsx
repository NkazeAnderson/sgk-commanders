import AppContextProvider from "@/components/context/AppContextProvider";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import useToast from "@/hooks/useToast";
import "@/localisation/i18n";
import { supabase } from "@/supabase";
import { useFonts } from "expo-font";
import * as Linking from "expo-linking";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
//@eslint-ignore
import { commonAsyncKey } from "@/constants";
import "@/localisation/i18n";
import { saveToAsycStore } from "@/utils";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const url = Linking.useLinkingURL();
  const toast = useToast();
  console.log(url);

  if (url) {
    const { queryParams } = Linking.parse(url);

    if (queryParams?.phone && queryParams.membership_id) {
      saveToAsycStore(commonAsyncKey.groupInvitation, queryParams).then(() => {
        console.log("saved");
      });
      setTimeout(() => {
        supabase.auth.getUser().then((res) => {
          if (res) {
            router.push("/tabs");
          }
        });
      }, 5000);
    }
  }

  useEffect(() => {
    // loaded && router.push("/tabs/sos");
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1, display: "flex" }}>
        <GluestackUIProvider mode="dark">
          <View className="flex-1 bg-primary-900">
            <AppContextProvider>
              <Stack
                screenOptions={{ headerShown: false, animation: "none" }}
              />
            </AppContextProvider>
          </View>
        </GluestackUIProvider>
      </GestureHandlerRootView>
      <StatusBar style="light" translucent />
    </>
  );
}
