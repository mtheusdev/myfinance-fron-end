import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import pt from 'vuetify/lib/locale/pt'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt'
  },
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  },
  theme: {
    themes: {
      dark: {
        primary: colors.deepPurple,
        secondary: colors.deepPurple.lighten2,
        accent: colors.purple.darken3,
        error: colors.pink.lighten2,
        success: colors.deepPurple.accent1,
        warning: colors.pink.lighten2,
        error2: colors.pink.accent2,
        greenPool: colors.teal.accent2,
        darkPurple: colors.purple.darken2
      }
    }
  }
})
