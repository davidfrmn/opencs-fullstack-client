import { createAuthClient } from "better-auth/svelte";
import { PUBLIC_API_URL } from "$env/static/public";

const authClient = createAuthClient({
  baseURL: PUBLIC_API_URL,
});

export { authClient };