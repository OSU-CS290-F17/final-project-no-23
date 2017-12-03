import Vue from 'vue'
import App from './App.vue'
import Login from './Login.vue'

const routes = {
  '/': Login,
  '/auth': Login,
  '/group': Login,
  '/app': App,
}

new Vue({
  el: '#Groupify',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute];
    }
  },
  render (h) { return h(this.ViewComponent) }
})
