import { redirect } from "@sveltejs/kit";
import { browser } from "$app/environment";

export const load = () => {
  if (browser) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw redirect(307, "/auth/login");
    }
  }

  return {};
};