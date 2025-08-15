import { useAppContext } from "@/components/context/AppContextProvider";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";

import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Link, router, Stack } from "expo-router";
import { CircleUserRound, Coins, Pen } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
const Profile = () => {
  const {
    userMethods: { user, myGroups },
  } = useAppContext();
  const { t } = useTranslation("profile");

  const expired = user?.subcriptionExpiration
    ? new Date() > new Date(user.subcriptionExpiration)
    : true;

  const groupKeys = Object.keys(myGroups);

  return (
    <>
      <View className="flex-1 bg-primary-900 px-4 ">
        <Center className="gap-4">
          <Center className="w-36 aspect-square rounded-full bg-primary-200 relative">
            {user?.profile_picture ? (
              <Avatar size="2xl">
                <AvatarImage
                  source={{
                    uri: user.profile_picture,
                  }}
                />
              </Avatar>
            ) : (
              <Icon
                className="w-20 h-20 text-primary-600"
                as={CircleUserRound}
              />
            )}
            <Button
              action={"primary"}
              variant={"solid"}
              size={"md"}
              className="aspect-square rounded-full absolute -bottom-4 -right-16"
              onPress={() => {
                router.push("/stacks/edit-profile");
              }}
            >
              <ButtonIcon as={Pen} />
            </Button>
          </Center>
          <Heading size="xl" className="text-typography-50 capitalize">
            {user?.name}
          </Heading>
        </Center>
        {!myGroups && (
          <HStack className=" items-center justify-center py-4" space="md">
            <Text className=" text-primary-0">{t("mySubscription")}</Text>
            <Text
              bold
              className={`${expired ? " text-error-500" : "text-success-500"}`}
            >
              {expired ? t("expired") : t("active")}
            </Text>
            <Link href={`/stacks/subscriptions?userId=${user?.id}`} asChild>
              <Button size="sm" className=" rounded-full ml-2">
                <ButtonText>{t("subscribe")}</ButtonText>
                <ButtonIcon as={Coins} />
              </Button>
            </Link>
          </HStack>
        )}
        <Divider className="my-6 bg-primary-100" />
        <ScrollView>
          <VStack space="lg">
            <Box>
              <Heading className=" text-primary-0">{t("phone")}</Heading>
              <Text className=" text-typography-300">+237 {user?.phone}</Text>
            </Box>
            {Boolean(user?.emergency_phone) && (
              <Box>
                <Heading className=" text-primary-0">
                  {t("emergencyPhone")}
                </Heading>
                <Text className=" text-typography-300">
                  +237 {user?.emergency_phone}
                </Text>
              </Box>
            )}
            <Box>
              <Heading className=" text-primary-0">{t("email")}</Heading>
              <Text className=" text-typography-300">{user?.email}</Text>
            </Box>
            <Box>
              <Heading className=" text-primary-0">{t("homeAddress")}</Heading>
              <Text className=" text-typography-300">{user?.home_address}</Text>
            </Box>
            <Box>
              <Heading className=" text-primary-0">{t("accountType")}</Heading>
              <Text className=" text-typography-300">
                {user?.is_agent ? t("agent") : t("client")}
              </Text>
            </Box>
            {Boolean(groupKeys.length) && !user?.is_agent && (
              <Heading className=" text-primary-500">
                {t("groupsAndFamilies")}
              </Heading>
            )}
            {Boolean(groupKeys.length) &&
              !user?.is_agent &&
              groupKeys.map((item) => {
                const membership = myGroups[item].find(
                  (member) => member.member_id?.id === user?.id
                )!;
                return (
                  <Box key={item} className=" gap-2">
                    <Box>
                      <Heading className=" text-primary-0">
                        {membership.group_id.is_organisation
                          ? t("organisation")
                          : t("family")}
                      </Heading>
                      <Text className=" text-typography-300">
                        {membership.group_id.name}
                      </Text>
                    </Box>
                    <Box>
                      <Heading className=" text-primary-0">
                        {t("myRole")}
                      </Heading>
                      <Text className=" text-typography-300 capitalize">
                        {membership.role}
                      </Text>
                    </Box>
                  </Box>
                );
              })}
          </VStack>
        </ScrollView>
      </View>
      <Stack.Screen
        options={{
          title: t("heading"),
        }}
      />
    </>
  );
};
export default Profile;
