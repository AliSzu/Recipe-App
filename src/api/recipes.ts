import { useQuery } from "@tanstack/react-query";
import { CollectionReference, DocumentData, collection, getDocs} from "firebase/firestore";
import { db } from "../firebase";
import { Recipe } from "../types/RecipeTypes";
import { FirebaseError } from "firebase/app";
import { QueryKeys } from "../enums/QueryKeys";
import { Collections } from "../enums/Collections";

export function useFetchRecipes() {
  return useQuery<Recipe[], FirebaseError>({
    queryKey: [QueryKeys.recipesData],
    queryFn: async () => {
      const recipeCollection = collection(db, Collections.recipes) as CollectionReference<Recipe>
      const recipeSnap = await getDocs(recipeCollection)
      const recipes = recipeSnap.docs.map((item : DocumentData) => item.data())
      return recipes
    },
  })
}
