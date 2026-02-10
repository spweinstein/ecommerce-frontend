import api from "./apiConfig.js";

export const getProducts = async () => {
  try {
    const { data } = await api.get("/products");
    if (data.err) throw new Error(data.err);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (ProductId) => {};

export const createProduct = async (ProductId, formData) => {};

export const updateProduct = async (ProductId, formData) => {};

export const deleteProduct = async (ProductId) => {};

// getProducts();
