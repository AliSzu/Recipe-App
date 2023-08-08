import { Divider, List, styled } from "@mui/material";
import Card from "../components/atoms/Card";
import { MOCK_SHOPPING_LIST } from "../constants/mocks/ShoppingList";
import ShoppingListItem from "../components/organisms/ShoppingListItem";
import { ShoppingItem } from "../types/ShoppingListTypes";
import ShoppingItemForm from "../components/organisms/ShoppingItemForm";
import { ShoppingItemFormValues } from "../types/FormTypes";
import React, { useState } from "react";
import { uniqueId } from "../utils/recipeUtils";
import { useTranslation } from "react-i18next";

const ShoppingListContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

const StyledList = styled(List)({
  width: "100%",
  paddingBottom: "0",
});

const Title = styled("h1")({
  margin: "0",
});

const ShoppingList = () => {
  const [list, setList] = useState(MOCK_SHOPPING_LIST);
  const { t } = useTranslation();
  const onFormSubmit = (formData: ShoppingItemFormValues) => {
    const newItem: ShoppingItem = {
      ...formData,
      id: uniqueId(),
    };
    setList([newItem, ...list]);
  };

  const onDeleteItem = (itemId: string) => {
    const newItems = list.filter((item: ShoppingItem) => item.id !== itemId);
    setList(newItems);
  };

  return (
    <ShoppingListContainer>
      <Title>{t("shoppingList.name")}</Title>
      <Card>
        <StyledList>
          <ShoppingItemForm onFormSubmit={onFormSubmit} />
          {list.map((item: ShoppingItem) => (
            <React.Fragment key={item.id}>
              <Divider/>
              <ShoppingListItem item={item} onDeleteItem={onDeleteItem} />
            </React.Fragment>
          ))}
        </StyledList>
      </Card>
    </ShoppingListContainer>
  );
};

export default ShoppingList;
