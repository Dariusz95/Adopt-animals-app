<template>
  <v-app>
    <div class="wrapper">
      <form
        class="createForm"
        @submit.prevent="addAnimal"
        enctype="multipart/form-data"
      >
        <div class="form_single_wrap">
          <label for="name">Imię zwierzaka:</label>
          <input
            v-model="name"
            class="form-input"
            type="text"
            name="name"
            required
          />
        </div>
        <div class="form_single_wrap">
          <label for="home">Miejscowość:</label>
          <input
            v-model="home"
            class="form-input"
            type="text"
            name="home"
            required
          />
        </div>

        <v-row class="select-area">
          <v-col class="form_single_wrap" cols="12" lg="4">
            <label>Typ</label>
            <v-select
              v-model="type_animal"
              :items="select_animal"
              label="Wybierz zwierzaka"
              solo
              required
            ></v-select>
          </v-col>

          <v-col class="form_single_wrap" cols="12" lg="4">
            <label>Rozmiar</label>
            <v-select
              :disabled="!isDog"
              v-model="size_animal"
              :items="select_animal_size"
              label="Wybierz rozmiar"
              solo
            ></v-select>
          </v-col>

          <v-col class="form_single_wrap" cols="12" lg="4">
            <label>Wiek</label>
            <v-select
              v-model="age_animal"
              :items="select_animal_age"
              label="Wybierz wiek"
              solo
              required
            ></v-select>
          </v-col>
        </v-row>

        <v-row class="upload-area">
          <v-col cols="12" sm="6" lg="4" class="upload-btn-wrapper">
            <button class="btnUpload button-first">
              <v-icon>mdi-file-upload</v-icon> Wybierz zdjęcie
            </button>

            <input
              type="file"
              @change="previewFiles($event)"
              ref="file"
              class="custom-file-input"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            lg="4"
            v-if="showSecond"
            class="upload-btn-wrapper"
          >
            <button class="btnUpload button-second">
              <v-icon>mdi-file-upload</v-icon> Wybierz zdjęcie
            </button>

            <input
              type="file"
              @change="previewFiles1"
              ref="file1"
              class="custom-file-input"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            lg="4"
            v-if="showThird"
            class="upload-btn-wrapper"
          >
            <button class="btnUpload button-third">
              <v-icon>mdi-file-upload</v-icon> Wybierz zdjęcie
            </button>

            <input
              type="file"
              @change="previewFiles2"
              ref="file2"
              class="custom-file-input"
            />
          </v-col>
        </v-row>

        <!-- <div class="form_single_wrap">
          <label for="image">Zdjęcie:</label>
          <input type="file" @change="previewFiles1" ref="file1" multiple />
        </div> -->

        <div class="form_single_wrap description">
          <label for="description">Opis:</label>
          <textarea
            v-model="description"
            class="form-input"
            type="text"
            name="description"
            required
          />
        </div>
        <div class="button-area">
          <v-btn class="btnForm resetBtn" @click="reset">resetuj</v-btn>
          <v-btn class="btnForm addBtn" type="submit">Wyślij</v-btn>
        </div>
      </form>
    </div>
    <v-dialog v-model="isAddingAnimal" width="400">
      <v-alert type="success"> Zwierzak dodany pomyślnie </v-alert>
    </v-dialog>
  </v-app>
