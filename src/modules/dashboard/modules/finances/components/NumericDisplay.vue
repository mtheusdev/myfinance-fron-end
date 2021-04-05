<template>
  <v-card :color="color">
    <v-card-title>
      <v-spacer>
        <h3 class="display-2 font-weight-light pa-4 pt-6">{{ display }}</h3>
      </v-spacer>
    </v-card-title>
    <v-card-text>
      <v-layout row wrap justify-end>
        <v-flex v-for="btn in buttons" :key="btn" xs4 pa-1>
          <v-btn @click="change(btn, 'add')" class="headline" large :color="color">{{ btn }}</v-btn>
        </v-flex>
        <v-flex xs4 pa-1>
            <v-btn @click="change" large text><v-icon>mdi-delete</v-icon></v-btn>
          </v-flex>
        </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>

import formatCurrencyMixin from '@/mixins/format-currency'

export default {
  name: 'NumericDisplay',
  props: {
    color: String,
    value: Number
  },
  data () {
    return {
      buttons: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
    }
  },
  mixins: [
    formatCurrencyMixin
  ],
  computed: {
    display () {
      return this.formatCurrency(this.value || 0)
    }
  },
  methods: {
    change (btnValue, operation) {
      const currentValue = this.value.toFixed(2)
      const total = operation === 'add' ? (+(currentValue + btnValue) * 10)
        : (+currentValue.slice(0, -1) / 10)
      this.$emit('input', total)
    }
  }
}
</script>

<style>

</style>
