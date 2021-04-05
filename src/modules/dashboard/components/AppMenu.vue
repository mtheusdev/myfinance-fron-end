<template>
  <v-navigation-drawer :value="value" @input="$emit('input', $event)"
    :mini-variant="mini" absolute temporary
  >
    <v-list-item>
          <v-icon button v-if="mini" icon @click.stop="mini = !mini" >mdi-chevron-right</v-icon>
        <v-list-item-avatar>
          <v-icon>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="menu-user-name" >{{ user.name }}</v-list-item-title>
        </v-list-item-content>
        <v-btn @click.stop="mini = !mini" icon><v-icon>mdi-chevron-left</v-icon></v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.url"
          :exact="item.exact"
          @click.stop="$emit('input',false)"
        >
          <v-list-item-icon >
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="lalal">{{ item.title }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

      </v-list>

  </v-navigation-drawer>
</template>

<script>

import AuthService from '@/modules/auth/services/auth-service'

export default {
  name: 'AppMenu',
  props: {
    value: Boolean
  },
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'mdi-view-dashboard',
          url: '/dashboard',
          exact: true
        },
        {
          title: 'Receita',
          icon: 'mdi-plus',
          url: '/dashboard/records/add?type=credit',
          exact: true
        },
        {
          title: 'Despesa',
          icon: 'mdi-minus',
          url: '/dashboard/records/add?type=debit',
          exact: true
        }
      ],
      mini: false,
      user: {}
    }
  },
  async created () {
    this.user = await AuthService.user()
  }
}
</script>

<style>
  .menu-user-name{
    margin-left: 10px;
  }
  .lalal{
    color: #9C27B0;
  }
</style>
