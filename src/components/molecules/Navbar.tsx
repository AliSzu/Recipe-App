import { Container } from "@mui/material";
import { styled } from "@mui/system";
import NavbarIcon from "../atoms/NavbarIcon";
import { ROUTES } from "../../constants/routes";
import { Link } from "react-router-dom";

const StyledNavbar = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: "1rem",
  color: theme.palette.primary.light,
  fontSize: "1.2rem",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
}));

const Elements = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const StyledLink = styled(Link)(({theme}) =>  ({
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    color: theme.palette.secondary.light
  }
}));

const Links = styled('div')({
    display: 'flex',
    columnGap: '1rem'
})

export const Navbar = () => {
  return (
    <StyledNavbar>
        <Elements>
          <NavbarIcon />
          <Links>
            <StyledLink to={ROUTES.HOME}>Add recipe</StyledLink>
            <StyledLink to={ROUTES.LOGIN}>Log In</StyledLink>
            {/* TODO: CHANGE ROUTES WHEN PAGES WILL BE IMPLEMENTED */}
          </Links>
        </Elements>
    </StyledNavbar>
  );
};
