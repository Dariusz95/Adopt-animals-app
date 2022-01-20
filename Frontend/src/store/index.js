import Vue from "vue";
import Vuex from "vuex";
import animal from "./animal";
import auth from "./auth";
import users from "./users";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},

  mutations: {},
  actions: {},
  modules: {
    animal,
    auth,
    users,
  },
});
