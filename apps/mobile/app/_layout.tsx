import AppContextProvider from "@/components/context/AppContextProvider";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import "@/localisation/i18n";
import { useFonts } from "expo-font";
import * as Linking from "expo-linking";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useLayoutEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { supabase } from "sgk-commanders-shared";
//@eslint-ignore
import { commonAsyncKey } from "@/constants";
import "@/localisation/i18n";
import { saveToAsycStore } from "@/utils";
import { OverlayProvider } from "@gluestack-ui/overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-url-polyfill/auto';
import { setUpSupabase } from "sgk-commanders-shared/dist/supabase";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const url = Linking.useLinkingURL();
  
  if (url) {
    const { queryParams } = Linking.parse(url);

    if (queryParams?.phone && queryParams.membership_id) {
      saveToAsycStore(commonAsyncKey.groupInvitation, queryParams).then(() => {
        console.log("saved");
      });
      setTimeout(() => {
        supabase.supabase.auth.getUser().then((res) => {
          if (res) {
            router.push("/tabs");
          }
        });
      }, 5000);
    }
  }

  useLayoutEffect(() => {
    // supabase.supabase.auth.signOut();
    setUpSupabase([process.env.EXPO_PUBLIC_SUPABASE_URL!, process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
        },
      }])
  }, []);

  if (!loaded) {
    return null;
  }
  return (
      <GestureHandlerRootView style={{flex:1 , position:"relative"}}>
        <GluestackUIProvider mode="dark">
          <OverlayProvider>
            <AppContextProvider>
              <Stack
                screenOptions={{ headerShown: false, animation: "none" }}
              />
            </AppContextProvider>
          </OverlayProvider>
        </GluestackUIProvider>
     
      <StatusBar style="light" translucent />
      </GestureHandlerRootView>
    
  );
}
