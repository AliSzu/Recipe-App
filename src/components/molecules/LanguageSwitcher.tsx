import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { languages } from "../../constants/Languages";

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState("en");
  const { i18n } = useTranslation();

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
          <img src={languages[language].flag} />{" "}
          {languages[language].nativeName.toUpperCase()}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSwitcher;
