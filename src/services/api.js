import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getOrders = () => API.get("/orders");

export const getInventory = () => API.get("/inventory");

export const getDashboard = () => API.get("/dashboard");

export const createOrder = (order) =>
  API.post("/orders", order);

export const addMedicine = (medicine) =>
  API.post("/inventory", medicine);

export const updateInventory = (id, data) =>
  API.put(`/inventory/${id}`, data);

export default API;