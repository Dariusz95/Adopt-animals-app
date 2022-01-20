const TOKEN_URL = "http://127.0.0.1:8000/api/v1/user/login/";
import axios from "axios";

const state = {
  accesToken: null,
  refreshToken: null,
  isAuthenticated: false,
  errorLogin: "",
};

const getters = {
  getAccessToken(state) {
    return state.accesToken;
  },
  getRefreshToken(state) {
    return state.refreshToken;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  getErrorLogin(state) {
    return state.errorLogin;
  },
};

const mutations = {
  setAccessToken(state, accessToken) {
    state.accesToken = accessToken;
  },
  setRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken;
  },
  setAuthenticated(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
  setErrorLogin(state, err) {
    state.errorLogin = err;
  },
};

const actions = {
  async login(context, payload) {
    try {
      const response = await axios.post(TOKEN_URL, payload);
      context.commit("setAccessToken", response.data.access);
      context.commit("setRefreshToken", response.data.refresh);
      context.commit("setAuthenticated", true);
    } catch (err) {
      context.commit("setAccessToken", null);
      context.commit("setRefreshToken", null);
      context.commit("setAuthenticated", false);
      let error = Object.values(err.response.data);
      context.commit("setErrorLogin", error[0]);
    }
  },
  async logout(context) {
    context.commit("setAccessToken", null);
    context.commit("setRefreshToken", null);
    context.commit("setAuthenticated", false);
  },
  async refreshToken(context) {
    const refreshUrl = "http://127.0.0.1:8000/api/v1/user/refresh-token/";
    try {
      await axios
        .post(refreshUrl, { refresh: state.refreshToken })
        .then((response) => {
          if (response.status === 200) {
            context.commit("setAccessToken", response.data.access);
          }
        });
    } catch (e) {
      console.log(e.response);
    }
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
