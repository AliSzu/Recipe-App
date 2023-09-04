import {
  FormControl,
  MenuItem,
  TextField,
  styled,
} from "@mui/material";
import { Category } from "../../enums/Category";
import { useFormContext } from "react-hook-form";
import { RecipeFormValues } from "../../types/FormTypes";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";

const SelectWrapper = styled(FormControl)({
  paddingTop: "2rem",
});

const CategorySelect = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<RecipeFormValues>();
  const { t } = useTranslation();

  const watchedCategory = watch("category");

  const categoryOptions = Object.keys(Category).map((category) => {
    if (category !== Category.default) {
      return (
        <MenuItem
          value={Category[category as keyof typeof Category]}
          key={category}
        >
          {t(category)}
        </MenuItem>
      );
    }
  });

  return (
    <div>
      <SelectWrapper fullWidth>
        <TextField
          defaultValue={Category.default !== watchedCategory ? watchedCategory : ""}
          variant="outlined"
          select
          label={t("category")}
          {...register("category", {
            validate: () => {
              if (watch("category") === Category.default) {
                return t("textField.error.required");
              }
            },
          })}
          error={!!errors["category"]}
          helperText={
            <ErrorMessage
              errors={errors}
              name={"category"}
              render={({ message }) => <>{message}</>}
            />
          }
        >
          {categoryOptions}
        </TextField>
      </SelectWrapper>
    </div>
  );
};

export default CategorySelect;
