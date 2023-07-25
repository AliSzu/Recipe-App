import { Alert, IconButton, styled } from "@mui/material";
import { ErrorMessage } from "../../constants/ErrorMessage";
import { useTranslation } from "react-i18next";
import { getErrorKey } from "../../utils/authUtils";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { hideSnackbar, selectSnackbarState } from "../../slices/snackbarSlice";
import CloseIcon from "@mui/icons-material/Close";

const ErrorContainer = styled("div")({
  width: "100%",
});

const AuthSnackbar = () => {
  const { message, isOpen } = useAppSelector(selectSnackbarState);
  const dispatch = useAppDispatch();
  const messageKey = message ? message : "";
  const { t } = useTranslation();

  const errorMessage =
    ErrorMessage[getErrorKey(messageKey) as keyof typeof ErrorMessage];

  const handleClick = () => {
    dispatch(hideSnackbar());
  };

  return (
    <>
      {isOpen && (
        <ErrorContainer>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleClick}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {errorMessage ? t(errorMessage) : t("error.unknown")}
          </Alert>
        </ErrorContainer>
      )}
    </>
  );
};
export default AuthSnackbar;
