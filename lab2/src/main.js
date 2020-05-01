import Vue from "vue";
import App from "./App.vue";
import "./quasar";
import VueKatex from "vue-katex";
import "katex/dist/katex.min.css";

import VueRouter from "vue-router";

import GraphPage from "./pages/GraphPage.vue";
import ErrorPage from "./pages/ErrorPage.vue";
import AuthPage from "./pages/Auth.vue"
import LogPage from "./pages/Log.vue"
import UserDataPage from "./pages/UserData.vue"

import Vuex from "vuex";
import state from "./store/state.js";
import * as getters from "./store/getters.js";
import * as mutations from "./store/mutations.js";
import * as actions from "./store/actions.js";
import persistedState from "vuex-persistedstate";

import Vuei18n from "vue-i18n";
import ruLang from "./langs/ru.js";
import enLang from "./langs/en.js";

Vue.use(Vuei18n);
Vue.use(VueRouter);
Vue.use(VueKatex);
Vue.use(Vuex);

const router = new VueRouter({
    mode: "history",
    routes: [
        { path: "/", redirect: "/chart" },
        { path: "/chart", component: GraphPage },
        { path: "/auth", component: AuthPage },
        { path: "/login", component: LogPage },
        { path: "/userdata", component: UserDataPage },
        { path: "*", component: ErrorPage },
    ],
});
Vue.config.productionTip = false;

const store = new Vuex.Store({
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    plugins: [persistedState()],
});

const messages = {
    ruLang,
    enLang,
};

const i18n = new Vuei18n({
    locale: store.getters.getLang,
    messages,
});

new Vue({
    i18n,
    router: router,
    store: store,
    render: (h) => h(App),
}).$mount("#app");
