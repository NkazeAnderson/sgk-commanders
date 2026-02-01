import {
  Avatar,
  AvatarFallbackText,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  ArrowUpCircle,
  CircleArrowRight,
  CircleCheck,
  ImageIcon,
  Trash2,
} from "lucide-react-native";

import { useDashboardContext } from "@/components/context/DashboardContextProvider";
import Form from "@/components/Form";
import Gradient from "@/components/Gradient";
import MapAvatar from "@/components/MapAvatar";
import { Box } from "@/components/ui/box";
import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Modal } from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { primaryColors } from "@/constants";
import useToast from "@/hooks/useToast";
import {
  getGoogleMapsDirectionURL,
  getImageFromGallery,
  unknownErrorHandler
} from "@/utils";
import { uploadBase64ImageToSupabase } from "@/utils/supabasePictures";
import { ImagePickerAsset } from "expo-image-picker";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronUp, Send, X } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Pressable, ScrollView, useWindowDimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";
import { sosT, supabase, withoutIdT } from "sgk-commanders-shared";
import { mockLocationBonaberi } from "sgk-commanders-shared/dist/constants";
import { updateUser } from "sgk-commanders-shared/dist/supabase/users";

const { addMessageToSOS, createSOS, resolveSOS } = supabase.sos;
const SOS = () => {
  const rippleScale = useSharedValue(1);
  const { t } = useTranslation("sos");
  const rippleOpacity = useSharedValue(0.5);
  const avatarTranslation = useSharedValue(0);
  const [message, setMessage] = useState("");
  const [showSendReport, setShowSendReport] = useState(false);
  const sosRef = useRef<View>(null);
  const [sendingSOS, setSendingSOS] = useState(false);
  const [newSOSId, setNewSOSId] = useState("");
  const avatarRef = useRef<View>(null);
  const [reportMessage, setReportMessage] = useState("");
  const [reportImages, setReportImages] = useState<ImagePickerAsset[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const  {height} = useWindowDimensions()
 const {
    sosMethods: { sos, sosResponses, activeSos, activeResponses },
    locationMethods:{userLocation}, user
  } = useDashboardContext();

  const toast = useToast();
  const sliderY = useSharedValue(0);
  const bounce = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: sliderY.value
        },
      ],
    };
  });
  useEffect(() => {
    if (userIsSafe && avatarTranslation.value) {
      avatarTranslation.value = withTiming(0, { duration: 500 });
    }
  }, [user]);

  const animatedRippleStyle = useAnimatedStyle(() => ({
    position: "absolute",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    borderRadius: 9999,
    backgroundColor: userIsSafe
      ? primaryColors["--color-primary-500"]
      : "red",
    // Tailwind primary-400
    opacity: rippleOpacity.value,
    transform: [
      {
        scale: rippleScale.value,
      },
    ],
    zIndex: 0,
  }));
  const animatedAvatarPosition = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: avatarTranslation.value,
      },
    ],
  }));

  useEffect(() => {
    sliderY.value = withRepeat(
      withTiming(150, {
        duration: 2000,
        easing: Easing.out(Easing.ease),
      }),
      -1,
      true
    );
    rippleScale.value = withRepeat(
      withTiming(2.5, {
        duration: 2000,
        easing: Easing.out(Easing.ease),
      }),
      -1,
      false
    );
    rippleOpacity.value = withRepeat(
      withTiming(0, {
        duration: 2000,
        easing: Easing.out(Easing.ease),
      }),
      -1,
      false
    );
  }, []);

  const userIsSafe = activeSos?.resolved !== false;
  
  const avatarPanGesture = Gesture.Pan()
    .onUpdate((e) => {
      avatarTranslation.value = e.translationY;
      
    })
    .onEnd((e) => {
      if (e.absoluteY < height/2) {
        scheduleOnRN(sendSOS);
      } else {
        avatarTranslation.value = withTiming(0, {
          duration: 2000,
          easing: Easing.bounce,
        });
      }
    });

  avatarPanGesture.enabled(userIsSafe ?? true);

  async function sendSOS() {
    try {
      if (!user) throw new Error("User required");
      setSendingSOS(true);
      const sos: withoutIdT<sosT> = {
        location: __DEV__ ? mockLocationBonaberi  : {
          longitude: userLocation?.longitude! ,
          latitude: userLocation?.latitude! 
        },  // location.coords,
        sent_by: user?.id!,
      };
      const res = await createSOS(sos);
       updateUser({
                id: user.id,
                last_known_location: mockLocationBonaberi,
              })
      setNewSOSId(res.id);
      toast.show({message:"SOS Sent Successfully", status:"success"});
    } catch (error) {
      avatarTranslation.value = withTiming(0, {
          duration: 2000,
          easing: Easing.bounce,
        });           
        toast.show({message:"Failed to send SOS, please try again", status:"error"});
     
        unknownErrorHandler(error);
    }
    setSendingSOS(false);
  }
  async function addImages() {
    const image = await getImageFromGallery();
    image && setReportImages((prev) => [image, ...prev]);
  }

  function removeImages(image: ImagePickerAsset) {
    setReportImages((prev) => prev.filter((item) => item.uri !== image.uri));
  }

  async function sendReport() {
    try {
       if (!user) {
      throw new Error("User required");
    }
    setSubmitting(true);
    console.log({activeResponses});
    
    const activeSosResponse = activeResponses.find((item) => item.response_by.id === user?.id );

    const imagesUrl: string[] = [];
    for (let image of reportImages) {
      const url = await uploadBase64ImageToSupabase(image, user.id);
      console.log(url);
      imagesUrl.push(url);
    }

    if (!activeSosResponse) {
      setSubmitting(false);
      throw new Error("activeSosResponse Required");
    }
    const res = await resolveSOS({
      ...activeSosResponse,
      description: reportMessage,
      images: imagesUrl,
    }, activeSos!.id);
    setSubmitting(false);
    if (!res.some((item) => item.error)) {
      setReportMessage("");
      setReportImages([]);
      setShowSendReport(false);
    } else {
      console.log(res);
    }
    } catch (error) {
      unknownErrorHandler(error);
      setSubmitting(false);
      toast.show({message:"Failed to send report, please try again", status:"error"});
    }
   
  }

  if (user?.is_agent) {
    if (!activeSos) {
      return (
        <View className="flex flex-1  bg-primary-950 px-4">
          <Center className="flex-1 items-center justify-center gap-5">
            {/* <Box className=" w-10 aspect-square rounded-full flex justify-center items-center">

          </Box> */}
            <Icon className=" text-success-500 w-10 h-10" as={CircleCheck} />
            <Text>{t("noactiveSosMission")}</Text>
          </Center>
        </View>
      );
    }
    return (
      <View className="flex flex-1  bg-primary-950 px-4">
        <SafeAreaView className="flex-1 gap-4">
          <Heading size="xl" className=" text-primary-200 text-center py-4">
            {t("currentSOSMission")}
          </Heading>
          <ScrollView className=" gap-4">
            <Center className="gap-4">
              <Avatar size={"2xl"}>
                <AvatarFallbackText>{activeSos.sent_by.name}</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: activeSos.sent_by.profile_picture ?? "",
                  }}
                />
              </Avatar>
              <Heading className=" capitalize my-2 text-typography-0">
                {activeSos.sent_by.name}
              </Heading>
            </Center>
            {Boolean(activeSos.message) && (
              <Box>
                <Heading className=" text-primary-50">{t("message")}</Heading>
                <Text className=" text-typography-0">{activeSos.message}</Text>
              </Box>
            )}

            {!showSendReport ? (
              <HStack className="py-4 " space="lg">
                <Button
                  className=" flex-1"
                  onPress={() => {
                    if (userLocation && activeSos) {
                      const url = getGoogleMapsDirectionURL(
                        userLocation,
                        activeSos.location
                      );
                      router.navigate(url);
                    }
                  }}
                >
                  <ButtonText>{t("go")}</ButtonText>
                  <ButtonIcon as={CircleArrowRight} />
                </Button>
                <Button
                  action="positive"
                  onPress={() => {
                    setShowSendReport(true);
                  }}
                >
                  <ButtonText>{t("markAsResolved")}</ButtonText>
                  <ButtonIcon as={CircleCheck} />
                </Button>
              </HStack>
            ) : (
              <Animated.View entering={SlideInDown} exiting={SlideOutDown}>
                <Center>
                  <Button
                    action="negative"
                    onPress={() => {
                      setShowSendReport(false);
                    }}
                    className=" aspect-square rounded-full"
                  >
                    <ButtonIcon as={X} />
                  </Button>
                </Center>
                <Heading className=" text-primary-50 my-2">
                  {t("report")}
                </Heading>
                <Form space="lg">
                  <Textarea className=" text-typography-0">
                    <TextareaInput
                      value={reportMessage}
                      onChangeText={(text) => {
                        setReportMessage(text);
                      }}
                      placeholder={t("reportMessagePlaceholder")}
                      className=" text-typography-0"
                      selectionColor={"white"}
                      style={{ color: "white" }}
                    />
                  </Textarea>

                  {reportImages.map((item, index) => (
                    <Box className="w-full relative aspect-square" key={index}>
                      <Image
                        className="w-full h-full border  rounded-xl"
                        source={{ uri: item.uri }}
                        alt="incident images"
                      />
                      <Button
                        action="negative"
                        className=" absolute bottom-4 right-4"
                        onPress={() => {
                          removeImages(item);
                        }}
                      >
                        <ButtonIcon as={Trash2} />
                      </Button>
                    </Box>
                  ))}

                  <Box className="pr-[30%]">
                    <Button variant="outline" onPress={addImages}>
                      <ButtonText>{t("addImage")}</ButtonText>
                      <ButtonIcon as={ImageIcon} />
                    </Button>
                  </Box>

                  <Box className=" my-4">
                    <Button onPress={sendReport}>
                      <ButtonText>{t("uploadReport")}</ButtonText>
                      {submitting ? (
                        <ButtonSpinner />
                      ) : (
                        <ButtonIcon as={ArrowUpCircle} />
                      )}
                    </Button>
                  </Box>
                </Form>
              </Animated.View>
            )}
            {
              activeResponses.length >1 &&  
            <Box className="gap-4">
            <Heading className=" text-primary-50">Other Agents on this case</Heading>
            <AvatarGroup className="self-start">
                <Avatar size={"md"} className="mx-1 bg-transparent" >
                    <AvatarImage
                      source={require("../../assets/images/logo.png")}
                    /> </Avatar>
              {
              activeResponses.map((response, index) => (
                  <Avatar key={index} size={"md"} className="mx-1 bg-primary-900" >
                    <AvatarImage
                      source={{
                        uri: response.response_by.profile_picture ?? "",
                      }}
                    />
                    <AvatarFallbackText className=" bg-primary-900">
                      {response.response_by.name.charAt(0)}
                    </AvatarFallbackText>
                  </Avatar>
                ))}
            </AvatarGroup>
            </Box>
            }

          </ScrollView>
        </SafeAreaView>
        <StatusBar style="light" />
      </View>
    );
  }
  return (
    <>
      <View className="flex flex-1 bg-primary-950 px-4">
        <SafeAreaView className="flex-1 justify-between">
          <Center>
            <View ref={sosRef} className="w-1/2 aspect-square relative">
              <Animated.View style={animatedRippleStyle}></Animated.View>
              <Center
                className={`w-full h-full ${
                  userIsSafe
                    ? "bg-primary-600 border-primary-400"
                    : "bg-error-200 border-error-50"
                }  border-4  rounded-full`}
              >
                {userIsSafe ? (
                  <Heading size="xl" className=" text-typography-300">
                    {sendingSOS ? t("sendSOS") : t("heading")}
                  </Heading>
                ) : (
                  <MapAvatar
                    user={user!}
                    safe={userIsSafe ?? undefined}
                    size="lg"
                  />
                )}
              </Center>
            </View>
          </Center>
          {userIsSafe ? (
            <Center>
              <Animated.View style={bounce}>
                <Icon
                  className="text-typography-400 w-10 h-10"
                  as={ChevronUp}
                />
                <Icon
                  className="text-typography-400 w-10 h-10"
                  as={ChevronUp}
                />
                <Icon
                  className="text-typography-400 w-10 h-10"
                  as={ChevronUp}
                />
              </Animated.View>
            </Center>
          )
           : !!activeSos?.message?.length ? <Text className="text-typography-100 text-center">{activeSos.message}</Text> 
           : null}

          <Center className="pb-20 gap-2">
           
            {!userIsSafe ? (
              <>
              <Heading className=" text-success-600">
                {t("helpOnTheWay")}
              </Heading>
               <AvatarGroup >
                <Avatar size={"md"} className="mx-1 bg-transparent" >
                    <AvatarImage
                      source={require("../../assets/images/logo.png")}
                    /> </Avatar>
              {
                activeResponses.map((response, index) => (
                  <Avatar key={index} size={"md"} className="mx-1 bg-primary-900" >
                    <AvatarImage
                      source={{
                        uri: response.response_by.profile_picture ?? "",
                      }}
                    />
                    <AvatarFallbackText className=" bg-primary-900">
                      {response.response_by.name.charAt(0)}
                    </AvatarFallbackText>
                  </Avatar>
                ))}
            </AvatarGroup>
              </>
            ) : (
              <>
                <GestureDetector gesture={avatarPanGesture}>
                  <Animated.View style={animatedAvatarPosition}>
                  <Box
                      ref={avatarRef}
                      className={`${
                        userIsSafe !== true && "animate-pulse"
                      }  `}
                    >
                      <MapAvatar
                        user={user!}
                        safe={userIsSafe ?? undefined}
                        size="lg"
                      />
                    </Box> 
                  </Animated.View>
                </GestureDetector>
                <Heading className=" text-typography-100">
                  {t("slideIntoSOSMode")}
                </Heading>
              </>
            )}
          </Center>
        </SafeAreaView>
      </View>


      <Modal isOpen={newSOSId ? true : false}>
        <Pressable
          onPress={() => {
            Keyboard.dismiss();
          }}
          className="flex-1 bg-primary-600/90 w-full justify-center items-center relative"
        >
          <Button
            className=" absolute top-16 right-10 aspect-square rounded-full bg-primary-700"
            variant="outline"
            action="secondary"
            onPress={() => {
              Keyboard.dismiss();
              setNewSOSId("");
            }}
          >
            <ButtonIcon className="text-white" as={X} />
          </Button>
          <Form className="w-3/4">
            <Textarea className=" bg-primary-950 rounded-lg border-primary-500 ">
              <TextareaInput
                placeholder={t("addMessageToSOSNotification")}
                className="!text-typography-100 "
                onChangeText={(text) => {
                  setMessage(text);
                }}
              />
            </Textarea>

            <Gradient>
              <Button
                className="bg-transparent"
                onPress={() => {
                  if (newSOSId && message) {
                    addMessageToSOS({
                      id: newSOSId,
                      message,
                    }).then((res) => {
                      setNewSOSId("");
                      setMessage("");
                    });
                  }
                }}
              >
                <ButtonText>{t("sendMessage")}</ButtonText>
                <ButtonIcon as={Send} />
              </Button>
            </Gradient>
          </Form>
        </Pressable>
      </Modal>
    </>
  );
};
export default SOS;
