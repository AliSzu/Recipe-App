import { IconButton, ListItem, debounce, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ShoppingItem } from "../../types/ShoppingListTypes";
import AmountPicker from "../molecules/AmountPicker";
import { useCallback, useState } from "react";

interface ShoppingListItemProps {
  item: ShoppingItem;
  onDeleteItem: (itemId: string) => void;
}

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  gap: '3rem',
  padding: '1rem',
  wordBreak: 'break-all',
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: '1rem',
  },
}));

const ItemActions = styled("div")(({ theme }) => ({
  display: "flex",
  gap: '1rem',
  [theme.breakpoints.down("md")]: {
    width: "100%",
    justifyContent: "space-between",
  },
}));

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
      <div>{item.name}</div>
      <ItemActions>
          <AmountPicker amount={itemAmount} onAmountChange={onAmountChange} />
        <IconButton onClick={() => onDeleteItem(item.id)}>
          <DeleteIcon />
        </IconButton>
      </ItemActions>
    </StyledListItem>
  );
};

export default ShoppingItem;
