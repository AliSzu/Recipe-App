import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DocumentData,
  getDocs,
  query,
  where,
  documentId,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { Recipe } from "../types/RecipeTypes";
import { FirebaseError } from "firebase/app";
import { QueryKeys } from "../enums/QueryKeys";
import { db, recipeCollection } from "../firebase";
import { useAuthGuard } from "../hooks/useAuthGuard";
import { Collections } from "../enums/Collections";

export function useFetchRecipes() {
  useAuthGuard();
  return useQuery<Recipe[], FirebaseError>({
    queryKey: [QueryKeys.recipesData],
    queryFn: async () => {
      const recipeQuery = query(recipeCollection, orderBy("createdAt", "desc"));
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
