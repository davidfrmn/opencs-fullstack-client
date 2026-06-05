import { browser } from "$app/environment";
import * as authApi from "$lib/apis/authApi.js";

const USER_KEY = "user";
const TOKEN_KEY = "token";

let user = $state(null);
let token = $state(null);

if (browser) {
  const storedUser = localStorage.getItem(USER_KEY);
  const storedToken = localStorage.getItem(TOKEN_KEY);

  if (storedUser) {
    user = JSON.parse(storedUser);
  }
  if (storedToken) {
    token = storedToken;
  }
}

const useAuthState = () => {
  return {
    get user() {
      return user;
    },
    get token() {
      return token;
    },
    login: async (email, password) => {
      await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      }, {
        onError: (ctx) => {
          throw new Error(ctx.error.message || "Login failed");
        },
        onSuccess: (ctx) => {
          const authToken = ctx.response.headers.get("set-auth-token");
          if (authToken) {
            localStorage.setItem(TOKEN_KEY, authToken);
          }
          const user = ctx.data.user;
          if (user) {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
          }
        },
      });
    },
    register: async (email, password) => {
      await authClient.signUp.email({
        email,
        password,
        name: email,
        callbackURL: "/auth/login",
      }, {
        onError: (ctx) => {
          throw new Error(ctx.error.message || "Registration failed");
        },
        onSuccess: (ctx) => {
          window.location.href = "/auth/login";
        },
      });
    },
    logout: async () => {
      user = null;
      token = null;
      await authClient.signOut();

      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = "/";
    },
  };
};

export { useAuthState };