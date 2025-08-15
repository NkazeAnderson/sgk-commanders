import { useAppContext } from "@/components/context/AppContextProvider";
import Input from "@/components/Input";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonSpinner } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { createMessage } from "@/supabase/messages";
import { messageT } from "@/types";
import { hookFormErrorHandler } from "@/utils";
import { Redirect, Stack } from "expo-router";
import { Send } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FlatList, KeyboardAvoidingView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Messages = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<{ text: string }>();
  const { t } = useTranslation("messages");
  const {
    userMethods: { user },
    messagesMethods: { messages, setMessages },
    settings,
  } = useAppContext();

  const listRef = useRef<FlatList | null>(null);

  useEffect(() => {
    setTimeout(() => {
      listRef.current && listRef.current.scrollToEnd();
    }, 1000);
  }, []);

  const defaultCustomerSupportAgent: string | undefined = settings[
    "CustomerSupportAgent"
  ]
    ? String(settings["CustomerSupportAgent"])
    : undefined;
  const [pendingMessages, setPendingMessages] = useState<messageT[]>([]);

  async function submit(data: { text: string }) {
    const message: Omit<messageT, "id"> = {
      sentBy: user?.id!,
      sentTo: defaultCustomerSupportAgent ?? "",
      text: data.text,
    };
    const pendingMessage: messageT = {
      ...message,
      id: pendingMessages.length.toString(),
      pending: true,
    };
    reset();
    setPendingMessages((prev) => [...prev, pendingMessage]);
    const res = await createMessage(message);
    setPendingMessages((prev) =>
      prev.filter((item) => item.id !== pendingMessage.id)
    );
    if (!res.error) {
      delete pendingMessage.pending;
      setMessages((prev) => [...prev, pendingMessage]);
    } else {
      console.log(res);
    }
  }

  if (!user || !defaultCustomerSupportAgent) {
    return <Redirect href={".."} />;
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={80}
        className="flex-1 bg-primary-900"
      >
        <View className="flex-1">
          <FlatList
            className="flex-1  px-4 bg-primary-900 py-4"
            data={[...messages, ...pendingMessages]}
            renderItem={({ item }) => (
              <HStack className={user.id === item.sentBy ? " justify-end" : ""}>
                <Box
                  className={`w-3/4 rounded-md ${
                    item.sentBy === user.id
                      ? "bg-primary-600"
                      : "bg-primary-800"
                  }  p-2 my-1 `}
                >
                  <Text className=" text-typography-50">{item.text}</Text>
                  <HStack className=" justify-end">
                    {item.pending && (
                      <Button variant="link">
                        <ButtonSpinner className=" text-white" />
                      </Button>
                    )}
                  </HStack>
                </Box>
              </HStack>
            )}
            ListFooterComponent={() => <Box className="h-10"></Box>}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <SafeAreaView className="px-4 bg-primary-900" edges={["bottom"]}>
          <HStack space="lg" className="items-center justify-between">
            <Box className=" flex-1">
              <Input
                control={control}
                name="text"
                placeholder={t("placeholder")}
              />
            </Box>
            <Button
              onPress={handleSubmit(submit, hookFormErrorHandler)}
              size="lg"
              className="p-4"
            >
              <ButtonIcon as={Send} />
            </Button>
          </HStack>
        </SafeAreaView>
      </KeyboardAvoidingView>
      <Stack.Screen options={{ title: t("customerSupportTitle") }} />
    </>
  );
};

export default Messages;
