import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import home from "../views/home.vue";
import DiscovrMusic from "../views/DiscovrMusic.vue";
import privateFM from "../views/privateFM.vue";
import video from "../views/video.vue";
import friends from "../views/friends.vue";
import cloud from "../views/cloud.vue";
import songList from "../views/songList.vue";

export default new VueRouter({
    mode: "hash",
    routes: [
        {
            path: "/",
            component: home,
            children: [
                { path: "/DiscovrMusic", component: DiscovrMusic },
                { path: "/privateFM", component: privateFM },
                { path: "/video", component: video },
                { path: "/friends", component: friends },
                { path: "/cloud", component: cloud },
                { path: "/songList/*", component: songList },
            ],
        },
    ],
});

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}