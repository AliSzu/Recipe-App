import { List, ListItem, styled } from "@mui/material"

interface NumberedListProps {
    items: string[]
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
            {items.map((item: string) => <StyledListItem disableGutters={true} key={item}>{item}</StyledListItem>)}
        </StyledList>
    )
}

export default NumberedList