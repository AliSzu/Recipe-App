import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ENDPOINTS } from "../constants/Endpoints";
import { FirebaseUserData } from "../types/AuthTypes";
import { ErrorData } from "../types/ErrorTypes";

export function useSignIn() {
  return useMutation<AxiosResponse, AxiosError<ErrorData>, FirebaseUserData>({
    mutationFn: (user: FirebaseUserData) => {
      return axios.post(ENDPOINTS.SIGN_IN, {
        ...user,
        returnSecureToken: true,
      });
    },
  });
}

export function useSignUp() {
  return useMutation<AxiosResponse, AxiosError<ErrorData>, FirebaseUserData>({
    mutationFn: (newUser: FirebaseUserData) => {
      return axios.post(ENDPOINTS.CREATE_NEW_USER, {
        ...newUser,
        returnSecureToken: true,
      });
    },
  });
}
