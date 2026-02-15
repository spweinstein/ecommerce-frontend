import axios from "axios";

const getToken = () => {
  return new Promise((resolve) => {
    const token = localStorage.getItem("token");
    resolve(token ? `Bearer ${token}` : null);
  });
};

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_SERVER_URL}`,
});

api.interceptors.request.use(
  async function (config) {
    const token = await getToken();

    if (token) {
      config.headers["Authorization"] = token;
    }

    return config;
  },
  function (error) {
    console.log("Request error: ", error);
    return Promise.reject(error);
  },
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          // Forbidden - user doesn't have permission
          window.location.href = "/unauthorized";
          break;
        case 401:
          // Unauthorized - token invalid/expired
          localStorage.removeItem("token");
          window.location.href = "/sign-in";
          break;
      }
    }
    return Promise.reject(error);
  },
);

export default api;
