import { clearCart } from "./cart";

const USER_KEY = "users";
const SESSION_KEY = "sessionUser";

export const signup = (user) => {
  const users = JSON.parse(localStorage.getItem(USER_KEY)) || [];
  users.push(user);
  localStorage.setItem(USER_KEY, JSON.stringify(users));
};

export const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem(USER_KEY)) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
    return true;
  }
  return false;
};

export const isLoggedIn = () => {
  return !!localStorage.getItem(SESSION_KEY);
};

export const logout = () => {
  try {
    clearCart();
    const session = JSON.parse(localStorage.getItem(SESSION_KEY));
    if (session?.email) {
      localStorage.removeItem(`wishlist_${session.email}`);
    }
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event("cartUpdated"));
  } catch (error) {
    console.error("Error During Logout:", error);
  }
};
