import {
  Drawer,
  IconButton,
  styled,
  IconButtonProps,
  Divider,
  List,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useTranslation } from "react-i18next";
import { useSignOut } from "../../api/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { showSnackbar } from "../../slices/snackbarSlice";
import LanguageSwitcherMobile from "./LanguageSwitcherMobile";
import MenuItems from "../atoms/MenuItems";

interface StyledIconButtonProps extends IconButtonProps {
  open?: boolean;
}

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "open",
})<StyledIconButtonProps>(({ open }) => ({
  ...(open && {
    display: "none",
  }),
}));

const StyledList = styled(List)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const ActionContainer = styled("div")({
  display: "flex",
  height: "inherit",
  justifyContent: "flex-end",
  flexDirection: "column",
  rowGap: "1rem",
  padding: '1rem'
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const signOutMutation = useSignOut();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onRouteChange = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        dispatch(logout());
      },
      onError: (error) => {
        dispatch(showSnackbar({ message: error.message }));
      },
    });
  };
  return (
    <>
      <StyledIconButton open={open} onClick={handleDrawerOpen}>
        <MenuIcon fontSize="large" />
      </StyledIconButton>
      <Drawer onClose={() => setOpen(false)} open={open}>
        <DrawerHeader onClick={handleDrawerClose}>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <StyledList>
          <MenuItems onRouteChange={onRouteChange} />
          <ActionContainer>
            <Button onClick={handleLogout}>{t("button.logOut")}</Button>
            <LanguageSwitcherMobile />
          </ActionContainer>
        </StyledList>
      </Drawer>
    </>
  );
};
export default HamburgerMenu;
