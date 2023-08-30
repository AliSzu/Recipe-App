import { useFormContext } from "react-hook-form";
import { RecipeFormValues } from "../../types/FormTypes";
import { Button, styled, useMediaQuery } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useTranslation } from "react-i18next";
import { theme } from "../../theme/theme";
import { ChangeEvent } from "react";
import { FILE_MAX_SIZE } from "../../constants/DefaultValues";
import { ErrorMessage } from "@hookform/error-message";

const FileFieldContainer = styled("div")({
  display: "flex",
  gap: "1rem",
  flexDirection: "column",
});

const ErrorContainer = styled('div')(({theme}) => ({
  display: 'flex',
  gap: '1rem',
  color: theme.palette.error.main,
  alignItems: 'center',
  [theme.breakpoints.down('sm')] : {
    flexDirection: 'column'
  }
}))

const StyledImage = styled("img")(({ theme }) => ({
  width: "20rem",
  height: "20rem",
  objectFit: "cover",
  borderRadius: "20px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const InputFileField = () => {
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    register,
    getValues,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<RecipeFormValues>();

  const watchedFileImage = watch("image");
  const image = register("image");

  const { t } = useTranslation();

  const imageUrl =
    watchedFileImage && watchedFileImage[0]
      ? URL.createObjectURL(watchedFileImage[0])
      : getValues("imgSrc");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > FILE_MAX_SIZE) {
      e.target.value = "";
      setError("image", { type: "custom", message: t('textField.error.imageSize') });
    } else {
      image.onChange(e);
      setValue("image", e.target.files);
      clearErrors("image");
    }
  };

  return (
    <FileFieldContainer>
      <input
        accept="image/*"
        hidden
        id="image-file-input"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="image-file-input">
        <ErrorContainer>
          <Button
            variant="contained"
            component="span"
            endIcon={<UploadFileIcon />}
            fullWidth={matchDownSm}
          >
            {t("button.file")}
          </Button>
          <ErrorMessage
            errors={errors}
            name="image"
            render={({ message }) => <>{message}</>}
          />
        </ErrorContainer>
      </label>
      <StyledImage src={imageUrl} />
    </FileFieldContainer>
  );
};

export default InputFileField;
