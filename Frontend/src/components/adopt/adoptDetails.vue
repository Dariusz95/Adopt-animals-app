<template>
  <div class="wrapper">
    <v-container
      v-for="(animal, id) in getAnimalWithId(this.animalId)"
      :key="id"
    >
      <div class="detail">

        <v-row>
          <v-col class="detail__gallery" cols="12" md="7">
            <v-carousel>
              <v-carousel-item
                v-for="(image, i) in animal.images"
                :key="i"
                :src="image"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
          </v-col>

          <v-col class="detail__user" cols="12" md="4">
            <div v-for="(user, id) in getUserByLogin(animal.owner)" :key="id">
              <div class="detail__user-info">
                <v-icon>mdi-account-circle</v-icon>
                <span>{{ user.username }}</span>
              </div>
              <div class="detail__user-info">
                <v-icon> mdi-cellphone</v-icon>
                <span>{{ user.phone_number }}</span>
              </div>
              <div class="detail__user-info">
                <v-icon>mdi-email</v-icon>
                <span>{{ user.email }}</span>
              </div>
            </div>
          </v-col>
        </v-row>
        <div class="detail__description">
          <div class="detail__description-item">
            <div class="date">Dodany {{ animal.date_created }}</div>
          </div>
          <div class="detail__description-item">
            <div class="name">{{ animal.name }}</div>
          </div>
          <div class="detail__description-item age">
            <span>Wiek zwierzaka: </span>
            <div>{{ animal.age }}</div>
          </div>
          <div class="detail__description-item size">
            <span>Rozmiar zwierzaka: </span>
            <div>{{ animal.size }}</div>
          </div>
          <div class="detail__description-item describe">
          <span>Opis:</span>
            <div class="description">{{ animal.description }}</div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import router from "@/router";

export default {
  name: "adoptDetails",
  data: () => ({
    images: [],
  }),
  computed: {
    ...mapGetters(["getAnimalWithId", "getUserByLogin", "getUsers"]),
    animalId() {
      return this.$route.params.id;
    },
  },
  async created() {
    try {
      console.log(this.$route.params.id);
      this.animalId = await this.$route.params.id;
      if (!this.getUsers) {
        this.fetchUsers();
      }
      console.log(animalId);
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    ...mapActions({
      fetchUsers: "fetchUsers",
    }),
  },
};
</script>
<style lang="scss"></style>
