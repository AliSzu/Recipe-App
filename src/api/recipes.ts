import { useQuery } from "@tanstack/react-query";
import { DocumentData, getDocs } from "firebase/firestore";
import { Recipe } from "../types/RecipeTypes";
import { FirebaseError } from "firebase/app";
import { QueryKeys } from "../enums/QueryKeys";
import { Collections } from "../enums/Collections";
import { createCollection } from "../utils/recipeUtils";

export function useFetchRecipes() {
  return useQuery<Recipe[], FirebaseError>({
    queryKey: [QueryKeys.recipesData],
    queryFn: async () => {
      const recipeCollection = createCollection<Recipe>(Collections.recipes);
      const recipeSnap = await getDocs(recipeCollection);
      const recipes = recipeSnap.docs.map((item: DocumentData) => item.data());
      return recipes;
    },
  });
}
