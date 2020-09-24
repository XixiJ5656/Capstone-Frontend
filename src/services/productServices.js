import axios from "axios";

const addProduct = (data) => {
  return axios.post(
    "https://xyz-ecommerce.herokuapp.com/api/app/products",
    data
  );
};

const fetchProducts = () => {
  return axios.get("https://xyz-ecommerce.herokuapp.com/api/app/products");
};

const getProductById = (id) => {
  return axios.get("https://xyz-ecommerce.herokuapp.com/api/app/products" + id);
};

const updateProductById = (id, data) => {
  return axios.put(
    "https://xyz-ecommerce.herokuapp.com/api/app/products" + id,
    data
  );
};

const deleteAllProducts = () => {
  return axios.delete("https://xyz-ecommerce.herokuapp.com/api/app/products");
};

const deleteProductById = (id) => {
  return axios.delete(
    "https://xyz-ecommerce.herokuapp.com/api/app/products" + id
  );
};

export default {
  addProduct,
  fetchProducts,
  getProductById,
  updateProductById,
  deleteAllProducts,
  deleteProductById,
};
