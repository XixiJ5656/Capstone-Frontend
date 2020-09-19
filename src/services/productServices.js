import axios from "axios";

const addProduct = (product) => {
  return axios.post("http://localhost:8080/api/app/products", product);
};

const getAllProducts = () => {
  return axios.get("http://localhost:8080/api/app/products");
};

const getProductById = (id) => {
  return axios.get("http://localhost:8080/api/app/products" + id);
};

const updateProductById = (id, product) => {
  return axios.put("http://localhost:8080/api/app/products" + id, product);
};

const deleteAllProducts = () => {
  return axios.delete("http://localhost:8080/api/app/products");
};

const deleteProductById = (id) => {
  return axios.delete("http://localhost:8080/api/app/products" + id);
};

export default {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteAllProducts,
  deleteProductById,
};
