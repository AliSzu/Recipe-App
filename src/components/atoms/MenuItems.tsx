import { Divider, ListItemButton, ListItemText } from "@mui/material";
import { MenuItem } from "../../types/MenuTypes";
import { MENU_ITEMS } from "../../constants/MenuItems";
import { useNavigate } from "react-router";
import { styled } from "@mui/system";

const StyledDivider = styled(Divider)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const StyledListItemButton = styled(ListItemButton)({
  padding: "1rem",
});

const MenuItems = () => {
  const navigate = useNavigate();

  const handleRouteChange = (route: string) => {
    navigate(route);
  };
  return (
    <>
      {MENU_ITEMS.map((item: MenuItem) => (
        <div key={item.title}>
          <StyledListItemButton onClick={() => handleRouteChange(item.route)}>
            <ListItemText primary={item.title} />
          </StyledListItemButton>
          <StyledDivider />
        </div>
      ))}
    </>
  );
};

export default MenuItems;
