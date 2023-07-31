import {
  Control,
  FieldErrors,
  FieldPath,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { RecipeFormValues } from "../../types/FormTypes";
import { Button, styled } from "@mui/material";
import FileWatched from "../atoms/FileWatched";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";

interface InputFileFieldProps {
  register: UseFormRegister<RecipeFormValues>;
  field: FieldPath<RecipeFormValues>;
  control: Control<RecipeFormValues>;
  setValue: UseFormSetValue<RecipeFormValues>;
  isError: boolean;
  errors: FieldErrors<RecipeFormValues>;
  getValues: UseFormGetValues<RecipeFormValues>;
}

const FileFieldContainer = styled("div")({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
});

const Message = styled("p")({
  padding: "0.5rem",
  margin: "0",
  color: "#bf1650",
  fontSize: "0.85rem",
});

const InputFileField = ({
  register,
  field,
  control,
  errors,
}: InputFileFieldProps) => {
  const { t } = useTranslation();
  return (
    <>
      <FileFieldContainer>
        <Button
          variant="contained"
          component="label"
          endIcon={<UploadFileIcon />}
        >
          {t("button.file")}
          <input
            accept="image/*"
            type="file"
            hidden
            {...register("image", { required: t("textField.error.required") })}
          />
        </Button>
        <FileWatched control={control} />
      </FileFieldContainer>
      <ErrorMessage
        errors={errors}
        name={field}
        render={({ message }) => <Message>{message}</Message>}
      />
    </>
  );
};

export default InputFileField;
