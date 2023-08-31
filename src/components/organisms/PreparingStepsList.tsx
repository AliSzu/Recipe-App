import { useFieldArray, useFormContext } from "react-hook-form";
import { RecipeFormValues } from "../../types/FormTypes";
import { Button, styled } from "@mui/material";
import { uniqueId } from "../../utils/utils";
import AddIcon from "@mui/icons-material/Add";
import ArrayFieldContainer from "../molecules/ArrayFieldContainer";
import FormField from "../atoms/FormField";
import { useTranslation } from "react-i18next";
import { MAX_LENGTH, PREPARING_FIELDS_LIMIT } from "../../constants/DefaultValues";

const ErrorMessage = styled('div')(({theme}) => ({
  paddingTop: "0.5rem",
  color: theme.palette.error.main,
  fontSize: "1.15rem",
  [theme.breakpoints.down('sm')]: {
    fontSize: 'auto'
  }
}))

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
              maxLength={MAX_LENGTH.STEP}
            />
          </ArrayFieldContainer>
        );
      })}

      <Button
        onClick={() => {
          if (preparingFields.length < PREPARING_FIELDS_LIMIT) {
            preparingAppend({
              step: "",
              id: uniqueId(),
            });
          }
        }}
        fullWidth
        variant="contained"
        disabled={preparingFields.length >= PREPARING_FIELDS_LIMIT}
      >
        <AddIcon />
      </Button>
      {preparingFields.length >= PREPARING_FIELDS_LIMIT && <ErrorMessage>{t('limit.preparingSteps', {number: PREPARING_FIELDS_LIMIT})}</ErrorMessage>}
    </>
  );
};

export default PreparingStepsList;
