<template>
  <div class="home">
    <div class="home__description">
      <span class="home__description-text">
        <h1 v-if="this.windowSize > 950">Adopcja zwierzat</h1>
        <span v-if="this.windowSize > 950"
          >Naszym celem jest walka z bezdomnoscia czy porzucaniem zwierzat.
          Mozesz wziac zwierzaka od wlasciciela, bez uciazliwych procedur
          adopcyjnych.</span
        >
        <div class="btn-area">
          <span
            >Jesli masz duzo wolnego czasu, twój dom wydaje sie pusty i
            chciałbyś przygarnąć nowego pupila, to sprawdź, być może któryś
            spodoba Ci się szczególnie.</span
          >
          <v-btn class="btn" @click="goToAdoptList">Rozejrzyj się</v-btn>
        </div>

        <div class="btn-area">
          <span
            >Jeśli z jakiegokolwiek powodu nie jesteś w stanie zaopiekować się
            swoim zwierzakiem, pokaż go światu. Może znajdzie nowy dom.
          </span>
          <v-btn class="btn" @click="goToCreate">Oddaj zwierzaka</v-btn>
        </div>
      </span>
    </div>
    <div class="home__img">
      <div class="image"></div>
      <svg
        v-if="this.windowSize < 950"
        class="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          class="path"
          fill="#FFF"
          fill-opacity="1"
          d="M0,96L40,133.3C80,171,160,245,240,272C320,299,400,277,480,245.3C560,213,640,171,720,181.3C800,192,880,256,960,245.3C1040,235,1120,149,1200,144C1280,139,1360,213,1400,250.7L1440,288L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
      <span class="mobile-description">
        <div>Adopcja zwierzat od osob prywatnych</div>
        <span
          >Naszym celem jest walka z bezdomnoscia czy porzucaniem zwierzat.
          Mozesz wziac zwierzaka od wlasciciela, bez uciazliwych procedur
          adopcyjnych.
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      windowSize: null,
    };
  },
  name: "Home",

  components: {},
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  mounted() {
    // window.addEventListener("resize", this.onResize);
    // this.onResize()
  },
  created() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  },
  methods: {
    onResize() {
      this.windowSize = window.innerWidth;
    },
    goToAdoptList() {
      this.$router.push("/adopt");
    },
    goToCreate() {
      this.$router.push("/create");
    },
  },
};
</script>
