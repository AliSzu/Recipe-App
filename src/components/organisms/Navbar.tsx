import { Container, List, ListItemButton } from "@mui/material";
import { styled } from "@mui/system";
import NavbarIcon from "../atoms/NavbarIcon";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { logout } from "../../slices/authSlice";
import HamburgerMenu from "../molecules/HamburgerMenu";
import { useTranslation } from "react-i18next";
import { MenuItem } from "../../types/MenuTypes";
import { MENU_ITEMS } from "../../constants/MenuItems";
import { useSignOut } from "../../api/auth";
import { showSnackbar } from "../../slices/snackbarSlice";

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

  const signOutMutation = useSignOut();

  const handleSignOut = () => {
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        dispatch(logout())
      },
      onError: (error) => {
        dispatch(showSnackbar({message: error.message}))
      }
    });
  };

  return (
    <StyledNavbar>
      <Elements>
        <NavbarIcon />
        <StyledList>
          {MENU_ITEMS.map((item: MenuItem) => (
            <ListItemButton key={item.title}>
              <StyledLink to={item.route} key={item.title}>
                {item.title}
              </StyledLink>
            </ListItemButton>
          ))}
          <ListItemButton onClick={handleSignOut}>
            {t("button.logOut")}
          </ListItemButton>
        </StyledList>
        <Drawer>
          <HamburgerMenu />
        </Drawer>
      </Elements>
    </StyledNavbar>
  );
};
