import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import {
  StorageReference,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { uniqueId } from "../utils/utils";

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
      return storageRef;
    },
  });
}
