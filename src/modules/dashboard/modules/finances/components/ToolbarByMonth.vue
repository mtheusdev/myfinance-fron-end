<template>
  <v-toolbar :color="color">
    <v-layout align-center>
      <v-flex xs1>
        <div class="text-left">
          <v-btn @click="decrement" icon>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs8 offset-xs1>
        <v-toolbar-title class="text-center">
          <span>{{ currentMonth }}</span>
        </v-toolbar-title>
      </v-flex>
      <v-flex xs1 text-right v-if="showSlot">
        <slot/>
      </v-flex>
      <v-flex xs1 :class="arrowRightClass">
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
      date: undefined
    }
  },
  computed: {
    currentMonth () {
      return this.date.format('MMMM YYYY')
    },
    arrowRightClass () {
      return !this.showSlot ? 'offset-xs1' : ''
    }
  },
  props: {
    format: String,
    color: String,
    month: String,
    showSlot: {
      type: Boolean,
      default: false
    }
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
    },
    setCurrentMonth () {
      this.date = this.month ? moment(this.month, this.format) : moment()
    }
  },
  created () {
    this.setCurrentMonth()
    this.emit()
  }
}
</script>

<style>

</style>
