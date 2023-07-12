import { Alert, styled } from "@mui/material";
import { ErrorMessage } from "../../enums/ErrorMessage";
import { useTranslation } from "react-i18next";
import { getErrorKey } from "../../utils/authUtils";

interface AuthSnackbarProps {
  isError: boolean;
  message: string;
}

const ErrorContainer = styled("div")({
    marginBottom: '1.5rem',
    width: '100%'
});

const AuthSnackbar = ({ isError, message }: AuthSnackbarProps) => {
  const { t } = useTranslation();

  const errorMessage =
    ErrorMessage[getErrorKey(message) as keyof typeof ErrorMessage];

  return (
    <ErrorContainer>
      {isError && <Alert severity="error">{errorMessage ? t(errorMessage) : t('error.unknown')}</Alert>}
    </ErrorContainer>
  );
};
export default AuthSnackbar;
