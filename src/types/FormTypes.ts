import { Ingredient } from "./RecipeTypes";

export interface LoginFormProps {
  email: string;
  password: string;
}

export interface SignUpFormProps {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Preparing {
  step: string
  id: string
}

export interface RecipeFormValues {
  title: string,
  time: string,
  description: string,
  image: FileList,
  preparing: Preparing[],
  ingredients: Ingredient[];
}
