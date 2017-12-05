import Vue from 'vue'
import App from './App.vue'
import Login from './Login.vue'
import SongList from './components/SongList.vue'
const routes = {
  '/': Login,
  '/auth': Login,
  '/group': Login,
  '/app': App,
  '/songlist': SongList
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
