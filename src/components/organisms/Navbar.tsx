import { Container, List, ListItemButton } from "@mui/material";
import { styled } from "@mui/system";
import NavbarIcon from "../atoms/NavbarIcon";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { logout } from "../../slices/authSlice";
import HamburgerMenu from "../molecules/HamburgerMenu";
import { ITEMS } from "../atoms/MenuItems";
import { useTranslation } from "react-i18next";

const StyledNavbar = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: "1rem",
  color: theme.palette.secondary.light,
  fontSize: "1.2rem",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
}));

const Elements = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

const StyledList = styled(List)(({ theme }) => ({
  display: "flex",
  columnGap: "1rem",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Drawer = styled("div")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navbarItems = ITEMS;

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <StyledNavbar>
      <Elements>
        <NavbarIcon />
        <StyledList>
          {navbarItems.map((item) => (
            <ListItemButton>
              <StyledLink to={item.link}>{item.title}</StyledLink>
            </ListItemButton>
          ))}
          <ListItemButton onClick={handleLogout}>{t('button.logOut')}</ListItemButton>
        </StyledList>
        <Drawer>
          <HamburgerMenu />
        </Drawer>
      </Elements>
    </StyledNavbar>
  );
};
