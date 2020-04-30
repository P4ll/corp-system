import Vue from 'vue'
import App from './App.vue'
import './quasar'
import VueKatex from 'vue-katex'
import 'katex/dist/katex.min.css'

import VueRouter from 'vue-router'

import Graph from './pages/GraphPage.vue'
import ErrorPage from './pages/ErrorPage.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', redirect: '/chart'},
    {path: '/chart', component: Graph},
    {path: '*', component: ErrorPage}
  ]
})
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueKatex)

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
