import {
  CollectionReference,
  DocumentData,
  collection,
  getFirestore,
} from "firebase/firestore";

export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(getFirestore(), collectionName) as CollectionReference<T,DocumentData>;
};
