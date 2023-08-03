import { List, styled } from "@mui/material";
import Card from "../components/atoms/Card";
import { MOCK_SHOPPING_LIST } from "../constants/mocks/ShoppingList";
import ShoppingListItem from "../components/organisms/ShoppingListItem";
import { ShoppingItem } from "../types/ShoppingListTypes";
import ShoppingItemForm from "../components/organisms/ShoppingItemForm";
import { ShoppingItemFormValues } from "../types/FormTypes";
import { useState } from "react";
import { uniqueId } from "../utils/recipeUtils";

const ShoppingListContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  flexDirection: 'column',
  height: '90%',
});

const StyledList = styled(List)({
    width: '100%'
})


const ShoppingList = () => {
  const [list, setList] = useState(MOCK_SHOPPING_LIST)
  const onFormSubmit = (formData: ShoppingItemFormValues) => {
    const newItem: ShoppingItem = {
      ...formData,
      id: uniqueId()
    }
    setList([...list, newItem])
  }
  return (
    <ShoppingListContainer>
      <Card>
        <StyledList>
          {list.map((item: ShoppingItem) => (
            <ShoppingListItem item={item} key={item.id} />
          ))}
           <ShoppingItemForm onFormSubmit={onFormSubmit}/>
        </StyledList>
      </Card>
    </ShoppingListContainer>
  );
};

export default ShoppingList;
