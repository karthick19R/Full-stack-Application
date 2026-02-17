import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import vcapitalize from './custom/directive'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import router from './router'
import CookiesPlugin from './plugins/cookies'

import tablecomponent from '../src/components/tablecomponent.vue'

const savedTheme = localStorage.getItem('theme') || 'light'

const vuetify = createVuetify({
  theme: {
    defaultTheme: savedTheme,
    icons: {
    defaultSet: 'mdi',
  },
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1976D2',
          background: '#FFFFFF',
          surface: '#FFFFFF',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#90CAF9',
          background: '#121212',
          surface: '#1E1E1E',
        },
      },
    },
  },
})

const app = createApp(App)
app.use(CookiesPlugin)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.directive('capitalize', vcapitalize)
app.component('tablecomponent', tablecomponent)

app.mount('#app')
