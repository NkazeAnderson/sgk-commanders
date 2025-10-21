import { userT } from "@/types";
import { CheckCircle, Info, Siren, Trash } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallbackText, AvatarImage } from "./ui/avatar";
import { Box } from "./ui/box";
import { Button, ButtonIcon } from "./ui/button";
import { Heading } from "./ui/heading";
import { HStack } from "./ui/hstack";
import { Icon } from "./ui/icon";
import { Text } from "./ui/text";

const MemberCard = ({
  manage,
  role,
  user,
}: {
  manage?: boolean;
  role: string;
  user?: userT;
}) => {
  const { t } = useTranslation("member_card");
  if (!user) {
    return (
      <HStack>
        <Icon className=" text-warning-100" as={Info} />
        <Text className=" text-typography-200">
          {t("pendingInvitation", { role: role.toLowerCase() })}
        </Text>
      </HStack>
    );
  }
  return (
    <HStack
      space="sm"
      className=" items-center justify-between p-4 bg-primary-800 rounded-md"
    >
      <HStack space="md" className=" items-center">
        <Avatar size={"lg"}>
          <AvatarFallbackText>{user.name}</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: user.profile_picture ?? "",
            }}
          />
        </Avatar>
        <Box className="gap-1">
          <Heading className=" text-typography-100 capitalize">
            {user.name}
          </Heading>
          <HStack className=" items-center  mb-1" space="xs">
            <Text className={`text-typography-100`} size="sm">
              {t("roleLabel")}
            </Text>
            <Text className={`text-secondary-100 lowercase`}>{role}</Text>
          </HStack>
          <HStack space="sm" className=" items-center">
            <Icon
              className={` ${
                !user.is_safe ? "text-error-100" : "text-success-100"
              } `}
              as={user.is_safe ? CheckCircle : Siren}
            />
            <Text
              className={` ${
                !user.is_safe ? "text-error-100" : "text-success-100"
              } `}
            >
              {user.is_safe ? t("inSafety") : t("needsRescue")}
            </Text>
          </HStack>
        </Box>
      </HStack>
      {manage && role !== "main" && (
        <HStack space="sm">
          <Button size="sm" action="negative">
            <ButtonIcon as={Trash} />
          </Button>
        </HStack>
      )}
    </HStack>
  );
};

export default MemberCard;
