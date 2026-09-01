import axios from "axios";

const API_URL = "http://localhost:5000/api/products";
const ORDERS_URL = "http://localhost:5000/api/orders";

// ── Products ──────────────────────────────
export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// ── Orders ────────────────────────────────
export const placeOrder = async (orderData) => {
  const response = await axios.post(ORDERS_URL, orderData);
  return response.data;
};

export const getOrders = async () => {
  const response = await axios.get(ORDERS_URL);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await axios.put(`${ORDERS_URL}/${id}`, { status });
  return response.data;
};