import { changeLanguage } from "@/localisation/i18n";
import { languageT } from "@/types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const useLanguage = () => {
  const [language, setLanguage] = useState<languageT>("fr");
  const { t } = useTranslation();
  useEffect(() => {
    console.log({ language });

    changeLanguage(language);
  }, [language]);

  return { language, setLanguage, t };
};

export default useLanguage;
