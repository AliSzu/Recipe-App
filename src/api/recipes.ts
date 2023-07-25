import { useQuery } from "@tanstack/react-query";
import {
  DocumentData,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore";
import { Recipe } from "../types/RecipeTypes";
import { FirebaseError } from "firebase/app";
import { QueryKeys } from "../enums/QueryKeys";
import { recipeCollection } from "../firebase";

export function useFetchRecipes() {
  return useQuery<Recipe[], FirebaseError>({
    queryKey: [QueryKeys.recipesData],
    queryFn: async () => {
      const recipeSnap = await getDocs(recipeCollection);
      const recipes: Recipe[] = recipeSnap.docs.map((item: DocumentData) => ({
        id: item.id,
        ...item.data(),
      }));
      return recipes;
    },
  });
}

export function useFetchRecipeById(id?: string) {
  return useQuery<Recipe, FirebaseError>({
    queryKey: [QueryKeys.recipeById, id],
    queryFn: async () => {
      const recipeQuery = query(
        recipeCollection,
        where(documentId(), "==", id)
      );
      const recipeSnap = await getDocs(recipeQuery);
      const recipeArray: Recipe[] = recipeSnap.docs.map(
        (item: DocumentData) => ({
          id: item.id,
          ...item.data(),
        })
      );
      const recipe: Recipe = Object.assign({}, ...recipeArray);
      return recipe;
    },
  });
}
