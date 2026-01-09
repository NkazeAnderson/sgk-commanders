import { useAppContext } from "@/components/context/AppContextProvider";
import Gradient from "@/components/Gradient";
import Input from "@/components/Input";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import useToast from "@/hooks/useToast";
import { unknownErrorHandler } from "@/utils";
import { Href, router, Stack, useLocalSearchParams } from "expo-router";
import { CreditCard, Phone } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { groupT, paymentT, supabase } from "sgk-commanders-shared";

const Subscriptions = () => {
  const { t } = useTranslation("subscriptions");
  const { groupId, userId, action } = useLocalSearchParams<{
    groupId?: string;
    userId?: string;
    action?: "renew" | "upgrade";
  }>();
  const [showDrawer, setShowDrawer] = useState(false);
  const [payWith, setPaywith] = useState<"phone" | "card">("phone");

  const {
    userMethods: { user, myGroups },
    subscriptions,
  } = useAppContext();
  const {
    control,
    setValue,
    watch,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<Omit<paymentT, "id" | "by" | "date" | "status" | "amount">>({
    defaultValues: { group: groupId, months: 1 },
  });

  const months = watch("months");

  const toast = useToast();

  const selectedSubscriptionId = watch("subscription");
  const selectedSubscription = subscriptions.find(
    (item) => item.id === selectedSubscriptionId
  );

  const groupKeys = Object.keys(myGroups);

  const adminGroups = groupKeys
    .map((item) => myGroups[item][0].group_id)
    .filter((item) => user?.id === item.admin_id);
  const targetGroup = adminGroups.find((item) => item.id === groupId);
  const targetSubscription = subscriptions.find(
    (item) => item.id === targetGroup?.subcription
  );

  const submitting = useRef(false);

  async function submit(data: any) {
    const res = await supabase.functions.invoke("tara-payments", {
      body: data,
    });
    if (res.data) {
      if (payWith === "card") {
        const data: {
          status: "success";
          message: string;
          whatsappLink: Href;
          telegramLink: Href;
          dikaloLink: Href;
          smsLink: string;
        } = res.data;
        toast.show({ message: "Redirecting to payment screen... " });
        setTimeout(() => {
          router.navigate(data.dikaloLink);
        }, 2000);
      } else {
        const data: {
          status: "SUCCESS";
          ussdCode: string;
          vendor: "MTN_CAMEROON";
        } = res.data;
        toast.show({
          message: "Please Dail:  " + data.ussdCode,
        });
        router.back();
      }
    }
    if (res.error) {
      toast.show({
        message:
          "Sorry, we are unable to process your request now! Try again later.",
        status: "error",
      });
      unknownErrorHandler(res.error);
    }
    setShowDrawer(false);
  }

  useEffect(() => {
    if (action == "renew" && targetSubscription?.id) {
      setValue("subscription", targetSubscription.id);
      setShowDrawer(true);
    }
  }, [targetSubscription, action]);

  return (
    <>
      <ScrollView className=" flex-1 bg-primary-900 p-4 gap-4">
        {groupId || userId ? (
          subscriptions
            .filter((item) =>
              targetSubscription && action === "upgrade"
                ? item.for === "groups" &&
                  item.maximumSubAccounts >
                    targetSubscription.maximumSubAccounts
                : targetSubscription && action === "renew"
                ? item.for === "groups" && item.id === targetSubscription.id
                : groupId
                ? item.for === "groups"
                : item.for === "individuals"
            )
            .map((item) => (
              <Box
                key={item.id}
                className=" relative bg-primary-200  rounded-lg p-2 my-4"
              >
                <Gradient
                  className="overflow-hidden rounded-full "
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0.4, y: 0 }}
                >
                  <VStack space="xl" className=" items-center relative p-6">
                    <Image
                      className=" w-10 h-10"
                      source={
                        item.for === "groups"
                          ? require("@/assets/images/family.png")
                          : require("@/assets/images/person.png")
                      }
                      alt="icon"
                    />
                    <Heading className="text-primary-50 capitalize" size="2xl">
                      {item.name}
                    </Heading>
                    <HStack space="sm" className=" items-end">
                      <Heading className=" text-primary-500" size="lg">
                        {item.price}
                      </Heading>
                      <Text className=" text-typography-50">/month</Text>
                    </HStack>
                    <HStack space="md" className=" items-center">
                      <Box className="w-1 aspect-square bg-primary-500 rounded-full "></Box>
                      <Text className=" text-typography-50">
                        {t("principalAccount")}
                      </Text>
                    </HStack>
                    {item.maximumSubAccounts > 0 && (
                      <HStack space="md" className=" items-center">
                        <Box className="w-1 aspect-square bg-primary-500 rounded-full "></Box>
                        <Text className=" text-typography-50">
                          {t("subAccounts", { count: item.maximumSubAccounts })}
                        </Text>
                      </HStack>
                    )}
                    <Button
                      onPress={() => {
                        setShowDrawer(true);
                        setValue("subscription", item.id!);
                      }}
                    >
                      <ButtonText>{t("select")}</ButtonText>
                    </Button>
                  </VStack>
                </Gradient>
              </Box>
            ))
        ) : (
          <>
            {!adminGroups.filter(
              (item) => item.subcription && item.subcriptionExpiration
            ).length ? (
              <>
                <Box className=" gap-4 pt-4 pb-10">
                  <Heading className=" text-primary-200">
                    {t("personalAccountSubscription")}
                  </Heading>
                  <SimpleSubscriptionListCard item={user!} />
                  <Text className=" text-secondary-500" italic size="sm">
                    {t("personalAccountNote")}
                  </Text>
                </Box>
                {!adminGroups.length && (
                  <>
                    <Divider className="bg-primary-400" />
                    <Center className="px-4 py-10 gap-4">
                      <Heading className="text-primary-50">
                        {t("noFamily")}
                      </Heading>
                      <Text className=" text-center text-typography-100">
                        {t("createFamilyDesc")}
                      </Text>
                      <Button
                        onPress={() => {
                          router.push("/stacks/members");
                        }}
                      >
                        <ButtonText>{t("createFamily")}</ButtonText>
                      </Button>
                    </Center>
                  </>
                )}
              </>
            ) : (
              adminGroups.map((item) => {
                return <SimpleSubscriptionListCard item={item} key={item.id} />;
              })
            )}
          </>
        )}
      </ScrollView>
      <Drawer
        isOpen={showDrawer && !submitting.current}
        onClose={() => {
          setShowDrawer(false);
        }}
        size="sm"
        anchor="top"
      >
        <DrawerBackdrop />
        <DrawerContent className="rounded-b-3xl bg-primary-900 h-[60vh]">
          <DrawerHeader className="py-10">
            <Heading size="xl" className="text-primary-500">
              {t("enterPaymentDetails")}
            </Heading>
            <Button
              action="negative"
              onPress={() => {
                setShowDrawer(false);
              }}
              className="self-end"
            >
              <ButtonText>{t("close")}</ButtonText>
            </Button>
          </DrawerHeader>

          <DrawerBody className=" gap-2 ">
            <Box className=" gap-4">
              <HStack space="3xl" className=" items-center justify-between">
                <Box className=" flex-1 ">
                  <Input
                    control={control}
                    name="months"
                    keyboardType="number-pad"
                    label={t("months")}
                    labelClassName="text-typography-50"
                  />
                </Box>
                <Box className=" flex-[2]">
                  <HStack className=" items-end justify-center" space="xs">
                    <Heading size="md" className=" text-typography-50">
                      {t("fcfa")}
                    </Heading>
                    <Text className=" text-typography-50">
                      {selectedSubscription && months
                        ? selectedSubscription.price * months
                        : selectedSubscription?.price || 0}
                    </Text>
                  </HStack>
                </Box>
              </HStack>
              <Box>
                <Text className="text-typography-50">{t("payWith")}</Text>
                <HStack space="xl">
                  <Button
                    variant={payWith !== "phone" ? "outline" : "solid"}
                    onPress={() => {
                      setPaywith("phone");
                    }}
                    className="flex-1"
                    isDisabled={isSubmitting}
                  >
                    <ButtonIcon as={Phone} />
                    <ButtonText>{t("momo")}</ButtonText>
                  </Button>
                  <Button
                    variant={payWith !== "card" ? "outline" : "solid"}
                    onPress={() => {
                      setValue("phone", undefined);
                      setPaywith("card");
                    }}
                    className="flex-1"
                    isDisabled={isSubmitting}
                  >
                    <ButtonIcon as={CreditCard} />
                    <ButtonText>{t("card")}</ButtonText>
                  </Button>
                </HStack>
              </Box>
              {payWith === "phone" && (
                <Input
                  control={control}
                  name="phone"
                  keyboardType="number-pad"
                  label={t("phone")}
                  labelClassName="text-typography-50"
                />
              )}
            </Box>
          </DrawerBody>
          <DrawerFooter className=" relative">
            <Button
              onPress={handleSubmit(submit)}
              className="self-end"
              isDisabled={isSubmitting}
            >
              <ButtonText>{t("payNow")}</ButtonText>
            </Button>
            <Box
              className=" absolute"
              style={{
                bottom: -80,
                width: "100%",
              }}
            >
              <Center>
                <Heading className=" text-primary-500 capitalize" size="3xl">
                  {t("plan", { plan: selectedSubscription?.name })}
                </Heading>
              </Center>
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Stack.Screen options={{ title: t("heading") }} />
    </>
  );
};

