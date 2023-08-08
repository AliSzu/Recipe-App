import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import {
  StorageReference,
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { uniqueId } from "../utils/utils";

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

export function useDeleteImage() {
  return useMutation<void, FirebaseError, string>({
    mutationFn: async (imageUrl: string) => {
      const storage = getStorage();
      const imageReference = ref(storage, imageUrl)
      console.log(imageReference)
      await deleteObject(imageReference)
    }
  })
}
