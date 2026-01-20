import { SESSION_KEY } from "./auth";

export const getUserEmail = (): string | null => {
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) return null;
  return JSON.parse(session)?.email || null;
};

export const saveOrder = (order: any) => {
  const email = getUserEmail();
  if (!email) return;

  const key = `orders_${email}`;
  const existingOrders = JSON.parse(localStorage.getItem(key) || "[]");

  existingOrders.push(order);
  localStorage.setItem(key, JSON.stringify(existingOrders));
};

export const getOrders = () => {
  const email = getUserEmail();
  if (!email) return [];

  return JSON.parse(localStorage.getItem(`orders_${email}`) || "[]");
};
