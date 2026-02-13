import api from "./apiConfig";

export const getCart = async () => {
  try {
    const { data } = await api.get("/cart");
    if (data.err) throw new Error(data.err);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const clearCart = async () => {
  try {
    const { data } = await api.delete("/cart");
    if (data.err) throw new Error(data.err);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (productId) => {
  try {
    const { data } = await api.put(`/cart/${productId}/add`);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = async (productId) => {
  try {
    const { data } = await api.put(`/cart/${productId}/remove`);
    if (data.err) throw new Error(data.err);
    return data;
  } catch (error) {
    console.log(error);
  }
};
