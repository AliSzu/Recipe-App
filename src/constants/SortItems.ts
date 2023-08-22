import { SelectItem } from "../types/RecipeTypes";
import { uniqueId } from "../utils/utils";

export const SORT_ITEMS: SelectItem[] = [
    {
        name: 'sort.alphabetically',
        propertyName: 'title',
        orderDirection: 'asc',
        id: uniqueId()
    },
    {
        name: 'sort.time',
        propertyName: 'time',
        orderDirection: 'asc',
        id: uniqueId()
    },
    {
        name: 'sort.updated',
        propertyName: 'updatedAt',
        orderDirection: 'desc',
        id: uniqueId()
    },
]