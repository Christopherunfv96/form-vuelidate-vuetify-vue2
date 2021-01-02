<template>
  <v-app>
    <h3 class="grey--text text-md-h4 text-center mt-4">Formulario de Registro</h3>
    <v-container>
      <v-row justify="center" no-gutters>
        <v-col cols="10" md="4">
          <v-form>
            <v-row>
              <v-col cols="12">
                <v-text-field autocomplete="firstName" :counter="15" label="Nombres" @input="$v.firstName.$touch()"
                              @blur="$v.firstName.$touch()" :error-messages="firstNameErrors"
                              :append-icon="firstName !== '' ?(firstNameErrors.length > 0 ? 'mdi-cancel': 'mdi-check') : '' "
                              required color="green" v-model="firstName" :success-messages="firstNameSuccessMessage">

                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field autocomplete="lastName" :counter="16" label="Apellidos"
                              @input="$v.lastName.$touch()" @blur="$v.lastName.$touch()"
                              :error-messages="lastNameErrors"
                              :append-icon="lastName !== '' ?(lastNameErrors.length > 0 ? 'mdi-cancel': 'mdi-check') : '' "
                              required color="green" v-model="lastName" :success-messages="lastNameSuccessMessage">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field autocomplete="email" :counter="25" label="Correo Electrónico" v-model="email"
                              :error-messages="emailErrors" @input="$v.email.$touch()" @blur="$v.email.$touch()"
                              :append-icon="email !== '' ?(emailErrors.length > 0 ? 'mdi-cancel': 'mdi-check') : '' "
                              color="green" required :success-messages="emailSuccessMessage">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field color="green" label="Contraseña" :type="showPassword ? 'text' : 'password' "
                              :error-messages="passwordErrors" @input="$v.password.$touch()"
                              @blur="$v.password.$touch()"
                              v-model="password" @click:append="showPassword = !showPassword" :counter="20"
                              :success-messages="passwordSuccessMessage"
                              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off' ">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field color="green" label="Confirmar Contraseña"
                              @click:append="showRepeatedPassword = !showRepeatedPassword"
                              v-model="repeatedPassword" :type="showRepeatedPassword ? 'text': 'password'"
                              :success-messages="repeatedPasswordSuccessMessage"
                              :error-messages="repeatedPasswordErrors" @input="$v.repeatedPassword.$touch()"
                              @blur="$v.repeatedPassword.$touch()"
                              :append-icon="showRepeatedPassword ? 'mdi-eye' : 'mdi-eye-off'" :counter="20">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field color="green" label="Ingrese Celular" prefix="+51" :counter="9"
                              :error-messages="phoneNumberErrors"
                              @input="$v.phoneNumber.$touch()" @blur="$v.phoneNumber.$touch()"
                              :append-icon="phoneNumber !== null ?(phoneNumberErrors.length > 0 ? 'mdi-cancel': 'mdi-check') : '' "
                              v-model.number="phoneNumber" autocomplete="phoneNumber"
                              :success-messages="phoneNumberSuccessMessage">

                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-select label="Escoge tu animal favorito" :items="animals" item-text="name" item-value="name"
                          @input="$v.favoriteAnimal.$touch()" @blur="$v.favoriteAnimal.$touch()" color="green"
                          :append-icon="favoriteAnimal !== undefined ?(favoriteAnimalErrors.length > 0 ? 'mdi-cancel': 'mdi-check') : '' "
                          :error-messages="favoriteAnimalErrors" required
                          :success-messages="favoriteAnimalSuccessMessage"
                          v-model="favoriteAnimal">

                </v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="d-flex">
                <v-file-input counter label="Adjunte su foto de perfil" color="green" @change="handleImage"
                              small-chips accept="image/*" required @click:clear="deleteImagePreview"
                              :rules="fileInputRules" ref="inputFile" :success-messages="inputFileSuccessMessage">
                </v-file-input>
              </v-col>
              <v-col cols="4" v-if="this.imageProfileUrl !== '' ">
                <v-img :src="imageProfileUrl"></v-img>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-radio-group row v-model="sex" label="Seleccione su sexo" @change="$v.sex.$touch()"
                               @blur="$v.sex.$touch()" :error-messages="sexErrors"
                               :success-messages="sexSuccessMessage">
                  <v-radio value="Masculino" label="Masculino" color="green"></v-radio>
                  <v-radio value="Femenino" label="Femenino" color="green"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <v-switch label="Vincular Tarjeta de Crédito" flat color="green"
                          v-model="hasCreditCard" messages="Esta elección es opcional">
                </v-switch>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-checkbox label="Acepto los términos y condiciones" v-model="acceptedTerms"
                            @change="$v.acceptedTerms.$touch()"
                            required :error-messages="agreeWithTermsErrors" @blur="$v.acceptedTerms.$touch()"
                            color="green" :success-messages="agreeWithTermsSuccessMessage">
                </v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-btn block color="success" @click="sendForm"
                       :disabled="this.$v.$invalid || this.imageProfileUrl === '' ">Enviar
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn block color="error" @click="clearForm">Cancelar</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
      <h3 class="text-h4 text--darken-2"> {{ favoriteAnimal }}</h3>
    </v-container>
  </v-app>
