const AddAnimalURL = "http://127.0.0.1:8000/api/v1/animals/";
import axios from "axios";
// import http from "@/http";

const state = {
  animals: [
    {
      id: 51,
      age: "młody",
      date_created: "2021-12-16",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      home: "Lublin",
      images: [
        "http://127.0.0.1:8000/media/cat-main_BOyKiuE.jpg",
        "http://127.0.0.1:8000/media/cat-section_CdJOwiy.jpg",
      ],
      img_animal: "http://127.0.0.1:8000/media/cat-main_BOyKiuE.jpg",
      img_animal1: "http://127.0.0.1:8000/media/cat-section_CdJOwiy.jpg",
      img_animal2: null,
      name: "Podgląd",
      owner: "darek",
      type_animal: "Kot",
    },
  ],
};
const getters = {
  // filterAnimal: (state) => (kind) => {
  //   if (kind === "") {
  //     return state.animals;
  //   }
  //   return state.animals.filter((animal) => animal.type === kind);
  // },
  // getterAccessToken(state, getters, rootState, rootGetters) {
  //   rootGetters["auth/getAccessToken"];
  //   console.log(rootGetters);
  // },
  getAnimals: (state) => {
    return state.animals;
  },

filterAnimal: (state) => (kind, size, age) => {
  let animals = state.animals;
  if (kind !== "") {
    animals = animals.filter((animal) => animal.type_animal === kind);
  }
  if (size.length !== 0) {
    console.log("size", size !== []);
    animals = animals.filter((animal) => size.includes(animal.size));
  }
  if (age.length !== 0) {
    console.log("age", age !== "");
    animals = animals.filter((animal) => age.includes(animal.age));
  }
  return animals;
},
  getAnimalWithId: (state) => (id) => {
    return state.animals.filter((animal) => animal.id == id);
  },
  getAnimalWithOwner: (state) => (owner) => {
    return state.animals.filter((animal) => animal.owner == owner);
  },
};

const mutations = {
  addAnimals(state, animal) {
    state.animals = [...state.animals, animal];
  },
  setAnimals(state, animals) {
    state.animals = [...animals];

    for (let animal of animals) {
      let images = [animal.img_animal, animal.img_animal1, animal.img_animal2];
      animal.images = images.filter(function (img) {
        return img != null;
      });
    }
  },
};

const actions = {
  async addAnimal(context, payload) {
    try {
      const response = await axios.post(AddAnimalURL, payload);
      context.commit("addAnimals", response.data);
    } catch (error) {
      console.log(error);
    }
  },

  async fetchAnimals(context, payload) {
    try {
      const response = await axios.get(AddAnimalURL, { params: payload });
      context.commit("setAnimals", response.data);
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
