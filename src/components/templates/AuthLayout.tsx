import { Divider, styled } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Card from "../atoms/Card";
import LanguageSwitcher from "../molecules/LanguageSwitcher";
import GoogleAuthButton from "../molecules/GoogleAuthButton";
import Snackbar from "../atoms/Snackbar";

interface AuthLayoutProps {
  children: React.ReactNode;
  messageTransKey: string;
  titleTransKey: string;
  messageRoute: string;
}

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  flexDirection: "column",
  fontFamily: "Inter, sans-serif",
  textAlign: 'center',
  backgroundColor: theme.palette.primary.light,
  [theme.breakpoints.down("sm")]: {
    backgroundColor: theme.palette.secondary.light,
    padding: '1rem'
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
  "&:hover": {
    color: theme.palette.primary.dark,
  },
}));

const Title = styled("div")({
  fontSize: "2rem",
});

const LanguageSwitcherContainer = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",
});

const AuthLayout = ({
  children,
  messageTransKey,
  titleTransKey,
  messageRoute,
}: AuthLayoutProps) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Card>
        <LanguageSwitcherContainer>
          <LanguageSwitcher />
        </LanguageSwitcherContainer>
        <Title>{t(titleTransKey)}</Title>
        <Snackbar />
        {children}
        <Divider flexItem>{t("card.or")}</Divider>
        <GoogleAuthButton />
      </Card>
      <div>
        <Trans i18nKey={messageTransKey}>
          {" "}
          <StyledLink to={messageRoute} />
        </Trans>
      </div>
    </Wrapper>
  );
};
export default AuthLayout;
