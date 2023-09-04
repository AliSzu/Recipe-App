import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { Order, SortItems } from "../../types/RecipeTypes";
import { useTranslation } from "react-i18next";
import { SORT_ITEMS } from "../../constants/SortItems";

interface SelectorProps {
  onSort: (orderElements: Order) => void;
}

const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    minWidth: 180,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  },
});

const Selector = ({ onSort }: SelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (orderElements: Order) => {
    setAnchorEl(null);
    onSort(orderElements);
  };
  return (
    <div>
      <Button
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {t("sort.name")}
      </Button>
      <StyledMenu
        elevation={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        {SORT_ITEMS.map((item: SortItems) => (
          <MenuItem
            onClick={() => handleClose(item.order)}
            disableRipple
            key={item.id}
          >
            {t(item.name)}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};

export default Selector;
