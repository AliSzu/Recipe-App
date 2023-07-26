import { Container, List, ListItemButton } from "@mui/material";
import { styled } from "@mui/system";
import NavbarIcon from "../atoms/NavbarIcon";
import { useAppDispatch } from "../../store/store";
import { logout } from "../../slices/authSlice";
import HamburgerMenu from "../molecules/HamburgerMenu";
import { useTranslation } from "react-i18next";
import { useSignOut } from "../../api/auth";
import { showSnackbar } from "../../slices/snackbarSlice";
import LanguageSwitcher from "../molecules/LanguageSwitcher";
import MenuItems from "../atoms/MenuItems";

const StyledNavbar = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: "0.5rem",
  color: theme.palette.secondary.light,
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
  marginBottom: "1rem",
}));

const Elements = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

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
    display: "flex",
  },
}));

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const signOutMutation = useSignOut();

  const handleSignOut = () => {
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        dispatch(logout());
      },
      onError: (error) => {
        dispatch(
          showSnackbar({
            message: error.code,
            autoHideDuration: null,
            severity: "error",
          })
        );
      },
    });
  };

  return (
    <StyledNavbar>
      <Elements>
        <NavbarIcon />
        <StyledList>
          <LanguageSwitcher />
          <MenuItems />
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
