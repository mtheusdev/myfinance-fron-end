<template>
  <v-toolbar fixed color="primary">
    <v-app-bar-nav-icon @click.stop="$emit('hide', !showMenu)" ></v-app-bar-nav-icon>
    <v-toolbar-title>{{ title || 'Dashboard'}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-item>
      <v-btn icon @click="showLogoutDialog = true">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-toolbar-item>
    <v-dialog v-model="showLogoutDialog" max-width="250px">
      <v-card>
        <v-card-title>
          <h3 class="subheading">Deseja realmente sair?</h3>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="greenPool2" text small @click="showLogoutDialog = false">Não</v-btn>
          <v-btn color="error2" text small @click="logout">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>

<script>

import { mapState } from 'vuex'
import apollo, { onLogout } from '@/plugins/apollo'
export default {
  name: 'AppToolbar',
  props: {
    showMenu: Boolean
  },
  data () {
    return {
      showLogoutDialog: false
    }
  },
  model: {
    props: 'show',
    event: 'hide'
  },
  computed: {
    ...mapState(['title'])
  },
  methods: {
    async logout (e) {
      this.$router.push('/login')
      await onLogout(apollo)
    }
  }
}
</script>

<style>

</style>
