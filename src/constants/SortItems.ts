import { SortItems } from "../types/RecipeTypes";
import { uniqueId } from "../utils/utils";

export const SORT_ITEMS: SortItems[] = [
  {
    name: "sort.alphabetically",
    order: {
      sort: "title",
      direction: "asc",
    },
    id: uniqueId(),
  },
  {
    name: "sort.time",
    order: {
      sort: "time",
      direction: "asc",
    },
    id: uniqueId(),
  },
  {
    name: "sort.updated",
    order: {
      sort: "updatedAt",
      direction: "desc",
    },
    id: uniqueId(),
  },
];
