<template>
  <v-container fill-height>
    <v-layout justify-center align-center>
      <v-flex xs12 sm6 md4 lg3 >
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="mdi-email" name="email"
              label="email" type="email" v-model.trim="$v.user.email.$model"></v-text-field>
              <v-text-field prepend-icon="mdi-lock" v-model.trim="$v.user.password.$model" name="password"
              label="senha" type="password"></v-text-field>
            </v-form>
            <v-btn class="mt-3" color="secondary" block depressed>Criar Conta</v-btn>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="submit" :disabled="$v.$invalid" color="primary" class="mb-3" large>Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
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
  },
  methods: {
    submit () {
      console.log('User: ', this.user)
    }
  }
}
</script>

<style>

</style>
