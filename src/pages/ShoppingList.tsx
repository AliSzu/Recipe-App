import { List, styled } from "@mui/material";
import Card from "../components/atoms/Card";
import { MOCK_SHOPPING_LIST } from "../constants/mocks/ShoppingList";
import ShoppingListItem from "../components/organisms/ShoppingListItem";
import { ShoppingItem } from "../types/ShoppingListTypes";

const ShoppingListContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: '90%',
});

const StyledList = styled(List)({
    width: '100%'
})


const ShoppingList = () => {
  return (
    <ShoppingListContainer>
      <Card>
        <StyledList>
          {MOCK_SHOPPING_LIST.map((item: ShoppingItem) => (
            <ShoppingListItem item={item} key={item.id} />
          ))}
        </StyledList>
      </Card>
    </ShoppingListContainer>
  );
};

export default ShoppingList;
