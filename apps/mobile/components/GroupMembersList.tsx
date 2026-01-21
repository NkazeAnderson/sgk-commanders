import useToast from "@/hooks/useToast";
import { hookFormErrorHandler } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import {
  ArrowRight,
  DollarSign,
  List,
  Pen,
  Plus,
  PlusCircle,
  Trash,
  Users,
  X,
} from "lucide-react-native";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Animated, { SlideInRight } from "react-native-reanimated";
import { supabase, zodSchemas } from "sgk-commanders-shared";
import { groupMembersJoinedSchemaT } from "sgk-commanders-shared/dist/supabase/groups";
import { z } from "zod";
import { useDashboardContext } from "./context/DashboardContextProvider";
import Form from "./Form";
import Input from "./Input";
import MemberCard from "./MemberCard";
import { Box } from "./ui/box";
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from "./ui/button";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { Icon } from "./ui/icon";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

const { createGroupMember } = supabase.groups;
const { groupMembersSchema, usersSchema } = zodSchemas;

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
  const {subscriptions, user} = useDashboardContext()
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
    <VStack space="md" className=" border-y border-primary-100/20 py-4 gap-6">
      <HStack className=" items-center justify-between px-4 w-full">
        <HStack space="md" className="items-center ">
          <Icon as={Users} className="text-primary-100"/>
        <Heading className="text-center text-primary-100 capitalize ">
          {group.name}
        </Heading>
        </HStack>
        {manage && (
          <HStack space="md">
            <Button variant="outline" size="xs" onPress={editFunc} className="rounded-full p-4!">
              <ButtonIcon as={Pen} />
            </Button>
            <Button
              action="negative"
              variant="outline"
              size="xs"
              className="rounded-full p-4!"
              onPress={deleteFunc}
            >
              <ButtonIcon as={Trash} />
            </Button>
          </HStack>
        )}
      </HStack>
      {expired && (
        <Animated.View entering={SlideInRight.springify().delay(2000)}>
            <HStack className=" justify-end items-center" space="lg">
              <Text className=" text-error-500 text-nowrap" italic size="sm"   >
                {t("subscriptionExpired")}
              </Text>
            
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
                <ButtonIcon as={DollarSign} />
                <ButtonText>{t("paySubscription")}</ButtonText>
              </Button>
            </HStack>
          </Animated.View>
      )}
      {
        manage && subscription && user?.id === group.admin_id
        && (
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
        )
      }
      <HStack space="md" className=" items-center px-4">
        <Icon as={List} className=" text-typography-400 w-4 h-4" />
        <Heading className=" text-typography-400 leading-none">{t("membersLabel")}</Heading>
        {manage && (
          <Heading className=" text-typography-400 leading-none" size="xs">{`(${members.length}/${
            (subscription?.maximumSubAccounts
              ? subscription?.maximumSubAccounts
              : 0) + 1
          })`}</Heading>
        )}
      </HStack>
      {members.map((member) => (
        <MemberCard
          key={member.id}
          user={member.member_id!}
          role={member.role}
          manage={manage}
        />
      ))}

      {subscription &&
        members.length === subscription.maximumSubAccounts - 1 && (
          <Box className=" gap-4">
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

      
    </VStack>
  );
};

export default GroupMembersList;
