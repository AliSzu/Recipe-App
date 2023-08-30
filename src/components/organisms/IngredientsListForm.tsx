import { RecipeFormValues } from "../../types/FormTypes";
import { useFieldArray, useFormContext } from "react-hook-form";
import { uniqueId } from "../../utils/utils";
import { Button, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrayFieldContainer from "../molecules/ArrayFieldContainer";
import FormField from "../atoms/FormField";
import { useTranslation } from "react-i18next";
import { MAX_LENGTH } from "../../constants/DefaultValues";

const TextFieldContainer = styled("div")({
  display: "flex",
  columnGap: "1rem",
});

const IngredientsListForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<RecipeFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });
  const { t } = useTranslation();
  return (
    <>
      {fields.map((item, index) => {
        return (
          <ArrayFieldContainer
            key={item.id}
            remove={remove}
            index={index}
            fieldsNumber={fields.length}
          >
            <TextFieldContainer>
              <FormField
                field={`ingredients.${index}.name` as const}
                isError={
                  !!(errors.ingredients && errors.ingredients[index]?.name)
                }
                label={t("textField.label.name")}
                validationSchema={{
                  maxLength: {
                    value: MAX_LENGTH.NAME,
                    message: t("textField.error.maxLength", {number : MAX_LENGTH.NAME})
                  }
                }}
              />
              <FormField
                field={`ingredients.${index}.amount` as const}
                isError={
                  !!(errors.ingredients && errors.ingredients[index]?.amount)
                }
                label={t("textField.label.amount")}
                type="number"
              />
            </TextFieldContainer>
          </ArrayFieldContainer>
        );
      })}

      <Button
        onClick={() => {
          append({
            amount: 1,
            name: "",
            id: uniqueId(),
          });
        }}
        fullWidth
        variant="contained"
      >
        <AddIcon />
      </Button>
    </>
  );
};

export default IngredientsListForm;
