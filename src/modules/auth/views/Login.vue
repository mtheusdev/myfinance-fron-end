<template>
  <v-container fill-height>
    <v-layout justify-center align-center>
      <v-flex xs12 sm6 md4 lg3 >
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>{{ texts.toolbar }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-progress-circular v-show="isLoading" indeterminate color="white" width="2"></v-progress-circular>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-if="!isLogin" prepend-icon="mdi-account" name="name"
              label="Nome" type="text" :error-messages="nameErrors" v-model.trim="$v.user.name.$model"></v-text-field>
              <v-text-field prepend-icon="mdi-email" name="email"
              :error-messages="emailErrors"
              label="email" type="email" v-model.trim="$v.user.email.$model"></v-text-field>
              <v-text-field prepend-icon="mdi-lock" v-model.trim="$v.user.password.$model" name="password"
              label="senha" :error-messages="passwordErrors" type="password" @keypress.enter="submit"></v-text-field>
            </v-form>
            <v-btn @click="isLogin = !isLogin" class="mt-3" color="secondary" block depressed>{{ texts.button }}</v-btn>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="submit" :disabled="$v.$invalid" color="primary" class="mb-3" large>{{ texts.toolbar }}</v-btn>
          </v-card-actions>
          <v-snackbar v-model="showSnackbar" top>
          {{ error }}
          <template v-slot:action="{ attrs }">
          <v-btn color="pink" v-bind="attrs" text icon @click="showSnackbar = false"><v-icon>mdi-close</v-icon></v-btn></template></v-snackbar>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import AuthService from './../services/auth-service'

import { required, email, minLength } from 'vuelidate/lib/validators'
import { formatError } from '@/utils'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        name: '',
        email: '',
        password: ''
      },
      isLogin: true,
      isLoading: false,
      error: undefined,
      showSnackbar: false
    }
  },
  validations () {
    const validations = {
      user: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
        }
      }
    }
    if (this.isLogin) { return validations }
    return {
      user: {
        ...validations.user,
        name: {
          required,
          minLength: minLength(3)
        }
      }
    }
  },
  computed: {
    texts () {
      return this.isLogin ? { toolbar: 'Entrar', button: 'Criar conta' } : { toolbar: 'Criar conta', button: 'Já tenho uma conta' }
    },
    passwordErrors () {
      const errors = []
      const password = this.$v.user.password
      if (!password.$dirty) { return errors }
      !password.required && errors.push('Senha é obrigatória!')
      !password.minLength && errors.push(`Insira pelo menos ${password.$params.minLength.min} caracteres!`)
      return errors
    },
    emailErrors () {
      const errors = []
      const email = this.$v.user.email
      if (!email.$dirty) { return errors }
      !email.required && errors.push('Campo email é obrigatório!')
      !email.email && errors.push('Insira um email válido!')
      return errors
    },
    nameErrors () {
      const errors = []
      const name = this.$v.user.name
      if (!name.$dirty) { return errors }
      !name.required && errors.push('Nome é obrigatório!')
      !name.minLength && errors.push(`Insira pelo menos ${name.$params.minLength.min} caracteres!`)
      return errors
    }
  },
  methods: {
    async submit () {
      this.isLoading = true
      try {
        this.isLogin ? await AuthService.login(this.user.email, this.user.password) : await AuthService.signup(this.user)
        this.$router.push(this.$route.query.redirect || '/dashboard')
      } catch (error) {
        this.error = formatError(error.message)
        this.showSnackbar = true
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style>

</style>
