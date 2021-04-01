<template>
  <v-toolbar color="darkPurple">
    <v-layout align-center>
      <v-flex xs1>
        <div class="text-left">
          <v-btn @click="decrement" icon>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs10>
        <v-toolbar-title class="text-center">
          <span>{{ currentMonth }}</span>
        </v-toolbar-title>
      </v-flex>
      <v-flex xs1>
        <div class="text-right">
          <v-btn icon @click="increment">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-toolbar>
</template>

<script>

import moment from 'moment'

export default {
  name: 'ToolbarByMonth',
  data () {
    return {
      date: moment()
    }
  },
  computed: {
    currentMonth () {
      return this.date.format('MMMM YYYY')
    }
  },
  props: {
    format: String
  },
  methods: {
    emit () {
      this.$emit('month', this.date.format(this.format))
    },
    increment () {
      this.date = this.date.clone().add(1, 'month')
      this.emit()
    },
    decrement () {
      this.date = this.date.clone().subtract(1, 'month')
      this.emit()
    }
  },
  created () {
    this.emit()
  }
}
</script>

<style>

</style>
