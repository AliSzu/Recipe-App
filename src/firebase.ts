import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FavoriteRecipe, Recipe } from "./types/RecipeTypes";
import { Collections } from "./enums/Collections";
import { ShoppingItem } from "./types/ShoppingListTypes";
import { createCollection } from "./utils/utils";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const recipeCollection = createCollection<Recipe>(Collections.recipes);
export const shoppingListCollection  = createCollection<ShoppingItem>(Collections.shoppingList)
export const favoriteCollection = createCollection<FavoriteRecipe>(Collections.favorite)

export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);
