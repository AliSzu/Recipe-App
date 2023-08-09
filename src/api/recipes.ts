import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DocumentData,
  getDocs,
  query,
  where,
  documentId,
  addDoc,
  orderBy,
  OrderByDirection,
} from "firebase/firestore";
import { Recipe } from "../types/RecipeTypes";
import { FirebaseError } from "firebase/app";
import { QueryKeys } from "../enums/QueryKeys";
import { recipeCollection } from "../firebase";

export function useFetchRecipes( sortProperty: string, sortOrder?: OrderByDirection) {
  return useQuery<Recipe[], FirebaseError>({
    queryKey: [QueryKeys.recipesData, sortOrder, sortProperty],
    queryFn: async () => {
      const recipeQuery = query(recipeCollection, orderBy(sortProperty, sortOrder));
      const recipeSnap = await getDocs(recipeQuery);
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

export function usePostRecipe() {
  return useMutation<void, FirebaseError, Recipe>({
    mutationFn: async (newRecipe: Recipe) => {
      await addDoc(recipeCollection, {
        ...newRecipe,
      });
    },
  });
}
