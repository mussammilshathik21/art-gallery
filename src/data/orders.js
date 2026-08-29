// ==========================================
// SHARED ORDER DATA
// Written by Checkout, read by Orders (per
// user) and by the Admin dashboard (all users).
// ==========================================

const ORDERS_KEY = "ak-arts-orders";

/*
  The delivery pipeline an order moves through.
  "Cancelled" is a separate terminal state, not
  part of the forward progression.
*/
export const ORDER_STEPS = [
  "Placed",
  "Confirmed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

export function loadOrders() {
  const raw = localStorage.getItem(ORDERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function addOrder(order) {
  const orders = loadOrders();
  const updated = [order, ...orders];

  saveOrders(updated);
  return updated;
}

export function updateOrderStatus(id, status) {
  const orders = loadOrders();

  const updated = orders.map((order) =>
    order.id === id ? { ...order, status } : order
  );

  saveOrders(updated);
  return updated;
}

export function getOrdersForUser(email) {
  return loadOrders().filter(
    (order) => order.customerEmail === email
  );
}

export function generateOrderId() {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);

  return `AG-${year}-${random}`;
}
