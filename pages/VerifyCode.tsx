import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const VerifyCode = () => {
  const { t } = useTranslation("verify_code");
  return (
    <View>
      <Text>{t("heading")}</Text>
    </View>
  );
};

export default VerifyCode;
