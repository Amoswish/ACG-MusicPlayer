import Vue from 'vue'
import Vonic from 'vonic'
import Vuex from 'vuex'
import store from './vuex/store'
// Page Components
import Index from './components/Index.vue'
import About from './components/About.vue'
import MusicDetail from './components/MusicDetail.vue'
import searchMusic from './components/searchMusic.vue'
import recommandList from './components/recommandList.vue'
import importMusic from './components/importMusic.vue'
import myMusic from './components/myMusic.vue'
import musicplayerBottom from './components/musicplayerBottom.vue'
import VueResource from 'vue-resource'
import '../static/js/jquery.min.js'
// import '../static/js/spider.js'
Vue.component('searchMusic',searchMusic)
Vue.component('recommandList',recommandList)
Vue.component('importMusic',importMusic)
Vue.component('myMusic',myMusic)
Vue.component('musicplayerBottom',musicplayerBottom)
// Routes
const routes = [
  { path: '/', component: Index },
  { path: '/about', component: About },
  { path: '/MusicDetail', component: MusicDetail }
]
//引入vuex
Vue.use(Vuex)
Vue.use(VueResource);
//let store = Vuex.Store({
  // ...
//})
Vue.use(Vonic.app, {
  routes: routes,
  store
})
