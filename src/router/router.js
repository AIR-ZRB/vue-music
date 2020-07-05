import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import home from "../views/home.vue";

export default new VueRouter({
    mode: "hash",
    routes: [
        {path: "/",component: home}
    ]
})