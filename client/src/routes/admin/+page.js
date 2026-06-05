import { browser } from "$app/environment";
import { error } from "@sveltejs/kit";
import { goto } from "$app/navigation";

export const load = () => {
  if (browser) {
    const user = localStorage.getItem("user");
    if (!user) {
      goto("/auth/login");
    }

    const roles = JSON.parse(user).roles || [];
    if (!roles.includes("ADMIN")) {
      throw error(403, "Access denied");
    }
  }
};