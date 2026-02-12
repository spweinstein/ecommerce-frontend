import api from "./apiConfig.js";

export const getProductCategories = async (industryId) => {
  try {
    const { data } = await api.get(`/productCategories?industry=${industryId}`);
    if (data.err) throw new Error(data.err);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
