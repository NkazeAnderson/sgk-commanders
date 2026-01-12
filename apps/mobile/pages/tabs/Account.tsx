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
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
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
import { useTranslation } from "react-i18next";
import { Share, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase as sharedSupabase } from "sgk-commanders-shared";
const supabase = sharedSupabase.supabase
const Account = () => {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation("account");
  const {
    userMethods: { user },
    languagesMethods: { language, setLanguage },
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
          <Button
            onPress={async () => {
              await supabase.functions.invoke("sos", {
                body: { action: "Create" },
              });
            }}
          >
            <ButtonText>SOS Test</ButtonText>
          </Button>
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
          <Box>
            <HStack className=" items-start justify-end" space="lg">
              <Heading className=" text-primary-200" size="xs">
                {t("language")}:
              </Heading>
              <TouchableOpacity
                onPress={() => {
                  setLanguage("en");
                }}
              >
                <Image
                  size="xs"
                  source={require("@/assets/images/uk.png")}
                  alt="english flag"
                  className=" rounded-full w-8 h-8"
                />
                <Text
                  className=" text-primary-50 text-center leading-none"
                  size="sm"
                >
                  en
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setLanguage("fr");
                }}
              >
                <Image
                  size="xs"
                  source={require("@/assets/images/fr.png")}
                  alt="french flag"
                  className=" rounded-full w-8 h-8"
                />
                <Text
                  className=" text-primary-50 text-center leading-none"
                  size="sm"
                >
                  fr
                </Text>
              </TouchableOpacity>
            </HStack>
          </Box>
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
                      {t("profile")}
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
                          {t("groupsAndFamilies")}
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
                          {t("subscriptions")}
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
                          {t("paymentHistory")}
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
                          {t("contactSupport")}
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
                    {loggingOut ? t("logout") + "..." : t("logout")}
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
            <Heading size="lg">{t("logout")}</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text className=" text-typography-900">{t("signOutWarning")}</Text>
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
              <ButtonText>{t("cancel")}</ButtonText>
            </Button>
            <Button
              size="sm"
              action="negative"
              className="border-0"
              onPress={logOut}
            >
              <ButtonText>{t("signOut")}</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <StatusBar style="light" />
    </>
  );
};
export default Account;
