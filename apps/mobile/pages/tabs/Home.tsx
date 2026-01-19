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

import { useAppContext } from "@/components/context/AppContextProvider";
import GroupMembersList from "@/components/GroupMembersList";
import Logo from "@/components/Logo";
import MapAvatar from "@/components/MapAvatar";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
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
  getFromAsycStore,
  getGoogleMapsDirectionURL,
} from "@/utils";
import { Link, router, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Bell,
  Car,
  MapPin,
  MessageCircle,
  Siren,
  Users
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Platform,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import MapView, {
  MapCallout,
  MapMarker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { groupInvitationDataT, sosResponseT, supabase, withoutIdT } from "sgk-commanders-shared";
import { joinedSOSSchemaT } from "sgk-commanders-shared/dist/supabase/sos";

const { updateGroupInviteStatus } = supabase.groups;
const { addSOSResponse } = supabase.sos;
const Home = () => {
  const [lastGroupInvitation, setLastGroupInvitation] =
    useState<groupInvitationDataT>();
  const [showDrawer, setshowDrawer] = useState(true);
  const { t } = useTranslation("home");
  const { height: windowsHeight } = useWindowDimensions();
  const {
    userMethods: { userLocation, user, myGroups, setUserLocation },
    sosMethods: { sos, sosResponses },
    messagesMethods: { messages },
  } = useAppContext();



  const mapRef = useRef<MapView>(null);
  const markerRef = useRef<MapMarker>(null);
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

  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          ...userLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        2000
      );
    }
  }, [userLocation]);
  const activeSos = user?.is_agent ? sosResponses.find((item=>!item.sos.resolved && item.response_by.id === user.id))?.sos : undefined;
  const activeResponses = sosResponses.filter((item)=> item.sos.id === activeSos?.id)
  useEffect(() => {
    if (activeSos && userLocation && mapRef.current) {
      // Fit both user location and active SOS into visible map area
      mapRef.current.fitToCoordinates(
        [userLocation, activeSos.location, ...activeResponses.map((item)=>item.response_by.last_known_location)].filter(item => item !== null && item !== undefined).flat(),
        {
          edgePadding: {
            top: 150,
            right: 100,
            bottom: 300,
            left: 100,
          },
          animated: true,
        }
      );
      markerRef.current && markerRef.current.forceUpdate();
    }
  }, [activeSos]);

  if (!user) {
    return null;
  }
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
  const availableSOS = sos.filter((item) => {
    if (activeSos) {
      return activeSos.id === item.id;
    }
    return !item.resolved;
  });

  async function interveneSOS(
    sosResponse: withoutIdT<sosResponseT>,
    sos: joinedSOSSchemaT
  ) {
    setSubmitting(true);
    const res = await addSOSResponse(sosResponse);
    setSubmitting(false);
  }

  async function updateGroupInvitationStatus(status: boolean) {
    setSubmitting(true);
    if (user?.phone == lastGroupInvitation?.phone) {
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
          <MapView
            style={{
              width: "100%",
              height: "100%",
            }}
            ref={mapRef}
            showsBuildings
            provider={PROVIDER_GOOGLE}
          >
            {userLocation && (
              <MapMarker
                ref={markerRef}
                coordinate={
                  userLocation ?? {
                    latitude: 3.844119,
                    longitude: 11.501346,
                  }
                }
              >
                <MapAvatar
                  user={user!}
                  safe={user?.is_safe ?? undefined}
                  size={Platform.OS === "android" ? "sm" : "lg"}
                />
                {user?.is_safe === false && (
                  <MapCallout>
                    <Text size="sm" className="text-red-600 z-50">
                      {t("notSafe")}
                    </Text>
                  </MapCallout>
                )}
              </MapMarker>
            )}
            {activeSos && (
              <>
              <MapMarker
                ref={markerRef}
                coordinate={
                  activeSos?.location
                }
              >
                <>
                  <MapAvatar
                    user={activeSos.sent_by}
                    safe={activeSos.resolved ?? undefined}
                    size={Platform.OS === "android" ? "sm" : "lg"}
                  />
                </>
              </MapMarker>
              <MapViewDirections
                origin={userLocation}
                destination={activeSos?.location}
                apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_KEY!}
                strokeWidth={3}
                strokeColor={"#567fee"}
              />
              </>
            )}
            {
              activeResponses.map((item)=>{
                if (!item.response_by.last_known_location) return null;
              return <MapMarker key={item.id} coordinate={item.response_by.last_known_location}><MapAvatar user={item.response_by} size={Platform.OS === "android" ? "sm" : "lg"} /></MapMarker>}) 
            }
          </MapView>
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
              {Boolean(groupsKeys.length) && myGroups && !user?.is_agent && (
                <ScrollView>
                  {groupsKeys.map((item) => {
                    const members = myGroups[item];
                    return <GroupMembersList key={item} members={members} />;
                  })}
                </ScrollView>
              )}
              {!Boolean(groupsKeys.length) && !user?.is_agent && (
                <Center className=" gap-4">
                  <Box className=" w-full">
                    <Heading className=" text-primary-500 capitalize text-center">
                      {user?.name}
                    </Heading>
                  </Box>
                  <Link href={"/stacks/members"} asChild>
                    <Button>
                      <ButtonIcon as={Users} />
                      <ButtonText>{t("addFamilyMembers")}</ButtonText>
                    </Button>
                  </Link>
                </Center>
              )}
              {user?.is_agent && Boolean(availableSOS.length) && (
                <ScrollView>
                  {availableSOS.map((item) => {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                          router.push("/tabs/sos");
                        }}
                      >
                        <HStack space="sm" className=" items-center p-2">
                          <Avatar>
                            <AvatarFallbackText>
                              {item.sent_by.name}
                            </AvatarFallbackText>
                            <AvatarImage
                              source={{
                                uri: item.sent_by.profile_picture ?? "/",
                              }}
                            />
                          </Avatar>
                          <Box className="flex-grow">
                            <Heading className=" text-typography-100 capitalize">
                              {item.sent_by.name}
                            </Heading>
                            <Text size="sm">{item.message}</Text>
                          </Box>
                          <HStack space="sm">
                            <Button
                              action={
                                activeSos && activeSos.id === item.id
                                  ? "positive"
                                  : "primary"
                              }
                              onPress={(e) => {
                                e.stopPropagation();
                                !activeSos
                                  ? interveneSOS(
                                      {
                                        sos: item.id!,
                                        response_by: user.id!,
                                      },
                                      item
                                    )
                                  : userLocation
                                  ? router.navigate(
                                      getGoogleMapsDirectionURL(
                                        userLocation,
                                        activeSos.location
                                      )
                                    )
                                  : null;
                              }}
                            >
                              <ButtonIcon
                                as={activeSos ? Car : Siren}
                              />
                              {
                                activeSos && 
                              <ButtonIcon
                                as={ MapPin }
                              />
                              }
                            </Button>
                          </HStack>
                        </HStack>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}

              {user?.is_agent && !Boolean(availableSOS.length) && (
                <Center className="flex-1">
                  <Text className="text-success-0">{t("noSOSPosted")}</Text>
                </Center>
              )}
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
