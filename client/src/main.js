import Vue from 'vue'
import App from './App.vue'
import Login from './Login.vue'
import searchBar from './components/searchBar.vue'

const routes = {
  '/': Login,
  '/auth': Login,
  '/group': Login,
  '/app': App,
  '/searchBar': searchBar
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
