import { useQuery } from "@tanstack/react-query";
import { DocumentData, getDocs } from "firebase/firestore";
import { Recipe } from "../types/RecipeTypes";
import { FirebaseError } from "firebase/app";
import { QueryKeys } from "../enums/QueryKeys";
import { recipeCollection } from "../firebase";

export function useFetchRecipes() {
  return useQuery<Recipe[], FirebaseError>({
    queryKey: [QueryKeys.recipesData],
    queryFn: async () => {
      const recipeSnap = await getDocs(recipeCollection);
      const recipes: Recipe[] = recipeSnap.docs.map((item: DocumentData) => (
        {
          id: item.id,
          ...item.data()
        }
      ));
      return recipes;
    },
  });
}