function SimpleSubscriptionListCard({
  item,
}: {
  item: Pick<groupT, "id" | "name" | "subcriptionExpiration" | "subcription">;
}) {
  const {
    subscriptions,
    userMethods: { myGroups },
  } = useAppContext();
  const subscription = subscriptions.find((sub) => sub.id === item.subcription);
  const expired = new Date(item.subcriptionExpiration!) < new Date();

  const dateFormater = new Intl.DateTimeFormat(undefined, {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
  const { t } = useTranslation("subscriptions");
  return (
    <VStack className=" border border-primary-200 rounded-2xl p-2" space="md">
      <Box className=" flex-1 gap-2">
        <Heading size="sm" className=" text-primary-50 capitalize">
          {item.name}
        </Heading>
        <Heading size="2xl" className=" text-primary-500 capitalize">
          {t("plan", { plan: subscription?.name })}
        </Heading>
        <HStack className=" items-center">
          {expired ? (
            <>
              <Text className="text-primary-0">{t("expiredOn")}</Text>
              <Text className="text-error-500">
                {dateFormater.format(new Date(item.subcriptionExpiration!))}
              </Text>
            </>
          ) : (
            <>
              <Text size="lg" className="text-primary-0">
                {t("expiresOn")}
              </Text>
              <Text className="text-success-500">
                {dateFormater.format(new Date(item.subcriptionExpiration!))}
              </Text>
            </>
          )}
        </HStack>
        <HStack space="sm" className="items-center">
          <Text className="text-primary-0">{t("principalAccounts")}</Text>
          <Text className="text-typography-0">01</Text>
        </HStack>
        {myGroups[item.id] && (
          <HStack space="sm" className="items-center">
            <Text className="text-primary-0">{t("availableSubAccounts")}</Text>
            <Text className="text-typography-0">
              {myGroups && subscription
                ? ` ${
                    subscription.maximumSubAccounts -
                    myGroups[item.id].length +
                    1
                  }/${subscription.maximumSubAccounts}`
                : ""}
            </Text>
          </HStack>
        )}
      </Box>
      <Box className=" gap-2">
        {expired ? (
          <>
            <Text className=" text-error-500 text-end" bold>
              {t("expired")}
            </Text>
            <Button
              onPress={() => {
                subscription?.for === "individuals"
                  ? router.setParams({ userId: item.id })
                  : router.setParams({ groupId: item.id, action: "renew" });
              }}
              className=" rounded-full my-4"
            >
              <ButtonText>{t("pay")}</ButtonText>
            </Button>
          </>
        ) : (
          <>
            <Button
              size="xs"
              variant="outline"
              action="positive"
              className=" rounded-full"
              onPress={() => {
                subscription?.for === "individuals"
                  ? router.setParams({ userId: item.id })
                  : router.setParams({ groupId: item.id, action: "upgrade" });
              }}
            >
              <ButtonText className=" text-success-500">
                {t("upgrade")}
              </ButtonText>
            </Button>
            <Text className=" text-success-500" bold>
              {t("active")}
            </Text>
          </>
        )}
      </Box>
    </VStack>
  );
}

export default Subscriptions;
