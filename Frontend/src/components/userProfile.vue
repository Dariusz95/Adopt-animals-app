<template>
  <v-app>
    <div class="wrapper wrapUserProfile">
      <v-row class="user">
        <v-col cols="12" class="user-menu">
          <!-- <v-navigation-drawer width="100%"> -->
          <v-list-item-group color="primary" mandatory>
            <v-list width="100%">
              <v-list-item @click="userMenu = 'edit'">
                <v-list-item-icon>
                  <v-icon>mdi-account-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Edytuj profil</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="userMenu = 'password'">
                <v-list-item-icon>
                  <v-icon>mdi-lock-reset</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Zmień hasło</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="userMenu = 'animal'">
                <v-list-item-icon>
                  <v-icon>mdi-cat</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    >Zarządzaj swoimi zwierzakami</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-list-item-group>
          <!-- </v-navigation-drawer> -->
        </v-col>

        <v-col cols="12" class="user-info">
          <div class="edit-user" v-if="userMenu === 'edit'">
            <form class="edit-user__form">
              <v-row>
                <v-col cols="12" md="6">
                  <div class="form_single_wrap">
                    <label for="name">Numer telefonu:</label>
                    <input
                      :disabled="isEditing"
                      v-model="user.phone_number"
                      class="form-input"
                      type="text"
                      name="name"
                      required
                    />
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <div class="form_single_wrap">
                    <label for="name">E-mail:</label>
                    <input
                      :disabled="isEditing"
                      v-model="user.email"
                      class="form-input"
                      type="text"
                      name="name"
                      required
                    />
                  </div>
                </v-col>
              </v-row>
            </form>
            <div class="edit-user__btn">
              <v-btn color="primary" fab small dark @click="toggleEdit">
                <span>Edytuj </span><v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn color="success" fab small @click="editUser">
                <span>Zapisz </span><v-icon>mdi-content-save</v-icon>
              </v-btn>
            </div>
          </div>

          <div class="password" v-else-if="userMenu === 'password'">
            <form class="password__form">
              <v-row>
                <v-col cols="12" md="6">
                  <!-- :class="{ redError: !oldPassIsValid }" -->
                  <div class="form_single_wrap">
                    <label for="oldPassword">Stare hasło</label>
                    <input
                      v-model="old_password"
                      class="form-input"
                      type="password"
                      name="oldPassword"
                      required
                    />
                    <!-- @blur="validOldPassword()" -->
                    <!-- <div class="error-text">To pole nie może być puste</div> -->
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div
                    :class="{ redError: !newPassIsValid }"
                    class="form_single_wrap"
                  >
                    <label for="newPassword">Nowe hasło</label>
                    <input
                      v-model="new_password"
                      class="form-input"
                      type="password"
                      name="newPassword"
                      required
                      @blur="validNewPassword()"
                    />
                    <div class="error-text">
                      Nowe hasło musi być dłuższe niż 4 znaki
                    </div>
                  </div>
                </v-col>
              </v-row>
            </form>
            <div class="password__btn">
              <v-btn
                :disabled="!formIsValid"
                color="success"
                fab
                small
                @click="validateForm"
              >
                <span>Zmień hasło </span><v-icon>mdi-content-save</v-icon>
              </v-btn>
            </div>
          </div>

          <div class="animal-area" v-else-if="userMenu === 'animal'">
            <h1>Twoje zwierzaki do adopcji</h1>
            <v-alert prominent type="error">
              <v-row align="center">
                Uwaga! Nacisniecie czerwonego kosza spowoduje usuniecie
                zwierzaka.
              </v-row>
            </v-alert>
            <div class="animal-area__animals">
              <div
                class="animal"
                v-for="animal in getAnimalWithOwner(user.username)"
                :key="animal.id"
              >
                <v-card class="mx-auto" min-width="200px">
                  <v-img :src="animal.img_animal" height="200px"></v-img>

                  <v-card-title class="animal-area__name">{{
                    animal.name
                  }}</v-card-title>
                  <v-tooltip top color="error">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="deleteBtn"
                        color="error"
                        fab
                        small
                        v-bind="attrs"
                        v-on="on"
                        @click="deleteAnimal(animal.id)"
                      >
                        <span></span><v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Usuniesz zwierzaka</span>
                  </v-tooltip>
                </v-card>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" width="400">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Błąd przy zmianie hasła. Podaj poprawne hasło
          </v-card-title>

          <v-divider></v-divider>

          <v-card-actions class="d-flex justify-center">
            <v-btn
              class="dialogBtn"
              outlined
              color="primary"
              text
              @click="dialog = false"
            >
              Ok, rozumiem
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import changePasswordURL from "../api";
export default {
  name: "userProfile",
  data() {
    return {
      isEditing: true,
      userMenu: "edit",
      old_password: "",
      new_password: "",
      dialog: false,
      newPassIsValid: true,
    };
  },
  computed: {
    ...mapGetters({
      user: "getLoginUser",
    }),
    ...mapGetters(["getAnimalWithOwner"]),
    // oldPassIsValid() {
    //   return this.old_password.length;
    // },
    // newPassIsValid() {
    //   return this.new_password.length > 4;
    // },
    formIsValid() {
      return this.old_password && this.newPassIsValid;
    },
  },

  methods: {
    validNewPassword() {
      this.new_password.length > 4
        ? (this.newPassIsValid = true)
        : (this.newPassIsValid = false);
    },
    ...mapActions(["fetchAnimals"]),
    ...mapActions({ fetch: "fetchLoginUser" }),
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },
    async editUser() {
      try {
        let userID = this.$route.params.id;
        const response = await axios.put(
          `http://127.0.0.1:8000/api/v1/users/${userID}/`,
          {
            username: this.user.username,
            phone_number: this.user.phone_number,
            email: this.user.email,
            owner: this.user.owner,
          }
        );
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteAnimal(id) {
      console.log(id);
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/v1/animals/${id}/`
        );
        this.fetchAnimals();
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    validateForm() {
      if (this.old_password && this.newPassIsValid) {
        this.changePassword();
        this.old_password = "";
        this.new_password = "";
        console.log("poszlo");
      }
    },
    async changePassword() {
      try {
        const response = await axios.put(changePasswordURL, {
          old_password: this.old_password,
          new_password: this.new_password,
        });
        return response.data;
      } catch (error) {
        if (error.response.data.old_password.includes("Wrong password.")) {
          console.log("mamy to");
          this.dialog = true;
        }
      }
    },
    update() {
      this.$forceUpdate();
      console.log("update");
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-user__form,
.password__form {
  display: flex;
  .row {
    justify-content: flex-start;
  }
  .form_single_wrap {
    display: flex;
    flex-direction: column;
    padding: 30px 10px;
    label {
      font-size: 2rem;
      width: 100%;
    }
    input {
      width: 100%;
      padding: 5px 15px;
      font-size: 1.7rem;
      border: 1px solid black;
      border-radius: 3px;
    }
  }
}
.edit-user__btn,
.password__btn {
  display: flex;
  justify-content: center;
  margin-top: 4rem;
}
.v-btn {
  width: 170px;
  height: 50px;
  margin-right: 25px;
  border-radius: 15px;
  span {
    font-size: 2rem;
  }
}

.v-list {
  .v-list-item--active:before {
    opacity: 0;
  }
}
.v-list {
  .v-list-item--link:before {
    transition: none;
  }
  .v-list-item--active::after {
    content: "";
    min-height: inherit;
    /* font-size: 0; */
    position: absolute;
    top: 0;
    right: 0;
    width: 5px;
    height: 100%;
    background-color: green;
  }
}
.wrapper {
  margin-top: 100px;
}
</style>
