import { List, styled } from "@mui/material";
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
  justifyContent: 'center',
  flexDirection: "column",
  gap: '1rem',
});

const StyledList = styled(List)(({theme}) => ({
  borderRadius: '20px',
  width: "80%",
  maxWidth: '60rem',
  padding: '1rem',
  [theme.breakpoints.down('sm')] : {
    width: '100%',
    padding: '0'
  }
}));

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
    //TODO: SEND NEW SHOPPING LIST ITEM TO FIREBASE
  };

  const onDeleteItem = (itemId: string) => {
    const newItems = list.filter((item: ShoppingItem) => item.id !== itemId);
    setList(newItems);
    //TODO: DELETE SHOPPING LIST ITEM FROM FIREBASE
  };

  return (
    <ShoppingListContainer>
      <Title>{t("shoppingList.name")}</Title>
        <StyledList>
          <ShoppingItemForm onFormSubmit={onFormSubmit} />
          {list.map((item: ShoppingItem) => (
            <React.Fragment key={item.id}>
              <ShoppingListItem item={item} onDeleteItem={onDeleteItem} />
            </React.Fragment>
          ))}
        </StyledList>
    </ShoppingListContainer>
  );
};

export default ShoppingList;
