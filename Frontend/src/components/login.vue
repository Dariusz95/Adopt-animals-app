<template>
  <v-app>
    <div class="login-page">
      <form class="login-form">
        <v-icon class="main-icon">mdi-account</v-icon>
        <h1>ZALOGUJ SIĘ</h1>

        <div class="login-form__input">
          <label for="username"> Nazwa użytkownika:</label>
          <input
            :class="{ errorInput: badLoginOrPass }"
            v-model="username"
            type="text"
            name="username"
            required
            placeholder="LOGIN"
            @click="badLoginOrPass = false"
          />
          <v-icon class="login-icon">mdi-account</v-icon>
        </div>
        <div class="login-form__input">
          <label for="password">Hasło:</label>
          <input
            :class="{ errorInput: badLoginOrPass }"
            v-model="password"
            type="password"
            name="password"
            required
            placeholder="HASŁO"
            @click="badLoginOrPass = false"
          />
          <v-icon>mdi-lock-outline</v-icon>
        </div>
        <div class="error-text" v-if="this.badLoginOrPass">
          Błędny login lub hasło
        </div>
        <v-btn
          :disabled="!this.emptyFields || this.inProgressLogin"
          @click.prevent="submitUser"
          class="btn btn-primary"
        >
          Zaloguj się
          <v-progress-circular
            v-if="inProgressLogin"
            indeterminate
            color="blue-grey"
          ></v-progress-circular>
        </v-btn>
        <p>
          Nie masz konta?
          <router-link to="/register">Zarejestruj się tutaj</router-link>
        </p>
      </form>

      <v-dialog v-model="infoLoginDialog" width="400">
        <v-alert type="success"> Logowanie zakończone pomyślnie </v-alert>
      </v-dialog>
    </div>
    <!-- </div> -->
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      badLoginOrPass: false,
      inProgressLogin: false,
      infoLoginDialog: false,
    };
  },
  computed: {
    emptyFields() {
      return this.username && this.password;
    },
    ...mapGetters({
      isAuthenticated: "isAuthenticated",
    }),
    ...mapGetters({ error: "getErrorLogin" }),
  },
  methods: {
    ...mapActions({
      loginUser: "login",
    }),
    async submitUser() {
      const timeout = setTimeout(() => {
        if (this.isAuthenticated) {
          this.inProgressLogin = true;
          this.badLoginOrPass = false;
          this.infoLoginDialog = true;
          this.username = "";
          this.password = "";
        }
      }, 500);

      const timeoutLogin = setTimeout(() => {
        this.inProgressLogin = false;
        this.infoLoginDialog = false;
        if (this.isAuthenticated) {
          this.$router.push("/");
        }
      }, 1800);

      const { username, password } = this;
      await this.loginUser({ username, password })
        .then(() => {
          this.timeout;
        })
        .then(() => {
          this.timeoutLogin;
        })
        .catch((err) => {
          console.log(err.response.status);
          if (
            this.error === "No active account found with the given credentials"
          ) {
            this.badLoginOrPass = true;
          }
        });

      if (this.error === "No active account found with the given credentials") {
        this.badLoginOrPass = true;
      }
      console.log("error message - ", this.error);
      console.log("isAuth -", this.isAuthenticated);
    },
  },
};
</script>

<style lang="scss" scoped>
.errorInput {
  border: 1px solid red !important;
  border-radius: 10px;
}
.error-text {
  color: red;
  font-size: 1.4rem;
}
.v-alert {
  margin: 0;
}
</style>
