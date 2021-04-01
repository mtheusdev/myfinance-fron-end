<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-icon :class="[ recordIconColor(record.type), 'lighten-1 white--text' ]">{{ recordIcon(record.type) }}</v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ record.description }}</v-list-item-title>
      <v-list-item-subtitle> {{ record.category.description }} | {{ record.account.description }}</v-list-item-subtitle>
    </v-list-item-content>
    <span :class="amountColor(record.amount)">{{ formatCurrency(record.amount) }}</span>
  </v-list-item>
</template>

<script>

import formatCurrencyMixin from '@/mixins/format-currency'
import amountColorMixin from './../mixins/amount-color'

export default {
  name: 'RecordsListItem',
  mixins: [
    amountColorMixin,
    formatCurrencyMixin
  ],
  props: {
    record: Object
  },
  methods: {
    recordIcon (type) {
      return type === 'CREDIT' ? 'mdi-arrow-up' : 'mdi-arrow-down'
    },
    recordIconColor (type) {
      return type === 'CREDIT' ? 'teal accent-3' : 'pink accent-2'
    }
  }
}
</script>

<style>

</style>
