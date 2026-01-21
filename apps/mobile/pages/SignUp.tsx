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
import { Checkbox, CheckboxIcon, CheckboxIndicator } from "@/components/ui/checkbox";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { hookFormErrorHandler, unknownErrorHandler } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ArrowRight, CheckIcon, Mail, MapPin, User } from "lucide-react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "sgk-commanders-shared";
import { usersSchema } from "sgk-commanders-shared/dist/zodSchema";
import { z } from "zod";

const schema = usersSchema.omit({
  id: true,
  subcription: true,
  subcriptionExpiration: true,
});

const SignUp = () => {
 const { t } = useTranslation("signup");
   const { phone } = useLocalSearchParams<{
     phone?: string;
   }>();
   const {
     control,
     handleSubmit,
     formState: { errors, isSubmitting },
     setValue,
     reset,
   } = useForm({
     resolver: zodResolver(schema),
     defaultValues: {
       phone: phone ? parseInt(phone) : undefined,
     },
   });
  
   const subbmitForm = async (data: z.infer<typeof schema>) => {
     const { error } = await supabase.supabase.auth.signInWithOtp(
       {
         phone: `237${data.phone}`,
         options: { shouldCreateUser: true, data },
       }
     );
     if (error) {
      throw unknownErrorHandler(error);
     }
      router.push(`/login?phone=${data.phone}`);
      reset();
   };
 

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
          <Center className=" items-stretch" style={{paddingTop:50, paddingBottom:10}}>
          <VStack space="md" className=" items-center">
            <Heading size="2xl" className=" text-primary-100">
              {t("heading")}
            </Heading>
            <Box className=" w-1/4">
              <Divider className="bg-background-400 " />
            </Box>
          </VStack>
        </Center>

         <ScrollView showsVerticalScrollIndicator={false} className="px-4">
          <Form space="xl" className=" gap">
            <Input
              control={control}
              name="name"
              label={t("nameLabel")}
              placeholder={t("namePlaceholder")}
              labelClassName="text-typography-100"
              errors={errors}
              left={<User className="text-primary-950" />}
            />
            <Input
              control={control}
              name="email"
              label={t("emailLabel")}
              placeholder={t("emailPlaceholder")}
              labelClassName="text-typography-100"
              errors={errors}
              left={<Mail className="text-primary-950" />}
            />
            <Input
              control={control}
              name="phone"
              label={t("phoneLabel")}
              placeholder={t("phonePlaceholder")}
              labelClassName="text-typography-100"
              keyboardType="number-pad"
              errors={errors}
             left={<Text className="text-primary-950" size="lg" >+237</Text>}
            />
            <Input
              control={control}
              name="home_address"
              label={t("homeAddressLabel")}
              placeholder={t("homeAddressPlaceholder")}
              labelClassName="text-typography-100"
              errors={errors}
              left={<MapPin className="text-primary-950" />}
            />
          <HStack space="md" className=" justify-start py-2">
            <Checkbox
              size={"md"}
              value="checkbox-id"
              onChange={(value) => setValue("accepted_terms", value)}
            >
              <CheckboxIndicator
                className={`${errors.accepted_terms && "!border-red-500"}`}
              >
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
            </Checkbox>
            <Box className="w-10/12">
              <Text className=" text-typography-400">
                {t("acceptTerms")}{" "}
                <Link className="text-primary-600" href={"/"}>
                  {t("privacy")}
                </Link>{" "}
                and{" "}
                <Link className="text-primary-600" href={"/"}>
                  {t("terms")}
                </Link>
              </Text>
            </Box>
          </HStack>
          </Form>
          <VStack space="md" className="py-10 justify-end">
            <Gradient className="rounded-md">
              <Button
                size="lg"
                className={"bg-transparent"}
                disabled={isSubmitting}
                onPress={handleSubmit(subbmitForm, hookFormErrorHandler)}
              >
                <ButtonText>{t("signUp")}</ButtonText>
                {isSubmitting ? (
                  <ButtonSpinner />
                ) : (
                  <ButtonIcon as={ArrowRight} />
                )}
              </Button>
            </Gradient>
            
          </VStack>
        </ScrollView>

      </Box>
      <VStack space="lg" className="flex-1 justify-end p-4">
        <Text className=" text-typography-400 text-center">
              {t("alreadyAccount")}{" "}
              <Link href={"/login"} className=" text-primary-500 font-bold">
                {t("signIn")}
              </Link>{" "}
            </Text>
              <Text size="sm">
                By signing into SGK commanders, 
                you hereby agree our terms of service and privacy policy
              </Text>
      </VStack>
      
  
    </SafeAreaView>
    
  );
};
export default SignUp;
