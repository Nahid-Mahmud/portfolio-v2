import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookies } from "./DeleteCookies";

export const logoutUser = (router: AppRouterInstance) => {
  localStorage.removeItem("accessToken");
  deleteCookies(["accessToken", "refreshToken"]);
  router.push("/login");
  router.refresh();
  // hello
};
