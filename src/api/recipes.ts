import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  DocumentData,
  getDocs,
  query,
  where,
  documentId,
  addDoc,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";
import { InfiniteRecipe, Recipe } from "../types/RecipeTypes";
import { FirebaseError } from "firebase/app";
import { QueryKeys } from "../enums/QueryKeys";
import { recipeCollection } from "../firebase";

export function useFetchRecipes(sortProperty: string) {
  return useInfiniteQuery<InfiniteRecipe, FirebaseError>({
    queryKey: [QueryKeys.recipesData, sortProperty],
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    queryFn: async ({ pageParam }) => {
      let recipeQuery;

      if (pageParam) {
        recipeQuery = query(
          recipeCollection,
          orderBy(sortProperty),
          startAfter(pageParam),
          limit(10)
        );
      } else {
        recipeQuery = query(recipeCollection, limit(10), orderBy(sortProperty));
      }

      const recipeSnap = await getDocs(recipeQuery);
      const recipes: Recipe[] = recipeSnap.docs.map((item: DocumentData) => ({
        id: item.id,
        ...item.data(),
      }));

      const doc = recipeSnap.docs[recipeSnap.docs.length - 1];
      return { recipes, doc };
    },
    getNextPageParam: (lastPage) => lastPage.doc,
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
