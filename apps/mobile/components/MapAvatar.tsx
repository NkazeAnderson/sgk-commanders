import { ArrowRight } from "lucide-react-native";
import React, { useState } from "react";
import { userT } from "sgk-commanders-shared";
import { Avatar, AvatarFallbackText, AvatarImage } from "./ui/avatar";
import { Box } from "./ui/box";
import { Center } from "./ui/center";
import { HStack } from "./ui/hstack";
import { Icon } from "./ui/icon";

export const UserAvatar = ({
  user,
  rotationAngle,
  safe,
  size,
}: {
  user: userT;
  size: "sm" | "lg";
  rotationAngle?: number;
  safe?: boolean;
}) => {
  return (
    <Avatar
      size={size}
      className={`bg-background-600 border-2 ${
        safe
          ? "border-green-600"
          : safe === false
          ? "border-red-600"
          : rotationAngle !== undefined && !safe
          ? "border-yellow-600"
          : ""
      }`}
    >
      {!user.is_agent && <AvatarFallbackText>{user.name}</AvatarFallbackText>}
      <AvatarImage
        source={
          !user.is_agent
            ? { uri: user.profile_picture }
            : require("@/assets/images/sdg-officer.png")
        }
      />
    </Avatar>
  );
};

const MapAvatar = ({
  user,
  rotationAngle,
  safe,
  size,
}: {
  user: userT;
  rotationAngle?: number;
  safe?: boolean;
  size: "sm" | "lg";
}) => {
  const [width, setWidth] = useState(0);
  const inAgentMode = rotationAngle !== undefined;

  if (!inAgentMode) {
    return <UserAvatar user={user} safe={safe} size={size} />;
  }
  return (
    <Box
      className="relative self-start "
      onLayout={(e) => {
        setWidth(e.nativeEvent.layout.width);
      }}
    >
      <Center
        className="absolute"
        style={{
          width: width,
        }}
      >
        <UserAvatar
          user={user}
          safe={safe}
          rotationAngle={rotationAngle}
          size={size}
        />
      </Center>

      <HStack
        className=" self-start relative items-center"
        style={{
          transform: [
            {
              rotate: `${rotationAngle}deg`,
            },
          ],
        }}
      >
        <Avatar size={"sm"} className="bg-transparent "></Avatar>
        <Avatar size={"lg"} className="bg-transparent "></Avatar>
        <Avatar size={"sm"} className="bg-transparent ">
          <Box className=" animate-ping">
            <Icon className=" text-primary-600" as={ArrowRight} />
          </Box>
        </Avatar>
      </HStack>
    </Box>
  );
};

export default MapAvatar;
