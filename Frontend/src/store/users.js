const TOKEN_URL = "http://127.0.0.1:8000/api/v1/users/";
const currentUser_URL = "http://127.0.0.1:8000/api/v1/users/current/";
import axios from "axios";
// import http from "@/http";

const state = {
  users: [],
  loginUser: [],
};

const getters = {
  getUsers(state) {
    return state.users;
  },
  getLoginUser(state) {
    return state.loginUser;
  },
  getUserByLogin: (state) => (login) => {
    return state.users.filter((user) => user.username == login);
  },
};

const mutations = {
  setUsers(state, users) {
    state.users = [...users];
  },
  setLoginUser(state, user) {
    state.loginUser = user;
  },
};

const actions = {
  async fetchUsers(context, payload) {
    try {
      const response = await axios.get(TOKEN_URL, payload);
      context.commit("setUsers", response.data);
    } catch (err) {
      console.log(err);
    }
  },
  async fetchLoginUser(context, payload) {
    try {
      const response = await axios.get(currentUser_URL, payload);
      context.commit("setLoginUser", response.data);
    } catch (err) {
      console.log(err);
    }
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
