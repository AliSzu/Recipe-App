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
import { FavoriteRecipe } from "../types/RecipeTypes";

export function useFetchFavorite(userUid: string) {
  useAuthGuard();
  return useQuery<FavoriteRecipe[], FirebaseError>({
    queryKey: [QueryKeys.favoriteData, userUid],
    queryFn: async () => {
      const favoriteQuery = query(
        favoriteCollection,
        where("owner", "==", userUid)
      );
      const favoriteSnap = await getDocs(favoriteQuery);
      const favoriteRecipes: FavoriteRecipe[] = favoriteSnap.docs.map(
        (item: DocumentData) => ({
          docId: item.id,
          ...item.data(),
        })
      );

      return favoriteRecipes;
    },
  });
}

export function useFetchFavoriteById(userUid: string, recipeId?: string) {
  useAuthGuard();
  return useQuery<FavoriteRecipe[], FirebaseError>({
    queryKey: [QueryKeys.favoriteById, userUid, recipeId],
    queryFn: async () => {
      const favoriteQuery = query(
        favoriteCollection,
        where("owner", "==", userUid),
        where("id", "==", recipeId)
      );

      const favoriteSnap = await getDocs(favoriteQuery);
      const favoriteRecipe: FavoriteRecipe[] = favoriteSnap.docs.map(
        (item: DocumentData) => ({
          docId: item.id,
          ...item.data(),
        })
      );

      return favoriteRecipe;
    },
    enabled: !!recipeId
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
