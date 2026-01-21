import { CloseIcon, Icon } from "@/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";

import { useDashboardContext } from "@/components/context/DashboardContextProvider";
import GroupMembersList from "@/components/GroupMembersList";
import Logo from "@/components/Logo";
import MapBox from "@/components/MapBox";
import SOSCard from "@/components/SOSCard";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { commonAsyncKey } from "@/constants";
import useToast from "@/hooks/useToast";
import {
  deleteFromAsycStore,
  getFromAsycStore
} from "@/utils";
import { Link, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Bell,
  MessageCircle,
  Users
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  useWindowDimensions,
  View
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { groupInvitationDataT, supabase } from "sgk-commanders-shared";

const { updateGroupInviteStatus } = supabase.groups;
const { addSOSResponse } = supabase.sos;
const Home = () => {
  const [lastGroupInvitation, setLastGroupInvitation] =
    useState<groupInvitationDataT>();
  const [showDrawer, setshowDrawer] = useState(true);
  const { t } = useTranslation("home");
  const { height: windowsHeight } = useWindowDimensions();
  const {
    groupsMethods:{myGroups},
    sosMethods: { sos, activeSos, activeResponses },
    messagesMethods: { messages },
    locationMethods:{userLocation}, user
  } = useDashboardContext();

  const height = useSharedValue(windowsHeight / 4);
  const [submitting, setSubmitting] = useState(false);
  const animatedSliderStyles = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });
  
  const toast = useToast();
    
  
  useEffect(() => {
    getFromAsycStore(commonAsyncKey.groupInvitation).then((res) => {
      res && setLastGroupInvitation(JSON.parse(res));
    });
  }, []);

  const panGesture = Gesture.Pan()
  .onBegin((e) => {})
  .onUpdate(({ absoluteY }) => {
    height.value = withSpring(
      absoluteY >= windowsHeight - 150
      ? 150
      : absoluteY <= 200
      ? windowsHeight - 200
      : windowsHeight - absoluteY,
      {
        mass: 1,
      }
    );
  });
  

  const groupsKeys = !myGroups ? [] : Object.keys(myGroups);
  const unreadMessages = messages.filter((item) => item.unread);
  

  

  async function updateGroupInvitationStatus(status: boolean) {
    setSubmitting(true);
    if (user?.phone.toString() === lastGroupInvitation?.phone.toString()) {
      const res = await updateGroupInviteStatus(
        user?.id!,
        lastGroupInvitation?.membership_id!,
        status
      );
      console.log(res);

      !res.error && toast.show({ message: "Invited group invitation" });
    } else {
      toast.show({
        message: "Account not linked to expected phone number",
        status: "error",
      });
    }
    setSubmitting(false);
    deleteFromAsycStore(commonAsyncKey.groupInvitation);
  }

  return (
    <>
      <Box className=" flex-1 relative bg-primary-950">
        <View className=" flex-1 border relative">
         <MapBox />
        </View>
        <View className=" absolute top-12  w-full px-4">
          <HStack space="lg" className=" justify-between items-center w-full">
            <Logo size="sm"/>
          <HStack space="lg" className=" justify-end items-center">
            <Link href={"/stacks/messages"} asChild>
              <Button
                size="lg"
                className=" bg-primary-950 rounded-full aspect-square relative"
              >
                <ButtonIcon as={MessageCircle} />
                {Boolean(unreadMessages.length) && (
                  <Box className="absolute -right-1 top-0 aspect-square w-3 rounded-full p-0.5 bg-error-700">
                    <Text
                      size="xs"
                      className="text-white leading-none text-center"
                    >
                      {unreadMessages.length}
                    </Text>
                  </Box>
                )}
              </Button>
            </Link>
            <Link href={"/stacks/notifications"} asChild>
              <Button
                size="lg"
                className=" bg-primary-950 rounded-full aspect-square"
              >
                <ButtonIcon as={Bell} />
              </Button>
            </Link>
          </HStack>
          </HStack>
        </View>
        <View className=" w-full bg-primary-950  border-0  absolute bottom-0 rounded-t-3xl">
          <GestureDetector gesture={panGesture}>
            <View className="px-4 bg-primary-950 py-4 rounded-t-3xl">
              <VStack space="md" className=" items-center w-full">
                <Center>
                  <Divider className="w-20 p-1 rounded-full" />
                </Center>

                <Heading className="text-typography-100">
                  {t("welcome")}
                </Heading>
                <Heading className=" text-primary-500 capitalize text-center">
                      {user?.name}
                </Heading>
              </VStack>
            </View>
          </GestureDetector>
          <Animated.View
            className="bg-primary-900/10 "
            style={animatedSliderStyles}
          >
            <Heading size="md" className=" text-typography-100 p-2 capitalize">
              {user?.is_agent
                ? t("sosList")
                : Boolean(groupsKeys.length)
                ? t("groupsAndMembers")
                : ""}
            </Heading>
            <ScrollView
              showsVerticalScrollIndicator={false}
              className=" flex-1 py-4"
            >
              {
                !user.is_agent ? <ClientPanel /> :<AgentPanel />
              }
          
            </ScrollView>
          </Animated.View>
        </View>
        <StatusBar style="dark" />
      </Box>

      <Modal
        isOpen={!!lastGroupInvitation}
        onClose={() => {
          setLastGroupInvitation(undefined);
        }}
      >
        <ModalBackdrop />
        <ModalContent className=" bg-primary-900">
          <ModalHeader>
            <Heading size="lg" className="text-primary-500">
              Group Invitation
            </Heading>
            <ModalCloseButton>
              <Icon className="text-typography-50" as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text className=" text-typography-50">
              You have been invited to join a group
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              action="negative"
              className="mr-3"
              onPress={async () => {
                await updateGroupInvitationStatus(false);
                setLastGroupInvitation(undefined);
              }}
            >
              <ButtonText>Reject Invite</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              className="border-0"
              onPress={async () => {
                await updateGroupInvitationStatus(true);
                setLastGroupInvitation(undefined);
              }}
            >
              <ButtonText>Accept Invite</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Tabs.Screen
        options={{
          title: t("dashboard"),
        }}
      />
    </>
  );
};
export default Home;

function ClientPanel() {
  const {groupsMethods:{myGroups}} = useDashboardContext()
  const groupsKeys = !myGroups ? [] : Object.keys(myGroups);
  const { t } = useTranslation("home");

  return  <>
    {
    groupsKeys.length ?  groupsKeys.map((item) => {
        const members = myGroups[item];
        return <GroupMembersList key={item} members={members} />;
      }):
          <Center className=" gap-4">
                  
                  <Link href={"/stacks/members"} asChild>
                    <Button>
                      <ButtonIcon as={Users} />
                      <ButtonText>{t("addFamilyMembers")}</ButtonText>
                    </Button>
                  </Link>
                </Center>
    }
  </>
}

function AgentPanel() {
  const {sosMethods:{sos,activeSos}} = useDashboardContext()
  const { t } = useTranslation("home");
  const availableSOS = sos.filter((item) => {
    if (activeSos) {
      return activeSos.id === item.id;
    }
    return !item.resolved;
  });



  return  <>
    {
      availableSOS ?  availableSOS.map((item) => {
                    return (
                      <SOSCard sos={item} />
                    );
                  }): <Center className="flex-1">
                  <Text className="text-success-0">{t("noSOSPosted")}</Text>
                </Center>
}
              
  </>
}