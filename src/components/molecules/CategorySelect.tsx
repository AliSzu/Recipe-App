import { InputLabel, MenuItem, Select, styled } from "@mui/material";
import { Category } from "../../enums/Category";
import { useFormContext } from "react-hook-form";
import { RecipeFormValues } from "../../types/FormTypes";
import { useTranslation } from "react-i18next";

const SelectWrapper = styled("div")({
  paddingTop: "1rem",
});

const CategorySelect = () => {
  const { register, watch } = useFormContext<RecipeFormValues>();
  const { t } = useTranslation();

  const watchedCategory = watch("category");

  const categoryOptions = Object.keys(Category).map((category) => (
    <MenuItem
      value={Category[category as keyof typeof Category]}
      key={category}
    >
      {t(category)}
    </MenuItem>
  ));

  return (
    <SelectWrapper>
      <InputLabel>{t("category")}</InputLabel>
      <Select value={watchedCategory} {...register("category")} fullWidth>
        {categoryOptions}
      </Select>
    </SelectWrapper>
  );
};

export default CategorySelect;
