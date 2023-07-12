import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ENDPOINTS } from "../constants/apiEndpoints";

export function useSignIn() {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => {
      return axios.post(ENDPOINTS.SIGN_IN, {
        ...user,
        returnSecureToken: true,
      });
    },
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: (newUser: { email: string; password: string }) => {
      return axios.post(ENDPOINTS.CREATE_NEW_USER, {
        ...newUser,
        returnSecureToken: true,
      });
    },
  });
}
