import { Control, useWatch } from "react-hook-form";
import { RecipeFormValues } from "../../types/FormTypes";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material";

interface FileWatchedProps {
  control: Control<RecipeFormValues>;
}

const StyledImage = styled('img')({
  width: "20rem",
  height: "100%",
  objectFit: "cover",
})

const FileWatched = ({ control }: FileWatchedProps) => {
  const { t } = useTranslation();
  const image = useWatch({
    control,
    name: "image",
    defaultValue: undefined,
  });

  return (
    <>
      {image && image[0] ? (
          <StyledImage src={URL.createObjectURL(image[0])} />
      ) : (
        t("file.empty")
      )}
    </>
  );
};

export default FileWatched;
