import api from "./apiConfig.js";

export const validateCheckout = async (checkoutData) => {
  try {
    const { data } = await api.post("/checkout/validate", checkoutData);
    if (data.err) {
      throw new Error(data.err);
    }
    return data;
  } catch (error) {
    console.error("Error validating checkout:", error);
    throw error;
  }
};

export const submitCheckout = async (checkoutData) => {
  try {
    const { data } = await api.post("/checkout/submit", checkoutData);
    if (data.err) {
      throw new Error(data.err);
    }
    return data;
  } catch (error) {
    console.error("Error submitting checkout:", error);
    throw error;
  }
};
