const SESSION_KEY = "sessionUser";

const getCurrentUserEmail = () => {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  return session?.email || null;
};

const getCartKey = () => {
  const email = getCurrentUserEmail();
  return email ? `cart_${email}` : null;
};

const notifyCartUpdate = () => {
  window.dispatchEvent(new Event("cartUpdated"));
};

export function getCart() {
  const key = getCartKey();
  if (!key) return [];
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

export function addToCart(product) {
  const key = getCartKey();
  if (!key) {
    alert("Please login to add items to cart");
    return;
  }

  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(key, JSON.stringify(cart));
  notifyCartUpdate();
}

export function removeFromCart(id) {
  const key = getCartKey();
  if (!key) return;

  const cart = getCart().filter((item) => item.id !== id);
  localStorage.setItem(key, JSON.stringify(cart));
  notifyCartUpdate();
}

export function clearCart() {
  const key = getCartKey();
  if (!key) return;

  localStorage.removeItem(key);
  notifyCartUpdate();
}

export function updateCartQuantity(id, newQuantity) {
  const key = getCartKey();
  if (!key) return;

  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.quantity = Math.max(1, newQuantity);
    localStorage.setItem(key, JSON.stringify(cart));
    notifyCartUpdate();
  }
}
