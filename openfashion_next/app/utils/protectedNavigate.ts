import { isLoggedIn } from "./auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const protectedNavigate = (router: AppRouterInstance, path: string) => {
  if (!isLoggedIn()) {
    router.push("/login");
    return;
  }
  router.push(path);
};
