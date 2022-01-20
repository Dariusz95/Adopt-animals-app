<template>
  <header :class="{ onScroll: topOfPage }">
    <nav>
      <div class="logo"><v-icon>mdi-paw</v-icon><span>Adopt</span></div>
      <div class="nav" v-show="!mobile">
        <router-link class="nav-item link" to="/" tag="span">
          <span>Strona główna</span>
        </router-link>
        <router-link class="nav-item link" to="/adopt" tag="span">
          <span>Przygarnij zwierzaka </span>
        </router-link>
        <router-link class="nav-item link" to="/create" tag="span">
          <span>Oddaj zwierzaka</span>
        </router-link>
        <router-link
          v-if="!isAuthenticated"
          class="nav__loginBtn"
          to="/login"
          
        >
        <!-- tag="button" -->
          <button class="loginBtn">Zaloguj się</button>
        </router-link>

        <button
          v-if="isAuthenticated"
          class="nav__account profilBtn"
          @click="toggleShow"
        >
          Profil<i class="mdi mdi-account"></i>
        </button>

        <!-- <UserSidebar
          v-if="showUserProfile"
          v-on:clickedit="clicked"
        ></UserSidebar> -->
      </div>

      <div class="icon" v-show="mobile">
        <button
          v-if="isAuthenticated"
          class="header__account profilBtn"
          @click="toggleShow"
        >
          <i class="mdi mdi-account"></i>
        </button>
        <div
          class="nav-icon"
          :class="{ active: isActive }"
          @click="toggleHamburgerMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <!-- <i class="fas fa-bars" @click="toggleMobileNav()"></i> -->
      </div>

      <div class="dropdown-nav" v-show="mobile" v-if="this.mobileNav">
        <router-link class="dropdown-nav__item link" to="/" tag="span">
          <span @click="closeMobileNav()">Strona główna</span>
        </router-link>
        <router-link class="dropdown-nav__item link" to="/adopt" tag="span">
          <span @click="closeMobileNav()">Przygarnij zwierzaka </span>
        </router-link>
        <router-link class="dropdown-nav__item link" to="/create" tag="span">
          <span @click="closeMobileNav()">Oddaj zwierzaka</span>
        </router-link>
        <router-link
          v-if="!isAuthenticated"
          class="dropdown-nav__item link"
          to="/login"
          tag="button"
        >
          <button class="loginBtn" @click="mobileNav = false">
            Zaloguj się
          </button>
        </router-link>
        <!-- <router-link
          v-if="isAuthenticated"
          class="dropdown-nav__item link"
          to="/"
          tag="button"
        > -->
        <button v-if="isAuthenticated" class="logoutBtn" @click="logout">
          Wyloguj się
        </button>
        <!-- </router-link> -->
      </div>
      <!-- v-if="this.showUserProfile" -->
      <UserSidebar
        v-if="this.showUserProfile"
        v-on:clickedit="clicked"
        v-on:clickLogout="logout"
      ></UserSidebar>
    </nav>
  </header>
</template>

<script>
// import SvgIcon from "@jamescoyle/vue-icon";
import UserSidebar from "./UserSidebar.vue";
import { mdiAccount } from "@mdi/js";
import { mapActions } from "vuex";
export default {
  components: {
    UserSidebar,
  },
  name: "Navbar",
  data() {
    return {
      path: mdiAccount,
      showUserProfile: false,
      topOfPage: false,
      windowWidth: null,
      mobile: false,
      mobileNav: false,
      isActive: false,
    };
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  computed: {
    isAuthenticated() {
      // return true;
      return this.$store.getters.isAuthenticated;
    },
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    toggleHamburgerMenu() {
      this.isActive = !this.isActive;
      this.mobileNav = !this.mobileNav;
    },
    ...mapActions({ logOut: "logout" }),
    logout() {
      this.mobileNav = false;
      this.logOut();
      // this.$router.push("/");
      console.log("wyylogowano");
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    closeMobileNav() {
      this.mobileNav = false;
      this.isActive = !this.isActive;
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 950) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    clicked(value) {
      console.log("wartosc z emita", value);
      this.showUserProfile = value;
    },
    toggleShow() {
      this.showUserProfile = !this.showUserProfile;
      // this.mobileNav = false;
    },
    handleScroll() {
      // console.log(window.pageYOffset);
      if (window.pageYOffset > 0) {
        this.topOfPage = true;
      } else {
        this.topOfPage = false;
      }
    },
  },
};
</script>

<style></style>
