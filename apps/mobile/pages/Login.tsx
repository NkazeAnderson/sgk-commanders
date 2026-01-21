import Form from "@/components/Form";
import Gradient from "@/components/Gradient";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import { Box } from "@/components/ui/box";
import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import useToast from "@/hooks/useToast";
import { hookFormErrorHandler } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocalSearchParams } from "expo-router";
import { ArrowLeft, LogInIcon, Unlock } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TextInput } from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "sgk-commanders-shared";
import { usersSchema } from "sgk-commanders-shared/dist/zodSchema";
import { z } from "zod";

const steps = ["credential", "code"] as const;

const Login = () => {
  const { phone } = useLocalSearchParams<{ phone?: string }>();
  const { t } = useTranslation("login");
  const [code, setCode] = useState("");
  const [pending, setPending] = useState(false);
  const phoneForm = useForm({
    defaultValues: phone ? { phone: Number(phone) } : {},
    //@ts-expect-error
    resolver: zodResolver(usersSchema.pick({ phone: true })),
  });
  const codeForm = useForm({
    resolver: zodResolver(z.object({ code: z.number() })),
  });
  const [step, setStep] = useState<(typeof steps)[number]>(!phone ? "credential" : "code");
  const toast = useToast();
  //const code = codeForm.watch("code");
 

  useEffect(() => {
    if (code && String(code).length > 6) {
    setCode("");
    }
  }, [code]);

  function changeStep() {
    if (!phone) {
      phoneForm.handleSubmit(
        async (data) => {
          const res = await supabase.supabase.auth.signInWithOtp({
            phone: `237${data.phone}`,
            options: { channel: "sms" },
          });
          
          if (!res.error) {
            setStep("code");
          } else {
            toast.show({ message: res.error.message, status: "error" });
          }
        },
        (e) => {
          hookFormErrorHandler(e);
        }
      )();
    } else {
      // setStep(!step ? 1 : 0);
    }
  }

  async function confirmCode() {
    setPending(true);
    const res = await supabase.supabase.auth.verifyOtp({
      phone: `237${phoneForm.getValues("phone")}`,
      token: code,
      type: "sms",
    });
    if (res.error) {
      toast.show({ message: res.error.message, status: "error" });
    } else {
      toast.show({ message: "Successfully logged in" });
    }
    setPending(false);
  }

  return (
    <SafeAreaView className=" flex-1 relative bg-primary-950">
      <Box className=" w-screen h-1/3 absolute border">
      <Image
      source={require("@/assets/images/commando-login.jpg")}
      size="full"
      resizeMode="stretch"
      alt="Login cover image"
      />
      </Box>
        <Center className=" pt-10 pb-5">
          <Heading className="text-primary-500">SGK</Heading>
          <Logo />
        </Center>
        <Box className=" bg-primary-950 rounded-t-[50px]">

        
          <VStack className=" py-14" style={{gap:50}}>
           <Center className="">
          <VStack space="md" className=" items-center">
            <Heading size="2xl" className=" text-primary-100">
              {t("heading")}
            </Heading>
            <Box className=" w-1/4">
              <Divider className="bg-background-400 " />
            </Box>
          </VStack>
          </Center>

            <Form space="4xl" className="px-4">
            
            {
              step === "credential" ? 
              <Animated.View entering={SlideInRight}>
                <Input
              control={phoneForm.control}
              size="lg"
              name="phone"
              label={t("phoneLabel")}
              placeholder={t("phonePlaceholder")}
              labelClassName="text-typography-100"
              disabled={Boolean(phone)}
              keyboardType="number-pad"
              left={<Text className="text-primary-950" size="lg" >+237</Text>}
              errors={phoneForm.formState.errors}
              onSubmitEditing={changeStep}
            />
              </Animated.View>
            :
            <Animated.View entering={SlideInRight.delay(1000)}>
                  <Box className="relative ">
                <HStack space="md" className="px-[10%] ">
                  {Array(6).fill("").map((item, index) => (
                    <Box
                      key={index}
                      className=" border-2 rounded-lg flex-1 flex
                       items-center justify-center aspect-square border-primary-900 bg-background-100"
                    >
                      <Heading
                        size="2xl"
                        className=" leading-none text-black"
                      >
                        {code && code[index] ? code[index] : code.length === index ? "|" : ""}
                      </Heading>
                    </Box>
                  ))}
                </HStack>
                <Box className="absolute top-1/4 w-full opacity-0">
                  {/* <Input
                    control={codeForm.control}
                    name="code"
                    keyboardType="number-pad"
                    /> */}
                  <TextInput
                    className=" !text-transparent !caret-transparent  cursor-transparent !bg-transparent !border-transparent !outline-none opacity-0"
                    selectionColor={"transparent"}
                    keyboardType="number-pad"
                    value={code}
                    onChangeText={(text) => {
                      setCode(text);
                    }}
                  />
                </Box>
              </Box>
            </Animated.View>
            }
              
              <Gradient className="rounded-md">
                <Button
                  size="lg"
                  className="bg-transparent"
                  onPress={ step === "code" ? confirmCode :  changeStep}
                  disabled={phoneForm.formState.isSubmitting || pending}
                > 
                  <ButtonText>{ step === "code" ? t("confirmCode") : t("signIn")}</ButtonText>
                  {!phoneForm.formState.isSubmitting ? (
                    <ButtonIcon as={ step === "code" ? Unlock : LogInIcon} />
                  ) : (
                    <ButtonSpinner />
                  )}
                </Button>
              </Gradient>
            </Form>
              
          { step === "code" ? <Button
                size="sm"
                variant="link"
                className=" justify-start px-4 self-start"
                action="secondary"
                onPress={() => {
                   setStep("credential");
                }}
              >
                <ButtonIcon as={ArrowLeft} />
                <ButtonText>{t("goBack")}</ButtonText>
              </Button>
              :

          <HStack space="sm" className="py-5 items-center px-4">
            <Text className=" text-typography-400 text-center py-7">
              {t("noAccount")}
            </Text>
            <Link href={"/signup"} asChild>
              <Button variant="link">
                <ButtonText>{t("signUp")}</ButtonText>
              </Button>
            </Link>
          </HStack>
              }

          </VStack>

      </Box>
      <VStack className="flex-1 justify-end p-4">
              <Text size="sm">
                By signing into SGK commanders, 
                you hereby agree our terms of service and privacy policy
              </Text>
      </VStack>
      
  
    </SafeAreaView>
    
  );
};
export default Login;
