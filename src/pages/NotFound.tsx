import { styled } from "@mui/material";
import emptyPlate from "../assets/images/plate.svg";
import { useTranslation } from "react-i18next";

const StyledImage = styled("img")(({ theme }) => ({
  height: "20rem",
  filter:
    "invert(94%) sepia(0%) saturate(0%) hue-rotate(148deg) brightness(93%) contrast(90%)",
  [theme.breakpoints.down("md")]: {
    height: "10rem",
  },
  [theme.breakpoints.down("sm")]: {
    height: "5rem",
  },
}));

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
  height: "90%",
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
        4<StyledImage src={emptyPlate} />4
      </ErrorImage>
      <Message>{t("error.pageNotFound")}</Message>
    </Container>
  );
};

export default NotFound;
