import api from "./apiConfig.js";

export const getUsers = async () => {
  try {
    const { data } = await api.get("/users");
    
    if (data.err) {
      throw new Error(data.err);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};
