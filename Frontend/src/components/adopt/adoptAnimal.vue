<template>
  <div class="card" @click.prevent="goToDetails">
    <span class="card__detailsText">Kliknij, żeby zobaczyć szczegóły</span>
    <img class="card__img" :src="animal.img_animal" alt="" />
    <div class="card__description">
      <span class="name">{{ animal.name }}</span>
      <div class="description">
        {{ animal.description }}
      </div>
      <span class="location">
        <div>{{ animal.home }}</div>
        <div v-if="distance">{{ distance }}</div>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
export default {
  name: "adoptAnimal",
  data: () => ({
    latitudePetCity: "",
    longitudePetCity: "",
  }),
  props: ["animal", "latitudeUserCity", "longitudeUserCity"],
  created() {
    this.getCoordinate();
  },
  methods: {
    goToDetails() {
      router.push({ name: "adoptDetails", params: { id: this.animal.id } });
      console.log("kliklem");
    },
    async getCoordinate() {
      let coordinates = await axios
        .get(
          `https://api.opencagedata.com/geocode/v1/json?q=${this.animal.home}&key=31eb46a340e2405696a208dc8841cc69&countrycode=pl`
        )
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch((err) => console.log(err));
      this.latitudePetCity = coordinates.results[0].geometry.lat;
      this.longitudePetCity = coordinates.results[0].geometry.lng;
    },
  },
  computed: {
    // -----------------------
    // calculate distance beetwen user and pet owner
    // -----------------------
    distance() {
      if (this.latitudeUserCity && this.longitudeUserCity) {
        console.log(`obliczam dysttans dla ${this.animal.home}`);
        let lat1 = this.latitudePetCity;
        let lon1 = this.longitudePetCity;
        let lat2 = this.latitudeUserCity;
        let lon2 = this.longitudeUserCity;
        var p = 0.017453292519943295; // Math.PI / 180
        var c = Math.cos;
        var a =
          0.5 -
          c((lat2 - lat1) * p) / 2 +
          (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

        let distance = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
        if (distance === 0) {
          return "W twoim mieście";
        } else {
          distance = parseInt(distance);
          return `${distance} km od Ciebie`;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  max-width: 95%;
}
</style>
