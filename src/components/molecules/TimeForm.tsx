import { styled } from "@mui/material";
import TimeField from "../atoms/TimeField";
import { useFormContext } from "react-hook-form";
import { RecipeFormValues } from "../../types/FormTypes";
import { useTranslation } from "react-i18next";

const TimeWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "baseline",
  gap: "1rem",
  marginBottom: "2rem",
});

const TimeForm = () => {
  const {
    formState: { errors },
  } = useFormContext<RecipeFormValues>();

  const { t } = useTranslation();

  return (
    <TimeWrapper>
      <TimeField
        field="time.hours"
        watchedField="time.minutes"
        isError={!!errors.time?.hours}
      />
      {t('time.hour.pluralSecond')}
      <TimeField
        field="time.minutes"
        watchedField="time.hours"
        isError={!!errors.time?.minutes}
      />
      {t('time.minute.pluralSecond')}
    </TimeWrapper>
  );
};

export default TimeForm;
