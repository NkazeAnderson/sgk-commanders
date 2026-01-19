import React from "react";
import { Image } from "./ui/image";

const Logo = ({size="md"}:{size?: "xs" | "sm" | "md" | "lg" }) => {
  return (
    <Image
      className="rounded-lg"
      size={size}
      source={require("@/assets/images/logo.png")}
      alt="Logo"
    />
  );
};

export default Logo;
