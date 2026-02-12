import api from "./apiConfig.js";

export const getShops = async (industryId) => {
  try {
    const { data } = await api.get("/shops", {
      params: {
        industry: industryId,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getShop = async (shopId) => {
  try {
    const { data } = await api.get(`/shops/${shopId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createShop = async (formData) => {
  try {
    const { data } = await api.post("/shops", formData);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateShop = async (shopId, formData) => {
  try {
    const { data } = await api.put(`/shops/${shopId}`, formData);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteShop = async (shopId) => {
  try {
    const { data } = await api.delete(`/shops/${shopId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
};
