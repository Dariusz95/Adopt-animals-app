<template>
<v-app >
  <div class="register-page">
<!-- v-on:submit.prevent="checkForm" -->
      <form  class="register-form">
        <v-icon class="main-icon">mdi-account</v-icon>
        <h1>ZAREJESTRUJ SIĘ</h1>
        <!-- <label for="username">Nazwa użytkownika:</label> -->
        <div :class={errorValid:loginErrors.length} class="register-form__input">
        <input placeholder="Nazwa użytkownika" v-model="login" type="text" 
        @blur="ValidateLogin()"
        >
          <v-icon>mdi-account</v-icon>
          <p v-if="loginErrors.length">         
            <ul>
              <li v-for="error in loginErrors" :key="error.id">{{ error }}</li>
            </ul>
          </p>
        </div>

        <div :class={errorValid:passwordErrors.length} class="register-form__input">
          <input
            placeholder="Hasło"
            v-model="password"
            type="password"
            autocomplete="off"
             @blur="ValidatePassword()"
          />
          <v-icon>mdi-lock-outline</v-icon>
           <p v-if="passwordErrors.length">
            <ul>
              <li v-for="error in passwordErrors" :key="error.id">{{ error }}</li>
            </ul>
          </p>

        </div>

        <div :class={errorValid:mailErrors.length} class="register-form__input">
          <input placeholder="E-mail" v-model="eMail" type="text" 
           @blur="ValidateEmail()"/>
          <v-icon>mdi-email-outline</v-icon>
           <p v-if="mailErrors.length">
            <ul>
              <li v-for="error in mailErrors" :key="error.id">{{ error }}</li>
            </ul>
          </p>

        </div>

        <div :class={errorValid:phonenumberErrors.length} class="register-form__input">
          <input
            placeholder="Numer telefonu"
            v-model="phoneNumber"
            type="number"
            @blur="validatePhone()"
          />
          <v-icon>mdi-cellphone</v-icon>
           <p v-if="phonenumberErrors.length">
            <ul>
              <li v-for="error in phonenumberErrors" :key="error.id">{{ error }}</li>
            </ul>
          </p>
        </div>
        
<!-- alert if login is exists -->
         <v-alert
         v-if="isLoginExist"
              dense
              outlined
              type="error"
            >
            Podany login jest zajęty
          </v-alert>
         <v-alert
         v-if="isEmptyFields"
              dense
              outlined
              type="error"
            >
            Pola nie mogą być puste
          </v-alert>
         <v-alert
              v-if="isRegisterSuccess"
              type="success"
            >
            Pomyślna rejestracja
          </v-alert>


          <!-- <button type="submit" class="btn btn-primary">Zarejestruj się</button> -->
          
        <v-btn
        :disabled="this.loginErrors.length || this.passwordErrors.length || this.mailErrors.length || this.passwordErrors.length || !this.login || !this.password || !this.eMail || !this.phoneNumber"
        class="btn btn-primary"
        @click.prevent="register"
        >Zarejestruj się</v-btn>
          <p>
            Masz konto?
            <router-link to="/login">Zaloguj się tutaj</router-link>
          </p>
        <!-- </div> -->
      </form>
    </div>
  </v-app>
</template>

<script>



import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      loginErrors: [],
      passwordErrors: [],
      mailErrors: [],
      phonenumberErrors: [],
      login: '',
      password: "",
      eMail: "",
      phoneNumber: null,
      isLoginExist:false,
      isRegisterSuccess:false,
      isEmptyFields:false
    };
  },

  methods: {
    clear(){
      this.loginErrors.length &&
      this.passwordErrors.length&&
      this.mailErrors.length&&
      this.phonenumberErrors.length
    },

    //add and delete errors due to argument of the function
    validArgument(argument, errorArray, errorText){
      if(argument){
        if(!errorArray.includes(errorText))
        errorArray.push(errorText)
      }else{
        let index = errorArray.indexOf(errorText);
        if (index !== -1) {
          errorArray.splice(index, 1);
        }
      }
    },

    ValidateLogin(){
      this.validArgument(!this.login,this.loginErrors,"To pole jest wymagane")
      //show error if length of login is less than 4
      this.validArgument(this.login.length < 4,this.loginErrors,"Login musi składać się z przynajmniej 4 znaków")
  },

    ValidatePassword: function(){
      this.validArgument(!this.password,this.passwordErrors,"To pole jest wymagane")

      this.validArgument(this.password.length < 3,this.passwordErrors,"Hasło musi składać się z przynajmniej 3 znaków")

      let hasNumber = /\d/; 
      this.validArgument(!hasNumber.test(this.password),this.passwordErrors,"Hasło musi zawierać przynajmniej jedną cyfrę")
   
    
  },

  ValidateEmail: function(){

      let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
       this.validArgument(!validEmail.test(this.eMail),this.mailErrors,"Niepoprawny e-mail")

       this.validArgument(!this.eMail,this.mailErrors,"To pole jest wymagane")

      
    },

    validatePhone(){

      // let isOnlyNumber = /^[0-9]+$/
      //   this.validArgument(!isOnlyNumber.test(this.phoneNumber),this.phonenumberErrors,"Numer telefonu musi zawierać tylko cyfry")   

        this.validArgument(!this.phoneNumber,this.phonenumberErrors,"To pole jest wymagane")
    },


    // checkForm() {
    //   if(!this.loginErrors.length &&
    //   !this.passwordErrors.length&&
    //   !this.mailErrors.length&&
    //   !this.phonenumberErrors.length){
    //   this.register();
    //   }
    //   else{
    //     this.isEmptyFields=true
    //   }
    // },
    async register() {
      const timeoutRegister = setTimeout(() => {
          this.$router.push("/login");
      }, 3000);
      await axios.post("http://127.0.0.1:8000/api/v1/user/register/", {
          username: this.login,
          password: this.password,
          email: this.eMail,
          phone_number: this.phoneNumber,
        }).then(()=>{
          this.isRegisterSuccess=true;
          timeoutRegister();
        }).catch((err)=> {

        if (err.response) {

//check if error message include 'user with this username already exists.'

        for (const  value of Object.values(err.response.data)) {
          if(Object.values(value) === 'username');
          let loginErrors = Object.values(value)
        loginErrors.forEach(err =>{
        console.log(err)
        
          if(err.includes('user with this username already exists.')){
            console.log('login exist');
            this.isLoginExist = true

          }
        
        })

          }

        }

        })
      
  
    }
  }
};
</script>

<style lang="scss" scoped>
.v-application p {
 margin-bottom: 0
}
</style>
