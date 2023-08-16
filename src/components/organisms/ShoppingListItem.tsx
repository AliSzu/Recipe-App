import { Card, IconButton, ListItem, debounce, styled } from "@mui/material";
import { ShoppingItem } from "../../types/ShoppingListTypes";
import AmountPicker from "../molecules/AmountPicker";
import { useCallback, useState } from "react";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close";

interface ShoppingListItemProps {
  item: ShoppingItem;
  onDeleteItem: (itemId: string) => void;
}

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  wordBreak: "break-all",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "1rem 0 0 0",
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  transition: "transform 0.15s ease-in-out",
  padding: "1rem",
  width: "100%",
  borderRadius: "5px",
  "&: hover": {
    transform: "scale3d(1.02, 1.02, 1)",
  },
}));

const StyledCardContent = styled(CardContent)({
  padding: "0",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const StyledIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.dark,
  backgroundColor: theme.palette.secondary.light,
  borderRadius: "5px",
  "& svg": {
    fontSize: "1rem",
  },
}));

const ItemActions = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});

const ItemInformation = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
});

const ShoppingItem = ({ item, onDeleteItem }: ShoppingListItemProps) => {
  const [itemAmount, setItemAmount] = useState(item.amount);

  const debounceEditAmount = useCallback(
    debounce((newAmount: number) => {
      editAmount(newAmount);
    }, 800),
    [debounce]
  );

  const editAmount = (newAmount: number) => {
    // TODO: EDIT AMOUNT IN THE FIREBASE
  };
  const onAmountChange = (amount: number) => {
    setItemAmount(amount);
    debounceEditAmount(amount);
  };
  return (
    <StyledListItem>
      <StyledCard>
        <StyledCardContent>
          <ItemActions >
            <StyledIcon disableRipple={true} size="small" onClick={() => onDeleteItem(item.id!)}>
              <CloseIcon />
            </StyledIcon>
          </ItemActions>
          <ItemInformation>
            <div>{item.name}</div>
            <AmountPicker amount={itemAmount} onAmountChange={onAmountChange} />
          </ItemInformation>
        </StyledCardContent>
      </StyledCard>
    </StyledListItem>
  );
};

export default ShoppingItem;
