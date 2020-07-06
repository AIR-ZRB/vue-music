<template>
    <div class="home">
        <el-container>
            <el-header>
                <h1>青空云音乐</h1>
                <el-button
                    plain
                    @click="() => (this.loginIsShow = true)"
                    v-if="!userMessage.username"
                    >Login</el-button
                >
                <div class="user-message" v-if="userMessage.username">
                    <img :src="userMessage.avatarUrl" alt="" class="avatar" />
                    <p>{{ userMessage.username }}</p>
                </div>
            </el-header>
            <el-container>
                <el-aside width="250px">
                    <el-col>
                        <el-menu :default-active="defalutRouter">
                            <el-menu-item
                                :index="item.cn"
                                v-for="item in listMenu"
                                :key="item.cn"
                            >
                                <a :href="'#/' + item.en">
                                    <i :class="item.icon"></i>
                                    <span slot="title">{{ item.cn }}</span>
                                </a>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

        <login
            :loginIsShow.sync="loginIsShow"
            :username.sync="userMessage.username"
            :avatarUrl.sync="userMessage.avatarUrl"
        />
    </div>
</template>

<script>
import login from "../components/login";
export default {
    data() {
        return {
            listMenu: [
                { cn: "发现音乐", en: "DiscovrMusic", icon: "el-icon-user" },
                { cn: "私人FM", en: "privateFM", icon: "el-icon-place" },
                { cn: "视频", en: "video", icon: "el-icon-video-camera" },
                { cn: "朋友", en: "friends", icon: "el-icon-user" },
                { cn: "音乐云盘", en: "cloud", icon: "el-icon-cloudy" },
                { cn: "我喜欢的音乐", en: "likeMusic", icon: "el-icon-cloudy" },
            ],
            userMessage: {
                username: "",
                avatarUrl: "",
            },
            loginIsShow: false,
            defalutRouter: "",
        };
    },
    methods: {
        defalutRoute() {
            // console.log(this.listMenu);
            const current = this.$route.fullPath.substring(1);
            this.listMenu.forEach((item) => {
                if (current === item.en) {
                    this.defalutRouter = item.cn;
                }
            });
        },
    },
    components: {
        login,
    },
    created() {
        this.defalutRoute();
        const LinkCss = document.getElementById("theme");
        LinkCss.href = require("../assets/css/theme-green.css");
        this.$router.push(this.$route.fullPath);
    },
};
</script>

<style lang="scss">
.home {
    .el-header {
        background: var(--theme-color);
        display: flex;
        align-items: center;
        justify-content: space-between;
        h1 {
            color: var(--theme-text-color);
        }
        .user-message {
            display: flex;
            align-items: center;
            .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 15px;
            }
            color: var(--theme-text-color);
        }
    }

    .el-aside {
        .el-menu {
            border: none;
        }

        a {
            text-decoration: none;
            color: #000;
        }
        .el-menu-item.is-active {
            // color: var(--theme-color);
            a {
                display: inline-block;
                width: 100%;
                height: 100%;
                color: var(--theme-color-light);
            }
            transition: all 0.3s;
            &:hover {
                // transform: translate(10px)
            }
        }
    }
}
</style>
