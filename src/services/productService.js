import api from "./apiConfig.js";

export const getProducts = async (shopId) => {
  try {
    // console.log(shopId);
    let query = "/products";
    if (shopId) query += "?shopId=" + shopId;
    const { data } = await api.get(query);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (productId) => {
  try {
    const { data } = await api.get(`/products/${productId}`);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (formData) => {
  try {
    const { data } = await api.post(`/products`, formData);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (productId, formData) => {
  try {
    const { data } = await api.put(`/products/${productId}`, formData);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const { data } = await api.delete(`/products/${productId}`);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// getProducts();
