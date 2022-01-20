<template>
  <div class="wrapper">
    <v-container class="filter">
      <v-row>
        <v-col class="inputPlace" cols="12" sm="6" lg="3">
          <input
            class="inputCity"
            placeholder="skad jestes?"
            v-model.lazy="selected.city"
          />
          <v-icon class="geo-icon">mdi-map-marker</v-icon>
        </v-col>

        <v-col cols="12" sm="6" lg="3" style="text-align: center">
          <v-btn-toggle group>
            <v-btn
              value=""
              class="pa-2"
              @click="
                filterAnimals('');
                isDog = false;
              "
              >Wszystkie</v-btn
            >
            <v-btn
              value="cat"
              class="pa-2"
              @click="
                filterAnimals('Kot');
                isDog = false;
              "
              >Kot</v-btn
            >
            <v-btn
              value="dog"
              class="btn"
              @click="
                filterAnimals('Pies');
                isDog = true;
              "
              >Pies</v-btn
            >
          </v-btn-toggle>
        </v-col>
        <v-col cols="12" sm="6" lg="3">
          <v-select
            :disabled="!isDog"
            v-model="selected.size"
            :items="sizeItems"
            attach
            label="Rozmiar"
            multiple
            message:null
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6" lg="3">
          <v-select
            v-model="selected.age"
            :items="ageItems"
            attach
            label="Wiek"
            multiple
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
    <div class="cards">
      <div v-for="animal in filterAll || animals" :key="animal.id">
        <adoptAnimal
          :animal="animal"
          :latitudeUserCity="latitudeUserCity"
          :longitudeUserCity="longitudeUserCity"
        ></adoptAnimal>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

import { mapGetters, mapActions } from "vuex";

import adoptAnimal from "./adoptAnimal.vue";
export default {
  name: "adoptAnimals",
  components: {
    adoptAnimal,
  },
  data: () => ({
    selected: {
      kind: "",
      city: "",
      size: [],
      age: [],
    },
    ageItems: ["młody", "wiek średni", "stary"],
    sizeItems: ["mały", "średni", "duży"],
    isDog: false,
    latitudeUserCity: "",
    longitudeUserCity: "",
  }),
  watch: {
    "selected.city": function () {
      this.calculate();
    },
  },
  computed: {
    ...mapState({
      animals: (state) => state.animals,
    }),
    ...mapGetters(["filterAnimal"]),
    filterAll() {
      return this.filterAnimal(
        this.selected.kind,
        this.selected.size,
        this.selected.age
      );
    },
  },
  async created() {
    this.fetchAnimals();
    this.fetchUsers();
  },
  methods: {
    ...mapActions({
      fetchAnimals: "fetchAnimals",
      fetchUsers: "fetchUsers",
    }),
    // -----------------------
    // get latitude and longitude a city of pet owner
    // -----------------------
    async calculate() {
      let city = this.selected.city;
      city = city.replace(" ", "_");
      let coordinates = await axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=31eb46a340e2405696a208dc8841cc69&countrycode=pl`
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => console.log(err));
      this.latitudeUserCity = coordinates.results[0].geometry.lat;
      this.longitudeUserCity = coordinates.results[0].geometry.lng;
    },
    filterAnimals(kind) {
      this.selected.kind = kind;
      if (kind !== "dog") {
        this.selected.size = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./src/assets/styles/_var.scss";
.wrapper {
  height: 100vh;
}

.btn-area {
  margin-top: 50px;
}
.filter {
  font-size: 2rem;
}
.v-application--wrap {
  max-height: 100px;
}
.filter {
  margin-top: 50px;
  width: 100%;
  border-radius: 15px;
  border: none;
  box-shadow: 0 1px 1px rgba($mainColor, 0.1), 0 2px 2px rgba($mainColor, 0.1),
    0 4px 4px rgba(0, 0, 0, 0.1), 0 8px 8px rgba($mainColor, 0.1),
    0 16px 16px rgba(0, 0, 0, 0.1);
}
.inputCity {
  border-bottom: 3px solid $mainColor;
  width: 100%;
  padding-left: 22px;
}

.row {
  display: flex;
  justify-content: center;
  align-items: center;
}
.inputPlace {
  position: relative;
  .geo-icon {
    position: absolute;
    left: 10px;
  }
}
.col {
  display: flex;
  justify-content: center;
  position: relative;
}
.v-btn {
  border-radius: 15px;
}
</style>