</template>
<script>
import http from "@/http";
import { mapActions } from "vuex";
export default {
  name: "createAnimal",
  data() {
    return {
      name: "",
      age_animal: "",
      type_animal: "",
      size_animal: "",
      select_animal_age: ["młody", "wiek średni", "stary"],
      select_animal: ["Kot", "Pies"],
      select_animal_size: ["mały", "średni", "duży"],
      description: "",
      home: "",
      file: "",
      file1: "",
      file2: "",
      isActive: false,
      showSecond: false,
      showThird: false,
      isAddingAnimal: false,
    };
  },
  computed: {
    isDog() {
      if (this.type_animal == "Pies") {
        return true;
      } else return false;
    },
  },

  methods: {
    reset() {
      (this.name = ""),
        (this.age_animal = ""),
        (this.type_animal = ""),
        (this.size_animal = ""),
        (this.description = ""),
        (this.home = ""),
        (this.file = ""),
        (this.file1 = ""),
        (this.file2 = "");
    },
    getReader(btn, file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        btn.style.background = "url(" + reader.result + ")";
        btn.style.backgroundPosition = "center";
        btn.style.backgroundSize = "cover";
        btn.classList.add("btn--active");
        btn.textContent = "";
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    },

    previewFiles(e) {
      const buttonUpload = document.querySelector(".button-first");
      let file = e.target.files[0] || e.dataTransfer.files[0];
      this.getReader(buttonUpload, file);

      this.file = this.$refs.file.files[0];
      this.showSecond = true;
    },

    previewFiles1(e) {
      const buttonUpload = document.querySelector(".button-second");
      let file = e.target.files[0] || e.dataTransfer.files[0];
      this.getReader(buttonUpload, file);

      this.file1 = this.$refs.file1.files[0];
      this.showThird = true;
    },
    previewFiles2(e) {
      const buttonUpload = document.querySelector(".button-third");
      let file = e.target.files[0] || e.dataTransfer.files[0];
      this.getReader(buttonUpload, file);

      this.file2 = this.$refs.file2.files[0];
    },
    ...mapActions({
      add: "addAnimal",
    }),
    async addAnimal() {
      console.log(this.$refs.file.files[0]);
      let formData = new FormData();
      formData.append("img_animal", this.file);
      formData.append("img_animal1", this.file1);
      formData.append("img_animal2", this.file2);
      formData.append("name", this.name);
      formData.append("age", this.age_animal);
      formData.append("type_animal", this.type_animal);
      formData.append("description", this.description);
      formData.append("file", this.file);
      formData.append("home", this.home);
      formData.append("size", this.size_animal);

      // const { name, age, type_animal, description, home } = this;
      try {
        const createAnimal = setTimeout(() => {
          this.$router.push("/adopt");
          this.isAddingAnimal = false;
        }, 3000);

        await this.add(formData).then(() => {
          this.isAddingAnimal = true;

          (this.name = ""),
            (this.age_animal = ""),
            (this.type_animal = ""),
            (this.size_animal = ""),
            (this.description = ""),
            (this.home = ""),
            (this.file = ""),
            (this.file1 = ""),
            (this.file2 = ""),
            createAnimal();
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.v-dialog {
  margin: 0;
}
.wrapper {
  display: flex;
  justify-content: center;
}
.createForm {
  display: flex;
  flex-direction: column;
  width: 85%;
  margin: 50px 0;
  padding: 30px 30px;
  border: 1px solid black;
  border-radius: 15px;
}
.select-area {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  .form_single_wrap {
    flex: 0 1 33%;
    display: flex;
    flex-direction: column;
    label {
      width: 100%;
      text-align: center;
    }
  }
  .v-select__selections input {
    display: none;
  }
  .v-input__slot {
    margin-top: 1rem;
    min-width: 200px;
  }
}

.form_single_wrap.description {
  flex-direction: row;
  margin-bottom: 20px;
  textarea {
    border: 1px solid black;
    width: 100%;
    min-height: 100px;
    font-size: 1.3rem;
  }
}
.form_single_wrap {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin: 15px 0;
  // textarea {
  //   border: 1px solid black;
  //   width: 40%;
  //   min-height: 100px;
  //   font-size: 1.3rem;
  // }
  label {
    display: flex;
    align-items: center;
    display: inline-block;
    font-size: 1.6rem;
    font-weight: bold;
    width: 25%;
  }
  input:not([type="file"]) {
    border: 1px solid black;
    border-radius: 5px;
    padding: 7px 14px;
    font-size: 1.4rem;
    width: 100%;
  }
  .v-input__slot {
    width: 100%;
  }
  .v-label {
    width: 50%;
  }
  .v-select {
    input {
      border: none;
    }
  }
}
.upload-area {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 30px;
  .upload-btn-wrapper {
    position: relative;
    overflow: hidden;
    text-align: center;
  }
  .v-icon {
    font-size: 3.6rem;
  }
  .btnUpload {
    width: 200px;
    height: 200px;
    border: 2px dotted gray;
    color: gray;
    background-color: white;
    padding: 8px 20px;
    border-radius: 8px;
    font-size: 2rem;
    font-weight: bold;
  }
  .btn--active {
    border: none;
  }

  .upload-btn-wrapper input[type="file"] {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
}
.btnForm {
  width: 50%;
}
.button-area {
  display: flex;
  justify-content: space-evenly;
  margin-top: 2.5rem;
  .btnForm {
    width: 30%;
    box-shadow: inset 0px 1px 0px 0px #caefab;
    background-color: transparent;
    border-radius: 6px;
    border: 1px solid #268a16;
    display: inline-block;
    cursor: pointer;
    color: #306108;
    font-family: Arial;
    font-size: 15px;
    font-weight: bold;
    padding: 10px 30px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #aade7c;
    transition: background-color 0.3s;
  }
  .resetBtn {
    border: 1px solid #8a1616;
    color: #8a1616;
  }

  .addBtn:hover {
    background-color: rgba(green, 0.1);
  }
  .resetBtn:hover {
    background-color: rgba(red, 0.1);
  }
}

@media screen and(max-width:699px) {
  .createForm {
    width: 100%;
    padding: 0;
    border: none;
  }
  .form_single_wrap {
    label {
      text-align: center;
      width: 100%;
      margin: 15px 0;
      width: 100%;
    }
    margin: 0;
    flex-direction: column;
    input:not([type="file"]) {
      width: 100%;
    }
  }
  .select-area {
    .form_single_wrap {
      flex: 0 1 100%;
    }
  }
  .form_single_wrap.description {
    flex-direction: column;
  }
}
@media screen and (min-width: 700px) and(max-width:950px) {
  .form_single_wrap {
    flex-direction: row;
    label {
      width: 50%;
      text-align: center;
    }

    input:not([type="file"]) {
      width: 100%;
      margin-left: 10px;
    }
  }
  .select-area {
    .form_single_wrap {
      flex: 0 1 50%;
    }
  }
}
</style>
