import { DocumentData, OrderByDirection, QueryDocumentSnapshot } from "firebase/firestore";

export interface Recipe {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  owner: string;
  imgSrc: string;
  title: string;
  time: string;
  description: string;
  preparing: Preparing[];
  ingredients: Ingredient[];
}
export interface Ingredient {
  amount: number;
  name: string;
  unit: string;
  id: string;
}

export interface Preparing {
  step: string;
  id: string;
}

export interface InfiniteRecipe {
  recipes: Recipe[];
  doc: QueryDocumentSnapshot<Recipe, DocumentData>;
}

export interface Order {
  sort: string;
  direction: OrderByDirection;
}

export interface SortItems {
  name: string;
  order: Order;
  id: string;
}
