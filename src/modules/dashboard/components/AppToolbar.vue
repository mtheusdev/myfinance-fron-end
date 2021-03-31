<template>
  <v-toolbar fixed color="primary">
    <v-app-bar-nav-icon @click.stop="$emit('hide', !showMenu)" ></v-app-bar-nav-icon>
    <v-toolbar-title>Dashboard</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AppToolbar',
  props: {
    showMenu: Boolean
  },
  model: {
    props: 'show',
    event: 'hide'
  }
}
</script>

<style>

</style>
