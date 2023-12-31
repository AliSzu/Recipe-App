import { useMutation } from "@tanstack/react-query";
import { FirebaseUserData } from "../types/AuthTypes";
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export function useSignIn() {
  return useMutation<User, FirebaseError, FirebaseUserData>({
    mutationFn: async (user: FirebaseUserData) => {
      const responseSignIn = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      return responseSignIn.user;
    },
  });
}

export function useSignUp() {
  return useMutation<User, FirebaseError, FirebaseUserData>({
    mutationFn: async (newUser: FirebaseUserData) => {
      const responseSignUp = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );
      return responseSignUp.user;
    },
  });
}

export function useSignOut() {
  return useMutation<void, FirebaseError, void>({
    mutationFn: async () => {
      await signOut(auth);
    },
  });
}

export function useSignInWithGoogle() {
  return useMutation<User, FirebaseError, GoogleAuthProvider>({
    mutationFn: async (provider: GoogleAuthProvider) => {
      const responseGoogle = await signInWithPopup(auth, provider);
      return responseGoogle.user;
    },
  });
}
