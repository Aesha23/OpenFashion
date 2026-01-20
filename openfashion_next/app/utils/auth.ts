import bcrypt from "bcryptjs";
import { clearCart } from "./cart";

export const USER_KEY = "users";
export const SESSION_KEY = "sessionUser";
export const AUTH_EVENT = "authChanged";

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  address?: string;
}

export const signup = async (user: SignupForm): Promise<void> => {
  if (typeof window === "undefined") return;

  const users: SignupForm[] = JSON.parse(
    localStorage.getItem(USER_KEY) || "[]",
  );

  const hashedPassword = await bcrypt.hash(user.password, 10);

  users.push({
    ...user,
    password: hashedPassword,
  });
  localStorage.setItem(USER_KEY, JSON.stringify(users));
};

export const login = async (
  email: string,
  password: string,
): Promise<boolean> => {
  if (typeof window === "undefined") return false;

  const users: SignupForm[] = JSON.parse(
    localStorage.getItem(USER_KEY) || "[]",
  );

  const user = users.find((u) => u.email === email);
  if (!user) {
    return false;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return false;
  }

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      email: user.email,
      name: user.name,
      address: user.address || "",
    }),
  );

  window.dispatchEvent(new Event(AUTH_EVENT));
  return true;
};

export const isLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(SESSION_KEY);
};

export const logout = (): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(SESSION_KEY);

    window.dispatchEvent(new Event(AUTH_EVENT));
  } catch (error) {
    console.error("Error During Logout:", error);
  }
};

export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;

  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    if (!session?.email) return null;

    const users = JSON.parse(localStorage.getItem(USER_KEY) || "[]");

    return users.find((u: any) => u.email === session.email) || null;
  } catch {
    return null;
  }
};
