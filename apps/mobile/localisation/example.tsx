import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export function ExampleTranslate() {
  const { t } = useTranslation();

  return (
    <View>
      <Text style={{ color: "white" }}>{t("welcome")}</Text>
      <Text style={{ color: "white" }}>{t("greeting", { name: "Nkaze" })}</Text>
    </View>
  );
}
