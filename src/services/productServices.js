import axios from "axios";

const addProduct = (data) => {
  return axios.post("/api/app/products", data);
};

const fetchProducts = () => {
  return axios.get("/api/app/products");
};

const getProductById = (id) => {
  return axios.get("/api/app/products" + id);
};

const updateProductById = (id, data) => {
  return axios.put("/api/app/products" + id, data);
};

const deleteAllProducts = () => {
  return axios.delete("/api/app/products");
};

const deleteProductById = (id) => {
  return axios.delete("/api/app/products" + id);
};

export default {
  addProduct,
  fetchProducts,
  getProductById,
  updateProductById,
  deleteAllProducts,
  deleteProductById,
};
