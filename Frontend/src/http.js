import axios from "axios";
import store from "@/store";


axios.create({});

axios.interceptors.request.use((config) => {
  const accessToken = store.getters.getAccessToken;
  if (accessToken == null) {
    console.log("no access token");
    return config;
  }
  config.headers["Authorization"] = `Bearer ${accessToken}`;
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest);
    if (
      error.response.status === 401 &&
      originalRequest.url.includes(
        "http://127.0.0.1:8000/api/v1/user/refresh-token/"
      )
    ) {
      store.commit("logout");
      router.push("/login");
      return Promise.reject(error);
    } else if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await store.dispatch("refreshToken");
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

// export default axios;
