import { Divider, List, styled } from "@mui/material";
import Card from "../components/atoms/Card";
import ShoppingListItem from "../components/organisms/ShoppingListItem";
import { ShoppingItem } from "../types/ShoppingListTypes";
import ShoppingItemForm from "../components/organisms/ShoppingItemForm";
import { ShoppingItemFormValues } from "../types/FormTypes";
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
import React from "react";

const ShoppingListContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

const StyledList = styled(List)({
  width: "100%",
});

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
        <Divider />
        <ShoppingListItem item={item} onDeleteItem={onDeleteItem} />
      </React.Fragment>
    ));

  return (
    <ShoppingListContainer>
      <Title>{t("shoppingList.name")}</Title>
      <Card>
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
      </Card>
    </ShoppingListContainer>
  );
};

export default ShoppingList;
