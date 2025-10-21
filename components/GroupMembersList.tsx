import useToast from "@/hooks/useToast";
import {
  createGroupMember,
  groupMembersJoinedSchemaT,
} from "@/supabase/groups";
import { hookFormErrorHandler } from "@/utils";
import { groupMembersSchema, usersSchema } from "@/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import {
  ArrowRight,
  Pen,
  Plus,
  PlusCircle,
  Trash,
  X,
} from "lucide-react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Animated, { SlideInRight } from "react-native-reanimated";
import { z } from "zod";
import { useAppContext } from "./context/AppContextProvider";
import Form from "./Form";
import Input from "./Input";
import MemberCard from "./MemberCard";
import { Box } from "./ui/box";
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from "./ui/button";
import { Center } from "./ui/center";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { Icon } from "./ui/icon";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

const schema = groupMembersSchema
  .omit({ id: true })
  .merge(usersSchema.pick({ phone: true }));

const GroupMembersList = ({
  members,
  manage,
  editFunc,
  deleteFunc,
}: {
  members: groupMembersJoinedSchemaT[];
  manage?: boolean;
  editFunc?: VoidFunction;
  deleteFunc?: VoidFunction;
}) => {
  const { t } = useTranslation("group_members_list");
  if (!members.length) {
    return null;
  }
  const [addNewMember, setAddNewMember] = useState(false);
  const group = members[0]?.group_id;
  const {
    userMethods: { user },
    subscriptions,
  } = useAppContext();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      group_id: group.id,
    },
  });

  const subscription = subscriptions.find(
    (item) => item.id === group?.subcription
  );

  const expired = new Date(group.subcriptionExpiration!) < new Date();

  function toggleAddMember() {
    setAddNewMember((prev) => !prev);
  }

  const toast = useToast();

  async function submit(data: z.infer<typeof schema>) {
    const res = await createGroupMember(data);
    if (!res.error) {
      toast.show({ message: "Invitation sent" });
      toggleAddMember();
    } else {
      toast.show({ message: "Invitation not sent", status: "error" });
    }
  }
  return (
    <VStack space="xs" className=" border-y border-primary-100/20 py-4">
      <Center>
        <Heading className="text-center text-primary-100 capitalize ">
          {group.name}
        </Heading>
        {manage && (
          <HStack space="md">
            <Button variant="outline" size="xs" onPress={editFunc}>
              <ButtonIcon as={Pen} />
            </Button>
            <Button
              action="negative"
              variant="outline"
              size="xs"
              onPress={deleteFunc}
            >
              <ButtonIcon as={Trash} />
            </Button>
          </HStack>
        )}

        <HStack className=" items-center justify-center" space="sm">
          <Text className="text-center text-typography-50 italic">
            {t("subscriptionLabel")}
          </Text>
          <Text className="text-center text-typography-50 italic" size="sm">
            {!subscription ? t("noSubscription") : subscription.name}
          </Text>
        </HStack>
      </Center>
      {manage && subscription && user?.id === group.admin_id && (
        <>
          <HStack
            className={`${
              addNewMember ? " justify-center" : " justify-end"
            } py-2 `}
          >
            {!addNewMember ? (
              <Button onPress={toggleAddMember} className=" rounded-l-full">
                <ButtonIcon as={Plus} />
                <ButtonText>{t("addMember")}</ButtonText>
              </Button>
            ) : (
              <Button
                onPress={toggleAddMember}
                action="negative"
                className=" rounded-full aspect-square"
              >
                <ButtonIcon as={X} />
              </Button>
            )}
          </HStack>
          {addNewMember && (
            <Animated.View entering={SlideInRight.mass(100)}>
              <Form className="pb-6 px-4">
                <Input
                  control={control}
                  name="phone"
                  label={t("phone")}
                  placeholder={t("phonePlaceholder")}
                  labelClassName="text-typography-0"
                  keyboardType="number-pad"
                  errors={errors}
                />
                <Input
                  control={control}
                  name="role"
                  label={t("role")}
                  placeholder={t("rolePlaceholder")}
                  helperText={t("roleHelper")}
                  labelClassName="text-typography-0"
                  errors={errors}
                />
                <Box className="">
                  <Button
                    onPress={handleSubmit(submit, hookFormErrorHandler)}
                    disabled={isSubmitting}
                  >
                    <ButtonText>{t("submit")}</ButtonText>
                    {!isSubmitting ? (
                      <ButtonIcon as={PlusCircle} />
                    ) : (
                      <ButtonSpinner />
                    )}
                  </Button>
                </Box>
              </Form>
            </Animated.View>
          )}
        </>
      )}
      <HStack space="sm" className=" items-end">
        <Heading className=" text-primary-0 px-2">{t("membersLabel")}</Heading>
        {manage && (
          <Heading className=" text-primary-0" size="xs">{`(${members.length}/${
            (subscription?.maximumSubAccounts
              ? subscription?.maximumSubAccounts
              : 0) + 1
          })`}</Heading>
        )}
      </HStack>
      {members.map((member) => (
        <MemberCard
          key={member.id}
          user={member.member_id}
          role={member.role}
          manage={manage}
        />
      ))}

      {subscription &&
        members.length === subscription.maximumSubAccounts - 1 && (
          <Box className=" gap-4 py-4">
            <Animated.View entering={SlideInRight.springify()}>
              <HStack className=" justify-end items-center" space="lg">
                <Text className=" text-typography-50" italic size="sm">
                  {t("limitReached")}
                </Text>
                <Icon className="text-typography-50 w-3 h-3" as={ArrowRight} />
                <Button
                  action="positive"
                  className="rounded-l-3xl "
                  onPress={() => {
                    router.push({
                      pathname: "/stacks/subscriptions",
                      params: { groupId: group.id, action: "upgrade" },
                    });
                  }}
                >
                  <ButtonText>{t("upgradePlanNow")}</ButtonText>
                </Button>
              </HStack>
            </Animated.View>
          </Box>
        )}
      {expired && (
        <Box className=" gap-4 py-4">
          <Animated.View entering={SlideInRight.springify().delay(2000)}>
            <HStack className=" justify-end items-center" space="lg">
              <Text className=" text-typography-50" italic size="sm">
                {t("subscriptionExpired")}
              </Text>
              <Icon className="text-typography-50 w-3 h-3" as={ArrowRight} />
              <Button
                action="positive"
                className="rounded-l-3xl "
                onPress={() => {
                  router.push({
                    pathname: "/stacks/subscriptions",
                    params: {
                      groupId: group.id,
                      action: "renew",
                    },
                  });
                }}
              >
                <ButtonText>{t("paySubscription")}</ButtonText>
              </Button>
            </HStack>
          </Animated.View>
        </Box>
      )}
    </VStack>
  );
};

export default GroupMembersList;
