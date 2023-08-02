import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DocumentData,
  getDocs,
  query,
  where,
  documentId,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Recipe } from "../types/RecipeTypes";
import { FirebaseError } from "firebase/app";
import { QueryKeys } from "../enums/QueryKeys";
import { db, recipeCollection } from "../firebase";
import {
  StorageReference,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { uniqueId } from "../utils/recipeUtils";

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

export function useDownloadUrl() {
  return useMutation<string, FirebaseError, StorageReference>({
    mutationFn: async (storageRef: StorageReference) => {
      const url = await getDownloadURL(storageRef);
      return url;
    },
  });
}

export function useUploadImage() {
  return useMutation<StorageReference, FirebaseError, File>({
    mutationFn: async (image: File) => {
      const storage = getStorage();
      const storageRef = ref(storage, `recipe/${uniqueId()}`);
      await uploadBytes(storageRef, image);
      return storageRef
    },
  });
}

export function usePostRecipe() {
  return useMutation<void, FirebaseError, Recipe>({
    mutationFn: async (newRecipe: Recipe) => {
      await addDoc(collection(db, "recipes"), {
        ...newRecipe,
      });
    },
  });
}

export function useDeleteRecipe() {
  return useMutation<void, FirebaseError, string>({
    mutationFn: async (documentId: string) => {
      await deleteDoc(doc(db, 'recipes', documentId))
    }
  })
}
