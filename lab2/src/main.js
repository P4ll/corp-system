import Vue from 'vue'
import App from './App.vue'
import './quasar'
import VueKatex from 'vue-katex'
import 'katex/dist/katex.min.css'

import VueRouter from 'vue-router'

import Graph from './pages/GraphPage.vue'
import ErrorPage from './pages/ErrorPage.vue'

import Vuex from 'vuex'
import state from './store/state.js'
import * as getters from './store/getters.js'
import * as mutations from './store/mutations.js'
import * as actions from './store/actions.js'
import persistedState from 'vuex-persistedstate'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', redirect: '/chart'},
    {path: '/chart', component: Graph},
    {path: '*', component: ErrorPage}
  ]
})
Vue.config.productionTip = false

const store = new Vuex.Store({
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  plugins: [persistedState()]
})

Vue.use(VueRouter)
Vue.use(VueKatex)
Vue.use(Vuex)

new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount('#app')
