import React from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { Button } from "./button";

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ta" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-forest hover:bg-olive/10 rounded-xl transition-all px-3"
      title={t("common.language")}
    >
      <Languages className="w-4 h-4" />
      <span className="font-medium text-sm">
        {i18n.language === "en" ? "தமிழ்" : "English"}
      </span>
    </Button>
  );
};

export default LanguageSwitcher;
