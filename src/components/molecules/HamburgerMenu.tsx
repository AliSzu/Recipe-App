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
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useAppDispatch } from "../../store/store";
import { logout } from "../../slices/authSlice";
import { ITEMS } from "../atoms/MenuItems";
import { useTranslation } from "react-i18next";

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
  padding: "1rem",
});

const ActionContainer = styled("div")({
  display: "flex",
  height: "inherit",
  justifyContent: "flex-end",
  flexDirection: "column",
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
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const items = ITEMS;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
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
          {items.map((item) => (
            <ListItemButton>
              <ListItem key={item.title}>
                <ListItemText primary={item.title} />
              </ListItem>
            </ListItemButton>
          ))}
          <ActionContainer>
            <Button onClick={handleLogout}>{t("button.logOut")}</Button>
          </ActionContainer>
        </StyledList>
      </Drawer>
    </>
  );
};
export default HamburgerMenu;
