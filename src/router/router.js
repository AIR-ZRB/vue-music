import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

export default new VueRouter({
    mode: "hash",
    routes: [
        {
            path: "/",
            component: () => import("../views/home.vue"),
            redirect: "/DiscovrMusic",
            children: [
                {
                    path: "/DiscovrMusic",
                    component: () => import("../views/DiscovrMusic.vue"),
                },
                {
                    path: "/privateFM",
                    component: () => import("../views/privateFM.vue"),
                },
                {
                    path: "/video",
                    component: () => import("../views/video/video.vue"),
                },
                {
                    path: "/playVideo/*",
                    component: () => import("../views/video/playVideo.vue"),
                },
                {
                    path: "/friends",
                    component: () => import("../views/friends/friends.vue"),
                },
                {
                    path: "/cloud",
                    component: () => import("../views/cloud.vue"),
                },
                {
                    path: "/songList/*",
                    component: () => import("../views/songList/songList.vue"),
                },
            ],
        },
        {
            path: "*",
            redirect: "/DiscovrMusic",
        },
    ],
});

// 解决Push Promise写法报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};