</template>
<script>
import {email, maxLength, maxValue, minLength, minValue, numeric, required, sameAs} from "vuelidate/lib/validators";

export default {
  name: "Form",
  methods: {
    deleteImagePreview() {
      this.imageProfileUrl = ''
    },
    handleImage(file) {
      if (!file) {
        return;
      }
      this.createImage(file);
    },
    createImage(fileObject) {
      const reader = new FileReader()
      reader.onload = (event) => {
        this.imageProfileUrl = event.target.result
      }
      reader.readAsDataURL(fileObject)
    },
    sendForm() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.isValid = !this.isValid
        const user = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          phoneNumber: this.phoneNumber,
          favoriteAnimal: this.favoriteAnimal,
          imageProfileUrl: this.imageProfileUrl,
          sex: this.sex,
          hasCreditCard: this.hasCreditCard,
          acceptedTerms: this.acceptedTerms
        }
        console.log('validado todo exitosamente, enviando data a la bd')
        console.log(user)
        this.clearForm()
      } else {
        console.log('Ocurrió un error en el envío del formulario')
      }
    },
    clearForm() {
      /*Add inputs that you wanna clear*/
      this.$v.$reset() // clear inputs where you have used vuelidate (v-model)
      this.$refs.inputFile.reset() // clear v-file-input
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.password = ''
      this.repeatedPassword = ''
      this.phoneNumber = null
      this.favoriteAnimal = undefined
      this.imageProfileUrl = ''
      this.sex = null
      this.hasCreditCard = false
      this.acceptedTerms = false

    }
  },
  computed: {
    firstNameSuccessMessage() {
      const successes = []
      if (this.$v.firstName.$dirty && this.$v.firstName.$touch) {
        successes.push('¡Bien hecho!')
        return successes
      } else {
        return successes
      }
    },
    lastNameSuccessMessage() {
      const successes = []
      if (this.$v.lastName.$dirty && this.$v.lastName.$touch) {
        successes.push('¡Bien hecho!')
        return successes
      } else {
        return successes
      }
    },
    firstNameErrors() {
      const errors = []
      if (!this.$v.firstName.$dirty) return errors
      !this.$v.firstName.minLength && errors.push('Nombre debe de ser de minimo 5 carácteres')
      !this.$v.firstName.maxLength && errors.push('Nombre debe de ser de maximo 15 carácteres')
      !this.$v.firstName.required && errors.push('Nombre es requerido.')
      return errors
    },
    lastNameErrors() {
      const errors = []
      if (!this.$v.lastName.$dirty) return errors
      !this.$v.lastName.required && errors.push('Apellido es requerido.')
      !this.$v.lastName.minLength && errors.push('Apellidos debe de ser de mínimo 6 carácteres')
      !this.$v.lastName.maxLength && errors.push('Apellidos debe de ser de mínimo 16 carácteres')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('Email es requerido.')
      !this.$v.email.minLength && errors.push('Email debe de ser de mínimo 10 carácteres')
      !this.$v.email.maxLength && errors.push('Email debe de ser de mínimo 25 carácteres')
      !this.$v.email.email && errors.push('Ingrese un Email válido ...')
      return errors
    },
    emailSuccessMessage() {
      const successes = []
      if (this.$v.email.$dirty && this.$v.email.$touch) {
        successes.push('¡Bien hecho!')
        return successes
      } else {
        return successes
      }
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Contraseña debe de ser de minimo 4 carácteres')
      !this.$v.password.maxLength && errors.push('Contraseña debe de ser de maximo 20 carácteres')
      !this.$v.password.required && errors.push('Contraseña es requerido.')
      return errors
    },
    passwordSuccessMessage() {
      const successes = []
      if (this.$v.password.$dirty && this.$v.password.$touch) {
        successes.push('¡Bien hecho!')
        return successes
      } else {
        return successes
      }
    },
    repeatedPasswordErrors() {
      const errors = []
      if (!this.$v.repeatedPassword.$dirty) return errors
      !this.$v.repeatedPassword.required && errors.push('La contraseña es requerida')
      !this.$v.repeatedPassword.sameAsPassword && errors.push('Las contraseñas no coinciden')
      return errors
    },
    repeatedPasswordSuccessMessage() {
      const successes = []
      if (this.$v.repeatedPassword.$dirty && this.$v.repeatedPassword.$touch) {
        successes.push('¡Bien hecho!')
        return successes
      } else {
        return successes
      }
    },
    phoneNumberErrors() {
      const errors = []
      if (!this.$v.phoneNumber.$dirty) return errors
      !this.$v.phoneNumber.required && errors.push('El número de celular es requerido')
      !this.$v.phoneNumber.maxLength && errors.push('Ingrese un celular de máximo 9 dígitos')
      !this.$v.phoneNumber.minLength && errors.push('Ingrese un celular de mínimo 9 dígitos')
      !this.$v.phoneNumber.numeric && errors.push('Ingrese solo números')
      !this.$v.phoneNumber.minValue && errors.push('Ingrese un celular válido')
      return errors
    },
    phoneNumberSuccessMessage() {
      const successes = []
      if (this.$v.phoneNumber.$dirty && this.$v.phoneNumber.$touch) {
        successes.push('¡Bien hecho!')
        return successes
      } else {
        return successes
      }
    },
    favoriteAnimalErrors() {
      const errors = []
      if (!this.$v.favoriteAnimal.$dirty) return errors
      !this.$v.favoriteAnimal.required && errors.push('Elegir un animal favorito es requerido')
      return errors
    },
    favoriteAnimalSuccessMessage() {
      const successes = []
      if (this.$v.favoriteAnimal.$dirty && this.$v.favoriteAnimal.$touch) {
        successes.push('¡Bien hecho!')
        return successes
      } else {
        return successes
      }
    },
    inputFileSuccessMessage() {
      const successes = []
      if (this.imageProfileUrl !== '') {
        successes.push('¡Bien hecho!')
        return successes
      } else {
        return successes
      }
    },
    agreeWithTermsErrors() {
      const errors = []
      if (!this.$v.acceptedTerms.$dirty) return errors
      !this.$v.acceptedTerms.sameAs && errors.push('Acepte los términos para continuar')
      return errors
    },
    agreeWithTermsSuccessMessage() {
      const successes = []
      if (this.$v.acceptedTerms.$dirty && this.$v.acceptedTerms.$touch) {
        successes.push('¡Bien hecho!')
        return successes
      } else {
        return successes
      }
    },
    sexErrors() {
      const errors = []
      if (!this.$v.sex.$dirty) return errors
      !this.$v.sex.required && errors.push('Seleccionar su sexo es obligatorio')
      return errors
    },
    sexSuccessMessage() {
      const successes = []
      if (this.$v.sex.$dirty && this.$v.sex.$touch) {
        successes.push('¡Bien hecho!')
        return successes
      } else {
        return successes
      }
    },
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatedPassword: '',
      showPassword: false,
      showRepeatedPassword: false,
      phoneNumber: null,
      animals: [
        {id: 134, name: 'Perro'},
        {id: 222, name: 'Gato'},
        {id: 167, name: 'Conejo'},
        {id: 92, name: 'Elefante'},
      ],
      favoriteAnimal: undefined,
      imageProfileUrl: '',
      fileInputRules: [
        value => !!value || 'Seleccione su foto de perfil',
        value => !value || value.size < 2000000 || 'La imagen debe de ser menor a 2 MB.'
      ],
      sex: null,
      hasCreditCard: false,
      acceptedTerms: false
    }
  },
  validations: {
    firstName: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(15)
    },
    lastName: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(16)
    },
    email: {
      required,
      email,
      minLength: minLength(10),
      maxLength: maxLength(25)
    },
    password: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(20)
    },
    repeatedPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    phoneNumber: {
      required,
      numeric,
      minValue: minValue(900000000),
      maxValue: maxValue(999999999),
      minLength: minLength(9),
      maxLength: maxLength(9)
    },
    favoriteAnimal: {
      required
    },
    acceptedTerms: {
      sameAs: sameAs(() => true)
    },
    sex: {
      required
    }
  }
}
</script>

