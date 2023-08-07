import { useFormContext } from "react-hook-form";
import { RecipeFormValues } from "../../types/FormTypes";
import { Button, styled } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useTranslation } from "react-i18next";

const FileFieldContainer = styled("div")({
  display: "flex",
  gap: "1rem",
  flexDirection: "column",
});

const StyledImage = styled("img")({
  width: "20rem",
  height: "100%",
  objectFit: "cover",
  borderRadius: "20px",
});

const InputFileField = () => {
  const { register, getValues, watch } = useFormContext<RecipeFormValues>();

  const watchedFileImage = watch("image");
  const imageUrl = watchedFileImage && watchedFileImage[0]
    ? URL.createObjectURL(watchedFileImage[0])
    : getValues("imgSrc");

  const { t } = useTranslation();
  return (
      <FileFieldContainer>
        <input
          accept="image/*"
          hidden
          id="image-file-input"
          type="file"
          {...register("image")}
        />
        <label htmlFor="image-file-input">
          <Button
            variant="contained"
            component="span"
            endIcon={<UploadFileIcon />}
          >
            {t("button.file")}
          </Button>
        </label>
        <StyledImage src={imageUrl}/>
      </FileFieldContainer>
  );
};

export default InputFileField;
