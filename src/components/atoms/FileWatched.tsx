import { Control, useWatch } from "react-hook-form";
import { RecipeFormValues } from "../../types/FormTypes";
import { useTranslation } from "react-i18next";

interface FileWatchedProps {
  control: Control<RecipeFormValues>;
}

const FileWatched = ({ control }: FileWatchedProps) => {
  const { t } = useTranslation();
  const image = useWatch({
    control,
    name: "image",
    defaultValue: undefined,
  });
  return <>{image && image[0] ? image[0].name : t("file.empty")}</>;
};

export default FileWatched;
