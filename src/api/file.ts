import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import {
  StorageReference,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { uniqueId } from "../utils/recipeUtils";

const uploadAndGetUrl = async (storageRef: StorageReference, image: File) => {
    await uploadBytes(storageRef, image)
    const url = await getDownloadURL(storageRef)
    return url
}

export function useUploadImage() {
  return useMutation<string, FirebaseError, File>({
    mutationFn: async (image: File) => {
      const storage = getStorage();
      const storageRef = ref(storage, `recipe/${uniqueId()}`);
      const url = await uploadAndGetUrl(storageRef, image)
      return url
    },
  });
}
