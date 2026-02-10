import api from "./apiConfig.js";

export const getShops = async () => {
  try {
    const { data } = await api.get("/shops");
    if (data.err) throw new Error(data.err);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getShop = async (shopId) => {};

export const createShop = async (shopId, formData) => {};

export const updateShop = async (shopId, formData) => {};

export const deleteShop = async (shopId) => {};

getShops();
