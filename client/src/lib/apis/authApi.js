import { PUBLIC_API_URL } from "$env/static/public";

const login = async (credentials) => {
  return await fetch(`${PUBLIC_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
};

const register = async (user) => {
  return await fetch(`${PUBLIC_API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

export { login, register };