import { IconButton, ListItem, debounce, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ShoppingItem } from "../../types/ShoppingListTypes";
import AmountPicker from "../molecules/AmountPicker";
import { useCallback, useState } from "react";
import { useEditShoppingListItem } from "../../api/shoppingList";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/QueryKeys";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectUserUid } from "../../slices/authSlice";
import { showSnackbar } from "../../slices/snackbarSlice";

interface ShoppingListItemProps {
  item: ShoppingItem;
  onDeleteItem: (itemId: string) => void;
}

const StyledListItem = styled(ListItem)({
  display: "flex",
  justifyContent: "space-between",
});

const ItemActions = styled("div")({
  display: "flex",
});

const ShoppingItem = ({ item, onDeleteItem }: ShoppingListItemProps) => {
  const [itemAmount, setItemAmount] = useState(item.amount);

  const queryClient = useQueryClient();
  const editShoppingListItemMutation = useEditShoppingListItem();
  const userUid = useAppSelector(selectUserUid);
  const dispatch = useAppDispatch();

  const debounceEditAmount = useCallback(
    debounce((newAmount: number) => {
      editAmount(newAmount);
    }, 800),
    []
  );

  const editAmount = (newAmount: number) => {
    if (!item.id) return;
    const newItem: ShoppingItem = { ...item, amount: newAmount, id: item.id };
    editShoppingListItemMutation.mutate(newItem, {
      onSuccess: () => {
        queryClient.setQueryData(
          [QueryKeys.shoppingListData, { userUid: userUid }],
          newItem
        );
      },
      onError: (error) => {
        dispatch(
          showSnackbar({
            message: error.code,
            autoHideDuration: 6000,
            severity: "error",
          })
        );
      },
    });
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
        <IconButton onClick={() => onDeleteItem(item.id!)}>
          <DeleteIcon />
        </IconButton>
      </ItemActions>
    </StyledListItem>
  );
};

export default ShoppingItem;
