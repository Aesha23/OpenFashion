import { isLoggedIn } from "./auth";

const KEY = "wishlist";

export const getWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
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
    wishlist.push({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  }

  localStorage.setItem(KEY, JSON.stringify(wishlist));
};
