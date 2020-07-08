import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// UI框架
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// HTTP请求
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

// 网易于端口默认挂载在4000
axios.defaults.baseURL = "http://localhost:4000/";

// 路由模块
import router from "./router/router.js";

import "./assets/css/global.css";

new Vue({
    data: {
        music: {
            MusicId: "",
            MusicName: "",
            MusicPicture: "",
            MusicTime: "",
            MusicUrl: "",
            MusicAvatarPicture: "",
            MusicAvatar: "",
            MusicVolume: 0.5,
            MusicLoading: false,
        },
    },
    render: (h) => h(App),
    router,
}).$mount("#app");
