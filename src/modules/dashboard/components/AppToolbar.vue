<template>
  <v-toolbar fixed color="primary">
    <v-app-bar-nav-icon @click.stop="$emit('hide', !showMenu)" ></v-app-bar-nav-icon>
    <v-toolbar-title>{{ title || 'Dashboard'}}</v-toolbar-title>
  </v-toolbar>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'AppToolbar',
  props: {
    showMenu: Boolean
  },
  model: {
    props: 'show',
    event: 'hide'
  },
  computed: {
    ...mapState(['title'])
  }
}
</script>

<style>

</style>
