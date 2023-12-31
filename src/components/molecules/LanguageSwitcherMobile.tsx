import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";
import { languages } from "../../constants/Languages";
import { useState } from "react";

const LanguageSwitcherMobile = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleChange = (newLanguage: string) => {
    if (newLanguage !== null) {
      i18n.changeLanguage(newLanguage);
      setLanguage(newLanguage);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={language}
      exclusive
      onChange={(_, newLanguage) => handleChange(newLanguage)}
      fullWidth
    >
      {Object.keys(languages).map((lang) => (
        <ToggleButton
          value={languages[lang].nativeName}
          fullWidth
          key={languages[lang].nativeName}
        >
          {languages[lang].nativeName.toUpperCase()}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default LanguageSwitcherMobile;
