import Vue from 'vue'
import Vonic from 'vonic'

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

Vue.use(Vonic.app, {
  routes: routes
})
