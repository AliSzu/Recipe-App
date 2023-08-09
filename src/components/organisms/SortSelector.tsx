import { ButtonGroup, IconButton, styled } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { OrderByDirection } from "firebase/firestore";
import { Recipe } from "../../types/RecipeTypes";

interface SortSelectorProps {
    onSort: (sortType: OrderByDirection, sortProperty: keyof Recipe) => void,
    sortProperty: keyof Recipe,
}

const StyledIconButton = styled(IconButton)(({theme}) => ({
  height: "1rem",
  width: "auto",
  "&:hover": {
    color: theme.palette.secondary.dark,
  },
}));

const SortSelector = ({onSort, sortProperty} : SortSelectorProps) => {
  const handleSort = (sortType: OrderByDirection) => {
    onSort(sortType, sortProperty)
  };
  return (
    <div>
      {sortProperty}
      <ButtonGroup orientation="vertical">
        <StyledIconButton
          size="small"
          disableRipple
          onClick={() => handleSort("asc")}
        >
          <ArrowDropUpIcon />
        </StyledIconButton>
        <StyledIconButton
          size="small"
          disableRipple
          onClick={() => handleSort("desc")}
        >
          <ArrowDropDownIcon />
        </StyledIconButton>
      </ButtonGroup>
    </div>
  );
};

export default SortSelector;
