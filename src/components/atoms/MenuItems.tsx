import { Divider, ListItemButton, ListItemText } from "@mui/material";
import { MenuItem } from "../../types/MenuTypes";
import { MENU_ITEMS } from "../../constants/MenuItems";
import { useNavigate } from "react-router";
import { styled } from "@mui/system";
import React from "react";
import { ROUTES } from "../../constants/Routes";
import { useTranslation } from "react-i18next";

interface MenuItemsProps {
  onRouteChange?: () => void;
}

const StyledDivider = styled(Divider)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const StyledListItemButton = styled(ListItemButton)({
  padding: "1rem",
});

const MenuItems = ({ onRouteChange }: MenuItemsProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRouteChange = (route: keyof typeof ROUTES) => {
    onRouteChange && onRouteChange();
    navigate(ROUTES[route]);
  };
  return (
    <>
      {MENU_ITEMS.map((item: MenuItem) => (
        <React.Fragment key={item.id}>
          <StyledListItemButton onClick={() => handleRouteChange(item.route)}>
            <ListItemText primary={t(item.title)} />
          </StyledListItemButton>
          <StyledDivider />
        </React.Fragment>
      ))}
    </>
  );
};

export default MenuItems;
