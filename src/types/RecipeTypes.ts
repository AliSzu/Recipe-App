import {
  DocumentData,
  OrderByDirection,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Category } from "../enums/Category";

export interface Recipe {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  owner: string;
  imgSrc: string;
  title: string;
  time: string;
  category: Category;
  description: string;
  preparing: Preparing[];
  ingredients: Ingredient[];
}

export interface FavoriteRecipe extends Recipe {
  owner: string
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

export interface SelectItem {
  name: string;
  id: string;
  propertyName: string;
  orderDirection?: OrderByDirection;
}
