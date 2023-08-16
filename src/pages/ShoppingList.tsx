import { List, styled } from "@mui/material";
import ShoppingListItem from "../components/organisms/ShoppingListItem";
import { ShoppingItem } from "../types/ShoppingListTypes";
import ShoppingItemForm from "../components/organisms/ShoppingItemForm";
import { ShoppingItemFormValues } from "../types/FormTypes";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  useAddItemToShoppingList,
  useFetchShoppingList,
} from "../api/shoppingList";
import { useAppSelector } from "../store/store";
import { selectUserUid } from "../slices/authSlice";
import CenteredCircularProgress from "../components/atoms/CenteredCircularProgress";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../enums/QueryKeys";

const ShoppingListContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "1rem",
});

const StyledList = styled(List)(({ theme }) => ({
  borderRadius: "20px",
  width: "80%",
  maxWidth: "60rem",
  padding: "1rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "0",
  },
}));

const Title = styled("h1")({
  margin: "0",
});

const ShoppingList = () => {
  const userUid = useAppSelector(selectUserUid);
  const { t } = useTranslation();
  const addItemToShoppingListMutation = useAddItemToShoppingList();
  const { data: shoppingList, isFetching } = useFetchShoppingList(userUid);
  const queryClient = useQueryClient();

  const onFormSubmit = (formData: ShoppingItemFormValues) => {
    addItemToShoppingListMutation.mutate(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.shoppingListData]);
      },
    });
  };

  const onDeleteItem = (itemId: string) => {
    // TODO: DELETE RECIPE
  };

  const shoppingData =
    shoppingList &&
    shoppingList.length !== 0 &&
    shoppingList.map((item: ShoppingItem) => (
      <React.Fragment key={item.id}>
        <ShoppingListItem item={item} onDeleteItem={onDeleteItem} />
      </React.Fragment>
    ));

  return (
    <ShoppingListContainer>
      <Title>{t("shoppingList.name")}</Title>
      <StyledList>
        <ShoppingItemForm onFormSubmit={onFormSubmit} />
        {isFetching ? (
          <CenteredCircularProgress />
        ) : shoppingData ? (
          shoppingData
        ) : (
          <div>{t("empty.shoppingList")}</div>
        )}
      </StyledList>
    </ShoppingListContainer>
  );
};

export default ShoppingList;
