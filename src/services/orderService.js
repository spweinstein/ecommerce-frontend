import api from "./apiConfig.js";

export const submitOrder = async (items) => {
  try {
    const { data } = await api.post("/orders", {
      items,
    });
    if (data.err) {
      throw new Error(data.err);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserOrders = async () => {
  try {
    const { data } = await api.get("/orders");
    if (data.err) {
      throw new Error(data.err);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getShopOrders = async (shopId) => {
  try {
    const { data } = await api.get(`/shops/${shopId}/orders`);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserOrder = async (orderId) => {
  try {
    const { data } = await api.get(`/orders/${orderId}`);
    if (data.err) {
      throw new Error(data.err);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getShopOrder = async (shopId, orderId) => {
  try {
    const { data } = await api.get(`/shops/${shopId}/orders/${orderId}`);
    if (data.err) {
      throw new Error(data.err);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
