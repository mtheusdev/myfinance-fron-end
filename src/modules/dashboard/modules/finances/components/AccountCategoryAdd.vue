<template>
  <v-card>
    <v-card-title class=" deep-purple--text text--darken-1 headline" >{{ title }}</v-card-title>
    <v-card-text>
      <v-text-field v-model="$v.item.description.$model" label="Descrição"></v-text-field>
      <v-select :items="operations" item-text="description" item-value="value" v-model="$v.item.operation.$model" v-if="entity === 'category'" label="Operação"></v-select>
    </v-card-text>
    <v-card-actions>
      <v-spacer>
        <v-btn text @click="$emit('close')">Cancelar</v-btn>
        <v-btn text color="primary" :disabled="$v.$invalid" @click="save">Salvar</v-btn>
      </v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import AccountsService from './../services/accounts-service'
import CategoriesService from './../services/categories-service'

export default {
  name: 'AccountCategoryAdd',
  props: {
    entity: String
  },
  data () {
    return {
      item: {
        description: '',
        operation: this.$route.query.type.toUpperCase()
      },
      operations: [
        { description: 'Receita', value: 'CREDIT' },
        { description: 'Despesa', value: 'DEBIT' }
      ]
    }
  },
  validations () {
    const validations = {
      item: {
        description: {
          required,
          minLength: minLength(3)
        }
      }
    }
    if (this.entity === 'account') { return validations }

    return {
      item: {
        ...validations.item,
        operation: { required }
      }
    }
  },
  computed: {
    title () {
      return this.entity === 'account' ? 'Nova Conta' : 'Nova Categoria'
    }
  },
  methods: {
    async save (e) {
      let promisse
      switch (this.entity) {
        case 'account':
          promisse = AccountsService.createAccount(this.item)
          break
        case 'category':
          promisse = CategoriesService.createCategory(this.item)
          break
      }
      const item = await promisse
      this.$emit('saved', item)
    }
  }
}
</script>

<style>

</style>
