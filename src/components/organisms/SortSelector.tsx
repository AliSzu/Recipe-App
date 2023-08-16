import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { Recipe } from "../../types/RecipeTypes";
import { useTranslation } from "react-i18next";

interface SortSelectorProps {
  onSort: (sortProperty: keyof Recipe) => void;
}

const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    minWidth: 180,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  },
});

const SortSelector = ({ onSort }: SortSelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (sortProperty: keyof Recipe) => {
    setAnchorEl(null);
    onSort(sortProperty);
  };
  return (
    <div>
      <Button
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {t('sort.name')}
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
        <MenuItem onClick={() => handleClose("title")} disableRipple>
          {t('sort.alphabetically')}
        </MenuItem>
        <MenuItem onClick={() => handleClose("time")} disableRipple>
          {t('sort.time')}
        </MenuItem>
        <MenuItem onClick={() => handleClose("updatedAt")} disableRipple>
          {t('sort.updated')}
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default SortSelector;
