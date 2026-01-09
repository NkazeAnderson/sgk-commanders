import { changeLanguage } from "@/localisation/i18n";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { languageT } from "sgk-commanders-shared";

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
