import { styled } from "@mui/material";
import {ReactComponent as EmptyPlateIcon } from "../assets/images/plate.svg";
import { useTranslation } from "react-i18next";

const StyledSvgIcon = styled(EmptyPlateIcon)(({theme}) => ({
  color: theme.palette.secondary.dark,
  height: '20rem',
  width: 'auto',
  [theme.breakpoints.down("md")]: {
    height: "10rem",
  },
  [theme.breakpoints.down("sm")]: {
    height: "5rem",
  },
}))

const ErrorImage = styled("div")(({ theme }) => ({
  color: theme.palette.secondary.dark,
  fontSize: "20rem",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "10rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "5rem",
  },
}));

const Message = styled("div")(({ theme }) => ({
  fontSize: "1.75rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const Container = styled("div")({
  height: "90vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <ErrorImage>
        4<StyledSvgIcon/>4
      </ErrorImage>
      <Message>{t("error.pageNotFound")}</Message>
    </Container>
  );
};

export default NotFound;
