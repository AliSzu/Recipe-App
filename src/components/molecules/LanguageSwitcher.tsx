import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Language } from "../../types/LanguageTypes";

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState("en");
  const { i18n } = useTranslation();

  const languages: Language = {
    en: { nativeName: "en", flag: 'https://flagcdn.com/w20/gb.png' },
    pl: { nativeName: "pl", flag: 'https://flagcdn.com/w20/pl.png' },
  };

  const handleChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
    setLanguage(event.target.value);
  };

  return (
    <Select
      disableUnderline={true}
      variant="standard"
      value={language}
      onChange={handleChange}
    >
      {Object.keys(languages).map((language) => (
        <MenuItem
          value={languages[language].nativeName}
          key={languages[language].nativeName}
        >
          <img src={languages[language].flag}/> {languages[language].nativeName.toUpperCase()}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSwitcher;
