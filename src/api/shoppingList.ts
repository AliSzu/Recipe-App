import { useMutation, useQuery } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
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

export function useFetchShoppingList(userUid: string) {
  return useQuery<ShoppingItem[], FirebaseError>({
    queryKey: [QueryKeys.shoppingListData, userUid],
    queryFn: async () => {
      const shoppingListQuery = query(
        shoppingListCollection,
        where("owner", "==", userUid),
        orderBy("createdAt", "desc")
      );
      const shoppingListSnap = await getDocs(shoppingListQuery);
      const shoppingList: ShoppingItem[] = shoppingListSnap.docs.map(
        (item: DocumentData) => ({
          id: item.id,
          ...item.data(),
        })
      );
      return shoppingList;
    },
  });
}

export function useAddItemToShoppingList() {
  return useMutation<void, FirebaseError, ShoppingItemFormValues>({
    mutationFn: async (shoppingItem: ShoppingItemFormValues) => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      await addDoc(shoppingListCollection, {
        ...shoppingItem,
        owner: user?.uid,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      });
    },
  });
}

export function useEditShoppingListItem() {
  return useMutation<void, FirebaseError, ShoppingItem>({
    mutationFn: async (ShoppingItem: ShoppingItem) => {
      const { id, ...item } = ShoppingItem;
      if (!id) return;
      const docRef = doc(db, Collections.shoppingList, id);
      await updateDoc(docRef, {
        ...item,
        updatedAt: Timestamp.fromDate(new Date()),
      });
    },
  });
}

export function useDeleteShoppingListItem() {
  return useMutation<void, FirebaseError, string>({
    mutationFn: async (itemId: string) => {
      await deleteDoc(doc(db, Collections.shoppingList, itemId));
    },
  });
}
