import {
  Card,
  IconButton,
  InputAdornment,
  ListItem,
  TextField,
  TextFieldProps,
  debounce,
  styled,
} from "@mui/material";
import { ShoppingItem } from "../../types/ShoppingListTypes";
import AmountPicker from "../molecules/AmountPicker";
import { useCallback, useState } from "react";
import {
  useDeleteShoppingListItem,
  useEditShoppingListItem,
} from "../../api/shoppingList";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/QueryKeys";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectUserUid } from "../../slices/authSlice";
import { showSnackbar } from "../../slices/snackbarSlice";
import CardContent from "@mui/material/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import { DEBOUNCE_TIME } from "../../constants/DefaultValues";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

interface ShoppingListItemProps {
  item: ShoppingItem;
}

const StyledTextField = styled(TextField)<TextFieldProps>(({ disabled }) => ({
  ...(disabled && {
    "& fieldset": { border: "none" },
  }),
}));

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
  gap: "0.5rem",
});

const ItemInformation = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
});

const ShoppingItem = ({ item }: ShoppingListItemProps) => {
  const [itemAmount, setItemAmount] = useState(item.amount);
  const [itemName, setItemName] = useState(item.name);
  const [isDisabled, setIsDisabled] = useState(true);

  const queryClient = useQueryClient();
  const { mutate: editMutate } = useEditShoppingListItem();
  const { mutate: deleteMutate } = useDeleteShoppingListItem();
  const userUid = useAppSelector(selectUserUid);
  const dispatch = useAppDispatch();

  const editItem = useCallback(
    (newAmount?: number, newName?: string) => {
      const amount = newAmount ? newAmount : item.amount;
      const name = newName ? newName : item.name;
      if (!item.id) return;
      const newItem: ShoppingItem = { ...item, amount: amount, name: name };
      editMutate(newItem, {
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
    },
    [item, editMutate, queryClient, userUid, dispatch]
  );

  const debounceEditAmount = useCallback(
    (newAmount: number) => {
      debounce(() => {
        editItem(newAmount);
      }, DEBOUNCE_TIME)();
    },
    [editItem]
  );

  const onAmountChange = (amount: number) => {
    setItemAmount(amount);
    debounceEditAmount(amount);
  };

  const handleDeleteItem = () => {
    if (!item.docId) return;
    deleteMutate(item.docId, {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.shoppingListData, userUid]);
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

  const handleEditNameItem = () => {
    setIsDisabled(!isDisabled);
    setItemName(item.name);
  };

  const handleEditItem = () => {
    setIsDisabled(!isDisabled);
    editItem(undefined, itemName);
  };

  const handleChange = (e: any) => {
    setItemName(e.target.value);
  };

  return (
    <StyledListItem>
      <StyledCard>
        <StyledCardContent>
          <ItemActions>
            <StyledIcon
              disableRipple={true}
              size="small"
              onClick={handleEditNameItem}
            >
              <EditIcon />
            </StyledIcon>
            <StyledIcon
              disableRipple={true}
              size="small"
              onClick={handleDeleteItem}
            >
              <CloseIcon />
            </StyledIcon>
          </ItemActions>
          <ItemInformation>
            <StyledTextField
              value={itemName}
              onChange={handleChange}
              fullWidth
              disabled={isDisabled}
              margin="none"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleEditItem()}>
                      {!isDisabled && <CheckIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <AmountPicker amount={itemAmount} onAmountChange={onAmountChange} />
          </ItemInformation>
        </StyledCardContent>
      </StyledCard>
    </StyledListItem>
  );
};

export default ShoppingItem;
