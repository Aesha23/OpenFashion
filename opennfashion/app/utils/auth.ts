import { clearCart } from "./cart";

export const USER_KEY = "users";
export const SESSION_KEY = "sessionUser";

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  address?: string;
}

export const signup = (user: SignupForm): void => {
  if (typeof window === "undefined") return;

  const users: SignupForm[] = JSON.parse(
    localStorage.getItem(USER_KEY) || "[]"
  );

  users.push(user);
  localStorage.setItem(USER_KEY, JSON.stringify(users));
};

export const login = (email: string, password: string): boolean => {
  if (typeof window === "undefined") return false;

  const users: SignupForm[] = JSON.parse(
    localStorage.getItem(USER_KEY) || "[]"
  );

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
    return true;
  }

  return false;
};

export const isLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(SESSION_KEY);
};

export const logout = (): void => {
  if (typeof window === "undefined") return;

  try {
    clearCart();

    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "{}");

    if (session?.email) {
      localStorage.removeItem(`wishlist_${session.email}`);
    }

    localStorage.removeItem(SESSION_KEY);

    window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Error During Logout:", error);
  }
};
