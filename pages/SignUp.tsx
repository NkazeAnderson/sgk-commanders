import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";

import Form from "@/components/Form";
import Gradient from "@/components/Gradient";
import Input from "@/components/Input";
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
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import useToast from "@/hooks/useToast";
import { supabase } from "@/supabase";
import { getUserByEmail, getUserByPhone } from "@/supabase/users";
import { userT } from "@/types";
import { hookFormErrorHandler, unknownErrorHandler } from "@/utils";
import { usersSchema } from "@/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router, useLocalSearchParams } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: phone ? parseInt(phone) : undefined,
      accepted_terms: true,
    },
  });

  const toast = useToast();
  const acceptedterms = watch("accepted_terms");

  const subbmitForm = async (data: z.infer<typeof schema>) => {
    const { data: userByEmail } = await getUserByEmail(data.email);
    const { data: userByPhone } = await getUserByPhone(data.phone);
    const userData = (userByEmail as userT) || (userByPhone as userT);
    if (userData) {
      toast.show({
        message: `User already exist. Login with 6 **** ${userData.phone
          .toString()
          .substring(5)}`,
        status: "error",
      });
    }
    const { data: dataRes, error } = await supabase.auth.signInWithOtp({
      phone: !userData ? `237${data.phone}` : `237${userData.phone}`,
      options: !userData ? { shouldCreateUser: true, data } : undefined,
    });

    if (error) {
      unknownErrorHandler(error);
    } else {
      router.push(`/login?phone=${data.phone}`);
      reset();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="px-4 flex-1 bg-primary-900/90"
    >
      <SafeAreaView className="flex-1">
        <Center className=" items-stretch">
          <VStack space="md" className=" items-center">
            <Heading size="2xl" className=" text-primary-100">
              {t("heading")}
            </Heading>
            <Box className=" w-1/4">
              <Divider className="bg-background-400 " />
            </Box>
          </VStack>
        </Center>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Form className="py-6">
            <Input
              control={control}
              name="name"
              label={t("nameLabel")}
              placeholder={t("namePlaceholder")}
              labelClassName="text-typography-100"
              errors={errors}
            />
            <Input
              control={control}
              name="email"
              label={t("emailLabel")}
              placeholder={t("emailPlaceholder")}
              labelClassName="text-typography-100"
              errors={errors}
            />
            <Input
              control={control}
              name="phone"
              label={t("phoneLabel")}
              placeholder={t("phonePlaceholder")}
              labelClassName="text-typography-100"
              keyboardType="number-pad"
              errors={errors}
            />
            <Input
              control={control}
              name="home_address"
              label={t("homeAddressLabel")}
              placeholder={t("homeAddressPlaceholder")}
              labelClassName="text-typography-100"
              errors={errors}
            />
          </Form>
          <HStack space="md" className=" justify-start py-3">
            <Checkbox
              size={"md"}
              value="checkbox-id"
              onChange={(value) => setValue("accepted_terms", value)}
              isChecked={acceptedterms}
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
            <Text className=" text-typography-400 text-center">
              {t("alreadyAccount")}{" "}
              <Link href={"/login"} className=" text-primary-500 font-bold">
                {t("signIn")}
              </Link>{" "}
            </Text>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default SignUp;
