import axios from "axios";

const addProduct = (data) => {
  return axios.post("http://localhost:8080/api/app/products", data);
};

const fetchProducts = () => {
  return axios.get("http://localhost:8080/api/app/products");
};

const getProductById = (id) => {
  return axios.get("http://localhost:8080/api/app/products" + id);
};

const updateProductById = (id, data) => {
  return axios.put("http://localhost:8080/api/app/products" + id, data);
};

const deleteAllProducts = () => {
  return axios.delete("http://localhost:8080/api/app/products");
};

const deleteProductById = (id) => {
  return axios.delete("http://localhost:8080/api/app/products" + id);
};

export default {
  addProduct,
  fetchProducts,
  getProductById,
  updateProductById,
  deleteAllProducts,
  deleteProductById,
};
