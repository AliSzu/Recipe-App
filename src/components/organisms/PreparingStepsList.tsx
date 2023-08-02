import { useFieldArray, useFormContext } from "react-hook-form";
import { RecipeFormValues } from "../../types/FormTypes";
import { Button } from "@mui/material";
import { uniqueId } from "../../utils/utils";
import AddIcon from "@mui/icons-material/Add";
import ArrayFieldContainer from "../molecules/ArrayFieldContainer";
import FormField from "../atoms/FormField";
import { useTranslation } from "react-i18next";

const PreparingStepsList = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<RecipeFormValues>();
  const {
    fields: preparingFields,
    append: preparingAppend,
    remove: preparingRemove,
  } = useFieldArray({
    control,
    name: "preparing",
  });
  const { t } = useTranslation();
  return (
    <>
      {preparingFields.map((item, index) => {
        return (
          <ArrayFieldContainer
            key={item.id}
            remove={preparingRemove}
            fieldsNumber={preparingFields.length}
            index={index}
          >
            <FormField
              field={`preparing.${index}.step` as const}
              isError={!!(errors.preparing && errors.preparing[index]?.step)}
              label={t("textField.label.step")}
            />
          </ArrayFieldContainer>
        );
      })}

      <Button
        onClick={() => {
          preparingAppend({
            step: "",
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

export default PreparingStepsList;
