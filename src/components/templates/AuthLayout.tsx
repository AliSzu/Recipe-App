import { styled } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Card from "../atoms/Card";

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
  backgroundColor: theme.palette.primary.light,
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
  padding: "1rem",
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
        <Title>{t(titleTransKey)}</Title>
        {children}
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
