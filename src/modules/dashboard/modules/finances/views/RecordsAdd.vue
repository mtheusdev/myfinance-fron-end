<template>
  <v-container text-center>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg4>
        <p>amount</p>
      </v-flex>
      <v-flex xs12 sm6 md8 lg8>
        <p>formulario</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'RecordsAdd',
  methods: {
    ...mapActions(['setTitle']),
    changeTitle (recordType) {
      let title
      switch (recordType) {
        case 'credit':
          title = 'Nova Receita'
          break
        case 'debit':
          title = 'Nova Despesa'
          break
        default:
          title = 'Novo Lançamento'
      }
      this.setTitle({ title })
    }
  },
  created () {
    this.changeTitle(this.$route.query.type)
  },
  beforeRouteUpdate (to, from, next) {
    this.changeTitle(to.query.type)
    next()
  }
}
</script>

<style>

</style>
