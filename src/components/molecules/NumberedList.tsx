import { List, ListItem, styled } from "@mui/material"
import { Preparing } from "../../types/RecipeTypes"

interface NumberedListProps {
    items: Preparing[]
}

const StyledList = styled(List)({
    listStyle: 'decimal'
})

const StyledListItem = styled(ListItem)({
    display: 'list-item',
    listStylePosition: 'inside'
})

const NumberedList = ({items} : NumberedListProps) => {
    return (
        <StyledList>
            {items.map((item: Preparing) => <StyledListItem disableGutters={true} key={item.id}>{item.step}</StyledListItem>)}
        </StyledList>
    )
}

export default NumberedList