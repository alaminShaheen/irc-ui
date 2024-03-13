import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import Button from "@/components/ui/Button";
import { LanguageCode } from "@/models/enums/LanguageCode";
import { ButtonVariant } from "@/models/enums/ButtonVariant";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = useCallback(() => {
    const currentLanguage = i18n.language;
    void i18n.changeLanguage(currentLanguage === LanguageCode.ENGLISH ? LanguageCode.FRENCH : LanguageCode.ENGLISH);
  }, [i18n]);

  return (
    <Button
      className="h-12 w-12 rounded-lg text-primary-5 border-2 border-secondary-25 flex justify-center items-center font-bold"
      variant={ButtonVariant.VANILLA}
      onClick={toggleLanguage}>
      {i18n.resolvedLanguage?.toUpperCase()}
    </Button>
  );
};

export default LanguageToggle;

