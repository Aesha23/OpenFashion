export const PRODUCTS = [
  {
    id: 1,
    name: "Yellow Floral Dress",
    price: 1200,
    image: "dress1.png",
    rating: 4.2,
    reviews: 92,
  },
  {
    id: 2,
    name: "Black Jacket",
    price: 4000,
    image: "dress2.png",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 3,
    name: "Pink Maxi",
    price: 1500,
    image: "dress3.png",
    rating: 4,
    reviews: 74,
  },
  {
    id: 4,
    name: "Bodycon Dress",
    price: 2500,
    image: "dress4.png",
    rating: 4.8,
    reviews: 40,
  },
];

export const AUTH_KEYS = {
  USERS: "users",
  SESSION_USER: "sessionUser",
};

export const DISCOUNT_THRESHOLD = 100;
export const DISCOUNT_PERCENTAGE = 0.1;

export const CART_MESSAGES = {
  PAYMENT_SUCCESS: "Payment Successful",
  PAYMENT_FAILED: "Payment Failed. Try again.",
};

export const CART_CONFIRM = {
  TITLE: "Remove item?",
  DESC: "Are you sure you want to remove this item from cart?",
  REMOVED: "Item removed from cart",
};

export const WISHLIST_MESSAGES = {
  CONFIRM_TITLE: "Remove item?",
  CONFIRM_DESC: "Are you sure you want to remove this item from wishlist?",
  ADDED_TO_CART: "Added to cart",
  REMOVED: "Removed from wishlist",
};

export const SIGNUP_MESSAGES = {
  CONFIRM_NAME: "Please enter your name.",
  CONFIRM_ALL_FIELDS: "All fields are required.",
  CONFIRM_EMAIL: "Please enter a valid email address.",
  CONFIRM_PASSWORD:
    "Password must be at least 6 characters long, include 1 uppercase and 1 Number.",
  SIGNUP_SUCCESS: "Signup successful! Please login to continue.",
};

export const TOAST_DURATION = 1200;
