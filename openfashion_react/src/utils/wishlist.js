

const USER_KEY = "users";
const SESSION_KEY = "sessionUser";

export const signup = (user) => {
  const users = JSON.parse(localStorage.getItem(USER_KEY) || "[]");
  users.push(user);
  localStorage.setItem(USER_KEY, JSON.stringify(users));
};

export const login = (email, password) => {
  const users = JSON.parse(localStorage.getItem(USER_KEY) || "[]");
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

export const getCurrentUser = () => {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  return session?.email || null;
};

export const logout = () => {
  try {
    const email = getCurrentUser();
    if (email) localStorage.removeItem(`wishlist_${email}`);

    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event("cartUpdated")); 
  } catch (error) {
    console.error("Error during logout:", error);
  }
};


const getWishlistKey = () => {
  const email = getCurrentUser();
  return email ? `wishlist_${email}` : "wishlist";
};

export const getWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem(getWishlistKey()) || "[]");
  } catch {
    return [];
  }
};

export const isWishlisted = (id) => {
  return getWishlist().some((item) => item.id === id);
};

export const toggleWishlist = (product) => {
  if (!isLoggedIn()) {
    alert("You must be logged in to add products to your wishlist!");
    return;
  }

  if (!product?.id) return;

  let wishlist = getWishlist();
  const exists = wishlist.find((item) => item.id === product.id);

  if (exists) {
    wishlist = wishlist.filter((item) => item.id !== product.id);
  } else {
    wishlist.push(product);
  }

  localStorage.setItem(getWishlistKey(), JSON.stringify(wishlist));
};
