import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DocumentData,
  Timestamp,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { ShoppingItemFormValues } from "../types/FormTypes";
import { QueryKeys } from "../enums/QueryKeys";
import { ShoppingItem } from "../types/ShoppingListTypes";
import { db, shoppingListCollection } from "../firebase";
import { Collections } from "../enums/Collections";
import { useAuthGuard } from "../hooks/useAuthGuard";

export function useFetchShoppingList(userUid: string) {
  useAuthGuard();
  return useQuery<ShoppingItem[], FirebaseError>({
    queryKey: [QueryKeys.shoppingListData, userUid],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const shoppingListQuery = query(
        shoppingListCollection,
        where("owner", "==", userUid),
        orderBy("createdAt", "desc")
      );
      const shoppingListSnap = await getDocs(shoppingListQuery);
      const shoppingList: ShoppingItem[] = shoppingListSnap.docs.map(
        (item: DocumentData) => ({
          docId: item.id,
          ...item.data(),
        })
      );
      return shoppingList;
    },
  });
}

export function useFetchShoppingListItem(userUid: string, itemId: string) {
  useAuthGuard();
  return useQuery<ShoppingItem[], FirebaseError>({
    queryKey: [QueryKeys.shoppingListItem, userUid, itemId],
    queryFn: async () => {
      const shoppingListQuery = query(
        shoppingListCollection,
        where("owner", "==", userUid),
        where("id", "==", itemId),
      );
      const shoppingListSnap = await getDocs(shoppingListQuery);
      const shoppingList: ShoppingItem[] = shoppingListSnap.docs.map(
        (item: DocumentData) => ({
          docId: item.id,
          ...item.data(),
        })
      );
      return shoppingList;
    },
  });
}

export function useAddNewItemToShoppingList() {
  useAuthGuard();
  return useMutation<void, FirebaseError, ShoppingItemFormValues>({
    mutationFn: async (shoppingItem: ShoppingItemFormValues) => {
      await addDoc(shoppingListCollection, {
        ...shoppingItem,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      });
    },
  });
}

export function useAddItemToShoppingList() {
  useAuthGuard();
  return useMutation<string, FirebaseError, ShoppingItemFormValues>({
    mutationFn: async (shoppingItem: ShoppingItemFormValues) => {
        const response = await addDoc(shoppingListCollection, {
          ...shoppingItem,
          createdAt: Timestamp.fromDate(new Date()),
          updatedAt: Timestamp.fromDate(new Date()),
        });
        
        return response.id
    },
  });
}

export function useEditShoppingListItem() {
  useAuthGuard();
  return useMutation<void, FirebaseError, ShoppingItem>({
    mutationFn: async (ShoppingItem: ShoppingItem) => {
      const { docId, ...item } = ShoppingItem;
      if (!docId) return;
      const docRef = doc(db, Collections.shoppingList, docId);
      await updateDoc(docRef, {
        amount: item.amount,
        name: item.name,
        updatedAt: Timestamp.fromDate(new Date()),
      });
    },
  });
}

export function useDeleteShoppingListItem() {
  useAuthGuard();
  return useMutation<void, FirebaseError, string>({
    mutationFn: async (itemId: string) => {
      await deleteDoc(doc(db, Collections.shoppingList, itemId));
    },
  });
}
