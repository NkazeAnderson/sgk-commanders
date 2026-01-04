import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { getpayments } from "@/supabase/payments";
import { paymentT } from "@/types";
import { Stack } from "expo-router";
import { DollarSign } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";

const PaymentHistory = () => {
  const [payments, setPayments] = useState<paymentT[]>([]);
  const { t } = useTranslation("payment_history");
  useEffect(() => {
    getpayments().then((res) => {
      if (Array.isArray(res.data)) {
        setPayments(res.data);
      }
    });
  }, []);

  return (
    <>
      <Box className="flex-1 px-4 bg-primary-900">
        <FlatList
          data={payments.sort((a, b) =>
            !a.date || !b.date
              ? 0
              : new Date(b.date).getTime() - new Date(a.date).getTime()
          )}
          renderItem={({ item }) => {
            return (
              <HStack
                className=" items-center border-y border-primary-800 py-2"
                space="md"
              >
                <Center className=" w-10 aspect-square rounded-full bg-primary-200">
                  <Icon className=" text-primary-800" as={DollarSign} />
                </Center>
                <Box className=" flex-1">
                  <Heading className=" text-primary-100">
                    {item.phone ? t("momo") : t("creditCard")}
                  </Heading>
                  <Heading className=" text-primary-500 " size="xl">
                    FCFA {item.amount.toLocaleString()}
                  </Heading>
                  <Text className=" text-typography-100">
                    {t("date", {
                      date: new Date(item.date!).toLocaleDateString(),
                    })}
                  </Text>
                </Box>
                <Box>
                  <Text
                    className={` uppercase ${
                      !item.status
                        ? "text-typography-0"
                        : item.status === "pending"
                        ? "text-[#ffff00]"
                        : item.status === "success"
                        ? "text-success-500"
                        : item.status === "failed"
                        ? "text-error-500"
                        : "text-typography-0"
                    }`}
                    bold
                  >
                    {item.status === "pending"
                      ? t("statusPending")
                      : item.status === "success"
                      ? t("statusSuccess")
                      : item.status === "failed"
                      ? t("statusFailed")
                      : ""}
                  </Text>
                </Box>
              </HStack>
            );
          }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <Box className="h-12"></Box>}
        />
      </Box>
      <Stack.Screen options={{ title: t("heading") }} />
    </>
  );
};

export default PaymentHistory;
