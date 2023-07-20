export interface UserInfo {
  email: string | null;
  refreshToken: string;
  uid: string
}

export interface UserResponse {
  data: {
    userInfo: UserInfo;
  };
}

export interface AuthState {
  userInfo: UserInfo;
  isLoggedIn: boolean;
}

export interface FirebaseUserData {
  email: string;
  password: string;
}
