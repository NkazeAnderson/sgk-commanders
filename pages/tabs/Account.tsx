import { ButtonText } from "@/components/ui/button";
import { CloseIcon } from "@/components/ui/icon";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";

import { useAppContext } from "@/components/context/AppContextProvider";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { supabase } from "@/supabase";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ChevronRight,
  CircleUserRound,
  Copy,
  DollarSign,
  FileText,
  LogOut,
  MessageCircleQuestion,
  Users,
} from "lucide-react-native";
import React, { useState } from "react";
import { Share, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Account = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    userMethods: { user },
  } = useAppContext();
  const [loggingOut, setLoggingOut] = useState(false);
  function logOut() {
    setLoggingOut(true);
    supabase.auth.signOut().then(() => {
      setLoggingOut(false);
    });
  }
  return (
    <>
      <Box className="flex-1 bg-primary-950">
        <SafeAreaView className="px-4">
          <HStack space="md" className=" items-center">
            <Avatar size={"lg"}>
              <AvatarFallbackText>{user?.name}</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: user?.profile_picture ?? undefined,
                }}
              />
              {<AvatarBadge />}
            </Avatar>
            <Box className="flex-1">
              <Heading className="capitalize text-typography-300">
                {user?.name}
              </Heading>

              <HStack space="md" className=" items-center">
                <Text className="text-typography-400">{`${
                  user?.id.split("-")[0]
                }...`}</Text>
                <Button
                  variant="link"
                  onPress={() => {
                    Share.share({
                      message: user?.id!,
                      title: "SGK ID",
                    });
                  }}
                >
                  <ButtonIcon as={Copy} />
                </Button>
                <Box className=" flex-1 ">
                  <HStack className=" justify-end">
                    <Text
                      className=" text-primary-200 italic text-end"
                      size="sm"
                    >
                      {user?.is_agent ? "Agent account" : "Client account"}
                    </Text>
                  </HStack>
                </Box>
              </HStack>
            </Box>
          </HStack>
          <Divider className="my-4" />
          <VStack>
            <Link href={"/stacks/profile"} asChild>
              <TouchableOpacity>
                <HStack
                  space="md"
                  className=" items-center justify-between py-4"
                >
                  <HStack space="xl" className="items-center ">
                    <Icon
                      className="text-primary-600 w-8 h-8"
                      as={CircleUserRound}
                    />
                    <Text
                      size="lg"
                      className="text-typography-100 font-medium "
                    >
                      Profile
                    </Text>
                  </HStack>
                  <Icon className="text-typography-400" as={ChevronRight} />
                </HStack>
              </TouchableOpacity>
            </Link>
            {!user?.is_agent && (
              <>
                <Link href={"/stacks/members"} asChild>
                  <TouchableOpacity>
                    <HStack
                      space="md"
                      className=" items-center justify-between py-4"
                    >
                      <HStack space="xl" className="items-center ">
                        <Icon className="text-primary-600 w-8 h-8" as={Users} />
                        <Text
                          size="lg"
                          className="text-typography-100 font-medium "
                        >
                          Groups & Families
                        </Text>
                      </HStack>
                      <Icon className="text-typography-400" as={ChevronRight} />
                    </HStack>
                  </TouchableOpacity>
                </Link>
                <Link href={"/stacks/subscriptions"} asChild>
                  <TouchableOpacity>
                    <HStack
                      space="md"
                      className=" items-center justify-between py-4"
                    >
                      <HStack space="xl" className="items-center ">
                        <Icon
                          className="text-primary-600 w-8 h-8"
                          as={DollarSign}
                        />
                        <Text
                          size="lg"
                          className="text-typography-100 font-medium "
                        >
                          Subscriptions
                        </Text>
                      </HStack>
                      <Icon className="text-typography-400" as={ChevronRight} />
                    </HStack>
                  </TouchableOpacity>
                </Link>
                <Link href={"/stacks/payment-history"} asChild>
                  <TouchableOpacity>
                    <HStack
                      space="md"
                      className=" items-center justify-between py-4"
                    >
                      <HStack space="xl" className="items-center ">
                        <Icon
                          className="text-primary-600 w-8 h-8"
                          as={FileText}
                        />
                        <Text
                          size="lg"
                          className="text-typography-100 font-medium "
                        >
                          Payment history
                        </Text>
                      </HStack>
                      <Icon className="text-typography-400" as={ChevronRight} />
                    </HStack>
                  </TouchableOpacity>
                </Link>
                <Link href={"/stacks/messages"} asChild>
                  <TouchableOpacity>
                    <HStack
                      space="md"
                      className=" items-center justify-between py-4"
                    >
                      <HStack space="xl" className="items-center ">
                        <Icon
                          className="text-primary-600 w-8 h-8"
                          as={MessageCircleQuestion}
                        />
                        <Text
                          size="lg"
                          className="text-typography-100 font-medium "
                        >
                          Contact Support
                        </Text>
                      </HStack>
                      <Icon className="text-typography-400" as={ChevronRight} />
                    </HStack>
                  </TouchableOpacity>
                </Link>
              </>
            )}

            <TouchableOpacity
              onPress={() => {
                setShowModal(true);
              }}
            >
              <HStack space="md" className=" items-center justify-between py-4">
                <HStack space="xl" className="items-center ">
                  <Icon className="text-primary-600 w-8 h-8" as={LogOut} />
                  <Text size="lg" className="text-typography-100 font-medium ">
                    {loggingOut ? "Signing Out..." : "Sign Out"}
                  </Text>
                </HStack>
                <Icon className="text-typography-400" as={ChevronRight} />
              </HStack>
            </TouchableOpacity>
          </VStack>
        </SafeAreaView>
      </Box>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ModalBackdrop />
        <ModalContent className=" bg-error-100 bo">
          <ModalHeader>
            <Heading size="lg">Sign Out</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text className=" text-typography-900">
              You are about to sign out from SGK Commanders. You won't be able
              to get real time security updates anymore. Are you sure you want
              to proceed?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              action="primary"
              className="mr-3"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="negative"
              className="border-0"
              onPress={logOut}
            >
              <ButtonText>Sign Out</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <StatusBar style="light" />
    </>
  );
};
export default Account;
