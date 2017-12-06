import Vue from 'vue'
import App from './App.vue'
import Login from './Login.vue'
import NotFound from './404.vue'

const routes = {
  '/': Login,
  '/auth': Login,
  '/group': Login,
  '/app': App,
  '/404': NotFound
}

new Vue({
  el: '#Groupify',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      if(routes[this.currentRoute]) {
          return routes[this.currentRoute]
      } else {
          return routes['/404']
      }
    }
  },
  render (h) { return h(this.ViewComponent) }
})
