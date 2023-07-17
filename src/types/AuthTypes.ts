export interface UserInfo {
  email: string;
  refreshToken: string;
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
