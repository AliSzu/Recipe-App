export interface UserInfo {
  email: string;
  refreshToken: string;
  idToken: string;
}

export interface AuthState {
  userInfo: UserInfo;
  isLoggedIn: boolean;
}

export interface FirebaseUserData {
  email: string;
  password: string;
}
