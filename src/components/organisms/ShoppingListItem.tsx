import { IconButton, ListItem, debounce, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ShoppingItem } from "../../types/ShoppingListTypes";
import AmountPicker from "../molecules/AmountPicker";
import { useCallback, useState } from "react";

interface ShoppingListItemProps {
  item: ShoppingItem;
}

const StyledListItem = styled(ListItem)({
  display: "flex",
  justifyContent: "space-between",
});

const ItemActions = styled("div")({
  display: "flex",
});

const ShoppingItem = ({ item }: ShoppingListItemProps) => {
  const [itemAmount, setItemAmount] = useState(item.amount);
  const handleDelete = () => {
    // TODO: DELETE ITEM FROM LIST
  };

  const debounceEditAmount = useCallback(
    debounce((newAmount: number) => {
      editAmount(newAmount);
    }, 800),
    [debounce]
  );

  const editAmount = (newAmount: number) => {
    console.log(newAmount)
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
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ItemActions>
    </StyledListItem>
  );
};

export default ShoppingItem;
