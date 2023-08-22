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
  deleteDoc,
  doc,
  Timestamp,
  updateDoc,
  QueryConstraint,
} from "firebase/firestore";
import { InfiniteRecipe, Order, Recipe } from "../types/RecipeTypes";
import { FirebaseError } from "firebase/app";
import { QueryKeys } from "../enums/QueryKeys";
import { db, recipeCollection } from "../firebase";
import { useAuthGuard } from "../hooks/useAuthGuard";
import { Collections } from "../enums/Collections";

export function useFetchRecipes(orderElemenets: Order, filter?: string) {
  return useInfiniteQuery<InfiniteRecipe, FirebaseError>({
    queryKey: [QueryKeys.recipesData, orderElemenets, filter],
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    queryFn: async ({ pageParam }) => {
      let recipeConstrains: QueryConstraint[] = []

      if (filter) recipeConstrains.push(where('category', '==', filter))

      let recipeQuery = query(
        recipeCollection,
        orderBy(orderElemenets.sort, orderElemenets.direction),
        limit(10),
        ...recipeConstrains
      );

      if (pageParam) {
        recipeQuery = query(
          recipeQuery,
          startAfter(pageParam),
        );
      }
      const recipeSnap = await getDocs(recipeQuery);
      const recipes: Recipe[] = recipeSnap.docs.map((item: DocumentData) => ({
        id: item.id,
        ...item.data(),
      }));

      const doc = recipeSnap.docs[recipeSnap.docs.length - 1];
      return { recipes, doc };
    },
    getNextPageParam: (lastPage) => lastPage.doc ?? undefined
  });
}

export function useFetchRecipeById(id?: string) {
  useAuthGuard();
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
  useAuthGuard();
  return useMutation<string, FirebaseError, Recipe>({
    mutationFn: async (newRecipe: Recipe) => {
      const docRef = await addDoc(recipeCollection, {
        ...newRecipe,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      });
      return docRef.id;
    },
  });
}

export function useDeleteRecipe() {
  useAuthGuard();
  return useMutation<void, FirebaseError, string>({
    mutationFn: async (documentId: string) => {
      await deleteDoc(doc(db, Collections.recipes, documentId));
    },
  });
}

export function useEditRecipe() {
  useAuthGuard();
  return useMutation<void, FirebaseError, Recipe>({
    mutationFn: async (newRecipe: Recipe) => {
      const { id, ...recipe } = newRecipe;
      if (!id) return;
      await updateDoc(doc(db, Collections.recipes, id), {
        ...recipe,
        updatedAt: Timestamp.fromDate(new Date()),
      });
    },
  });
}
