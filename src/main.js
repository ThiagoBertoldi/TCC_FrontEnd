import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import userStore from './store/userStore.js'
import '../public/main.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { api } from './@api/api'
import { elementType } from './@fabricaComponente/elements'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})

setInterval(() => {
  let user = userStore.getters.getUser
  let path = router.currentRoute.value.path

  if(!user && path != '/' && path != '/register')
    userStore.dispatch('logOut')
}, 5000)

app.config.globalProperties.$api = api
app.config.globalProperties.$element = elementType

app.use(userStore).use(router).use(vuetify).mount('#app')
