export const ENDPOINTS = {
  CREATE_NEW_USER: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
    import.meta.env.VITE_API_KEY
  }`,
  SIGN_IN: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
    import.meta.env.VITE_API_KEY
  }`,
};
