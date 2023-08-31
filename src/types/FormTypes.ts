import { Ingredient, Preparing } from "./RecipeTypes";

export interface LoginFormProps {
  email: string;
  password: string;
}

export interface SignUpFormProps {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface PasswordFormValues {
  password: string;
  confirmPassword: string;
}

export interface EmailFormValues {
  email: string;
}
export interface RecipeFormValues {
  title: string;
  time: string;
  description: string;
  image?: FileList;
  preparing: Preparing[];
  ingredients: Ingredient[];
  imgSrc: string;
}

export interface ShoppingItemFormValues {
  name: string;
  amount: number;
  owner: string;
  id?: string
}
