import Vue from 'vue'
import Vonic from 'vonic'
import Vuex from 'vuex'
import store from './vuex/store'
// Page Components
import Index from './components/Index.vue'
import About from './components/About.vue'
import MusicDetail from './components/MusicDetail.vue'
import './js/jquery.min.js'
// Routes
const routes = [
  { path: '/', component: Index },
  { path: '/about', component: About },
  { path: '/MusicDetail', component: MusicDetail }
]
//引入vuex
Vue.use(Vuex)
//let store = Vuex.Store({
  // ...
//})
Vue.use(Vonic.app, {
  routes: routes,
  store
})
