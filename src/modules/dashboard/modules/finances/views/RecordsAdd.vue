<template>
  <v-container text-center>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg4>
        <p>amount</p>
      </v-flex>
      <v-flex xs12 sm6 md8 lg8>
        <v-card>
          <v-card-text>
            <v-form>
              <v-select name="account" label="Conta" prepend-icon="mdi-bank" :items="accounts" item-text="description" item-value="id" v-model="$v.record.accountId.$model"></v-select>
              <v-select name="category" label="Categoria" prepend-icon="mdi-shape-plus" :items="categories" item-text="description" item-value="id" v-model="$v.record.categoryId.$model"></v-select>
              <v-text-field name="description" label="Descrição" prepend-icon="mdi-clipboard-text" type="text" v-model.trim="$v.record.description.$model"></v-text-field>
              <v-text-field v-show="showTagsInput" name="tags" label="Tags (separedas por vírgula)" prepend-icon="mdi-book-variant" type="text" v-model.trim="record.tags"></v-text-field>
              <v-text-field v-show="showNoteInput" name="note" label="Observação" prepend-icon="mdi-message-text" type="text" v-model.trim="record.note"></v-text-field>
            </v-form>
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" @click="showTagsInput = !showTagsInput" icon small class="mr-3"><v-icon :color="color">mdi-book-variant</v-icon></v-btn>
              </template>
              <span>Adicionar tags</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" @click="showNoteInput = !showNoteInput" icon small><v-icon :color="color">mdi-message-text</v-icon></v-btn>
              </template>
              <span>Observação</span>
            </v-tooltip>
          </v-card-text>
        </v-card>
        <v-btn color="primary" large fab class="mt-4" @click="$router.push('/dashboard')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn :color="color" large fab class="mt-4 ml-4" @click="submit">
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { mapActions } from 'vuex'
import moment from 'moment'
import { decimal, minLength, required } from 'vuelidate/lib/validators'
import AccountsService from './../services/accounts-service'
import CategoriesService from './../services/categories-service'

export default {
  name: 'RecordsAdd',
  data () {
    return {
      record: {
        type: this.$route.query.type.toUpperCase(),
        amount: 0,
        date: moment().format('YYYY-MM-DD'),
        accountId: '',
        categoryId: '',
        description: '',
        tags: '',
        note: ''
      },
      showNoteInput: false,
      showTagsInput: false,
      accounts: [],
      categories: []
    }
  },
  validations: {
    record: {
      type: { required },
      amount: { required, decimal, different: value => value !== 0 },
      date: { required },
      accountId: { required },
      categoryId: { required },
      description: { required, minLength: minLength(6) }
    }
  },
  computed: {
    color () {
      switch (this.record.type) {
        case 'CREDIT':
          return 'greenPool2'
        case 'DEBIT':
          return 'warning'
        default:
          return 'primary'
      }
    }
  },
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
    },
    submit () {
      console.log('Form: ', this.record)
    }
  },
  async created () {
    this.changeTitle(this.$route.query.type)
    this.accounts = await AccountsService.accounts()
    this.categories = await CategoriesService.categories({ operation: this.$route.query.type })
  },
  async beforeRouteUpdate (to, from, next) {
    const { type } = to.query
    this.changeTitle(type)
    this.record.type = type.toUpperCase()
    this.categories = await CategoriesService.categories({ operation: type })
    next()
  }
}
</script>

<style>

</style>
