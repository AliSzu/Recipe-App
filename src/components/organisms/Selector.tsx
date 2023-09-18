import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { SelectItem } from "../../types/RecipeTypes";
import { useTranslation } from "react-i18next";
import { OrderByDirection } from "firebase/firestore";

interface SelectorProps {
  onSelect: (property: string, order?: OrderByDirection) => void;
  selectItems: SelectItem[];
  name: string;
}

interface StyledMenuItemProps extends MenuItemProps {
  selected?: boolean
}

const StyledMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== "selected",
})<StyledMenuItemProps>(({ selected, theme }) => ({
  ...(selected && {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      background: theme.palette.primary.dark,
   },
  }),
}));

const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    minWidth: 180,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  },
});

const Selector = ({ onSelect, selectItems, name }: SelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProperty, setSelectedProperty] = useState<string>('')
  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (property: string, order?: OrderByDirection) => {
    setAnchorEl(null);
    setSelectedProperty(property)
    onSelect(property, order);
  };

  return (
    <div>
      <Button
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {t(name)}
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
        {selectItems.map((item: SelectItem) => (
          <StyledMenuItem
            onClick={() => handleClose(item.propertyName, item.orderDirection)}
            disableRipple
            key={item.id}
            selected={selectedProperty === item.propertyName}
          >
            {t(item.name)}
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};

export default Selector;
