import api from "./apiConfig.js";

export const getIndustries = async () => {
  try {
    const { data } = await api.get("/industries");
    if (data.err) throw new Error(data.err);
    return data;
  } catch (error) {
    console.log(error);
  }
};
