import { Alert, styled } from "@mui/material";
import { ErrorMessage } from "../../constants/ErrorMessage";
import { useTranslation } from "react-i18next";
import { getErrorKey } from "../../utils/authUtils";

interface AuthSnackbarProps {
  isError: boolean;
  message?: string;
}

const ErrorContainer = styled("div")({
  width: "100%",
});

const AuthSnackbar = ({ isError, message }: AuthSnackbarProps) => {
  const messageKey = message ? message : "";
  const { t } = useTranslation();

  const errorMessage =
    ErrorMessage[getErrorKey(messageKey) as keyof typeof ErrorMessage];

  return (
    <>
      {isError && (
        <ErrorContainer>
          <Alert severity="error">
            {errorMessage ? t(errorMessage) : t("error.unknown")}
          </Alert>
        </ErrorContainer>
      )}
    </>
  );
};
export default AuthSnackbar;
