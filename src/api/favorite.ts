import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthGuard } from "../hooks/useAuthGuard";
import { FirebaseError } from "firebase/app";
import { QueryKeys } from "../enums/QueryKeys";
import {
  DocumentData,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { favoriteCollection } from "../firebase";
import { FavoriteRecipe, Recipe } from "../types/RecipeTypes";
import { ShoppingItemFormValues } from "../types/FormTypes";
import { selectUserUid } from "../slices/authSlice";

export function useFetchFavorite(userUid: string) {
  useAuthGuard();
  return useQuery<Recipe[], FirebaseError>({
    queryKey: [QueryKeys.favoriteData, userUid],
    queryFn: async () => {
      const favoriteQuery = query(
        favoriteCollection,
        where("owner", "==", userUid)
      );
      const favoriteSnap = await getDocs(favoriteQuery);
      const favoriteRecipes: Recipe[] = favoriteSnap.docs.map(
        (item: DocumentData) => ({
          id: item.id,
          ...item.data(),
        })
      );

      return favoriteRecipes;
    },
  });
}

export function useAddRecipeToFavorite() {
  useAuthGuard();
  return useMutation<void, FirebaseError, FavoriteRecipe>({
    mutationFn: async (recipe: FavoriteRecipe) => {
      await addDoc(favoriteCollection, {
        ...recipe,
      });
    },
  });
}
