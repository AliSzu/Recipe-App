import { FieldPath, useFormContext } from "react-hook-form";
import { RecipeFormValues } from "../../types/FormTypes";
import { Button, styled } from "@mui/material";
import FileWatched from "../atoms/FileWatched";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";

interface InputFileFieldProps {
  field: FieldPath<RecipeFormValues>;
}

const FileFieldContainer = styled("div")({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
});

const Message = styled("p")(({ theme }) => ({
  padding: "0.5rem",
  margin: "0",
  color: theme.palette.error.main,
  fontSize: "0.85rem",
}));

const InputFileField = ({ field }: InputFileFieldProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<RecipeFormValues>();
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
