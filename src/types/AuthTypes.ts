export interface UserInfo {
  uid: string
}

export interface UserResponse {
  data: {
    uid: string
  };
}

export interface AuthState {
  userUid: string,
  isLoggedIn: boolean;
}

export interface FirebaseUserData {
  email: string;
  password: string;
}
