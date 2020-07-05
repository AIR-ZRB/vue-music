import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import home from "../views/home.vue";
import DiscovrMusic from "../views/DiscovrMusic.vue";
import privateFM from "../views/privateFM.vue"

export default new VueRouter({
    mode: "hash",
    routes: [
        {
            path: "/",
            component: home,
            children: [
                { path: "/DiscovrMusic", component: DiscovrMusic },
                { path: "/privateFM", component: privateFM },
            ],
        },
    ],
});
