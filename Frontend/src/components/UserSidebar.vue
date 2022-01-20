<template>
  <v-card class="mx-auto">
    <v-navigation-drawer
      permanent
      style="background: rgba(255, 255, 255, 0.6)"
      :width="500"
    >
      <!-- width="300px" -->
      <v-list>
        <!-- <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h2">
                {{ user.username }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item> -->
        <v-list-group
          :aria-expanded="true"
          :value="true"
          prepend-icon="mdi-account"
        >
          <template v-slot:activator>
            <v-list-item-title class="pl-5"
              >Informacje o użytkowniku</v-list-item-title
            >
          </template>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ user.username }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-email</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ user.email }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon> mdi-cellphone</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ user.phone_number }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="owner">
            <v-list-item-icon>
              <v-icon>mdi-cat</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="owner__info">
                <span>Twoje zwierzaki</span>
                <span class="owner__amount">{{ userOwner }}</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item @click="editUser()" class="edit">
          <v-list-item-icon>
            <v-icon>mdi-account-edit</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Edytuj profil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-spacer></v-spacer>

        <v-list-item @click="logOut()" class="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Wyloguj się</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { mdiAccount } from "@mdi/js";
import router from "@/router";
export default {
  name: "UserSidebar",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: "getLoginUser",
    }),
    userOwner() {
      if (this.user.owner) {
        return this.user.owner.length;
      } else {
        return 0;
      }
    },
  },
  methods: {
    ...mapActions({ fetch: "fetchLoginUser" }),
    // ...mapActions(["logout"]),
    editUser() {
      this.$emit("clickedit", false);
      console.log("edit");
      this.$router
        .push({ name: "userProfile", params: { id: this.user.id } })
        .catch((error) => {
          if (
            error.name !== "NavigationDuplicated" &&
            !error.message.includes(
              "Avoided redundant navigation to current location"
            )
          ) {
            console.log(error);
          }
        });
    },
    logOut() {
      this.$emit("clickLogout")
      this.$emit("clickedit", false);
      // this.logout();
      this.$router.push("/");
    },
  },
  async created() {
    await this.fetch();
  },
};
</script>

<style lang="scss" scoped>
@import "./src/assets/styles/_var.scss";
.v-card {
  position: absolute;
  top: 68px;
  right: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.8);

  .v-navigation-drawer {
    // width: 300px;

    .v-list-item__title {
      padding: 0 1.5rem;
    }
  }
}

.v-icon {
  padding: 10px;
}

.logout .v-icon {
  color: red;
}
.theme--light.v-sheet {
  background-color: rgba(255, 255, 255, 0.8);
}

.v-list {
  padding: 0;
  &-group {
    &__items {
      margin-left: 5 px;
      // background-color: rgba(255, 255, 255, 0.2);
      // background-color: red;
      .v-list-item {
        min-height: 23px;
        font-size: 1.2rem;
        margin-left: 15px;
        &__content {
          padding: 6px 0;
        }
        &__icon {
          margin: 0 5px;
        }
      }
    }
    .owner {
      .v-list-item__content {
        padding: 0;
      }
      &__info {
        display: flex;
        justify-content: space-between;
        height: 100%;
        :first-child {
          display: flex;
          align-items: center;
        }
      }

      &__amount {
        font-size: 1.2rem;
        font-weight: bold;
        padding: 3px 5px;
        border: 2px solid $mainColor;
        border-radius: 2px;
      }
    }
  }
}

@media screen and (max-width: 576px) {
  .v-icon {
    padding: 12px;
  }
  .v-card {
    width: 100%;
  }

  .v-icon.v-icon {
    font-size: 35px;
  }

  .v-card .v-navigation-drawer .v-list-item__title {
    font-size: 17px;
  }
}
</style>
