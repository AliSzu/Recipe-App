import { IconButton, ListItem, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ShoppingItem } from "../../types/ShoppingListTypes";
import AmountPicker from "../molecules/AmountPicker";
import { useState } from "react";

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
    const [itemAmount, setItemAmount] = useState(item.amount)
  const handleDelete = () => {
    console.log("delete");
  };
  const onAmountChange = (amount: number) => setItemAmount(amount)
  return (
    <StyledListItem>
      <div>
        {item.name}
      </div>
      <ItemActions>
        <AmountPicker amount={itemAmount} onAmountChange={onAmountChange}/>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ItemActions>
    </StyledListItem>
  );
};

export default ShoppingItem;
