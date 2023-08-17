import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DocumentData,
  Timestamp,
  addDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { ShoppingItemFormValues } from "../types/FormTypes";
import { QueryKeys } from "../enums/QueryKeys";
import { ShoppingItem } from "../types/ShoppingListTypes";
import { shoppingListCollection } from "../firebase";
import { useAuthGuard } from "../hooks/useAuthGuard";

export function useFetchShoppingList(userUid: string) {
  useAuthGuard();
  return useQuery<ShoppingItem[], FirebaseError>({
    queryKey: [QueryKeys.shoppingListData, userUid],
    queryFn: async () => {
      const shoppingListQuery = query(
        shoppingListCollection,
        where('owner', "==", userUid),
        orderBy('createdAt', 'desc')
      );
      const shoppingListSnap = await getDocs(shoppingListQuery);
      const shoppingList: ShoppingItem[] = shoppingListSnap.docs.map((item: DocumentData) => ({
        id: item.id,
        ...item.data(),
      }));
      return shoppingList;
    },
  });
}

export function useAddItemToShoppingList() {
  useAuthGuard();
  return useMutation<void, FirebaseError, ShoppingItemFormValues>({
    mutationFn: async (shoppingItem: ShoppingItemFormValues) => {
      await addDoc(shoppingListCollection, {
        ...shoppingItem,
        createdAt: Timestamp.fromDate(new Date()),
      });
    },
  });
}

