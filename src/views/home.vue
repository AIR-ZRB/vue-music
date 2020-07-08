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
                    <loading />
                </el-main>
            </el-container>
        </el-container>
        <audio :src="this.$root.music.MusicUrl" autoplay></audio>
        <login
            :loginIsShow.sync="loginIsShow"
            :username.sync="userMessage.username"
            :avatarUrl.sync="userMessage.avatarUrl"
        />
       
    </div>
</template>

<script>
import login from "../components/login";
import loading from "../components/loading";
export default {
    data() {
        return {
            listMenu: [
                { cn: "发现音乐", en: "DiscovrMusic", icon: "el-icon-user" },
                { cn: "私人FM", en: "privateFM", icon: "el-icon-place" },
                { cn: "视频", en: "video", icon: "el-icon-video-camera" },
                { cn: "朋友", en: "friends", icon: "el-icon-user" },
                { cn: "音乐云盘", en: "cloud", icon: "el-icon-cloudy" },
            ],
            // 登录之后的用户信息
            userMessage: {
                username: "",
                avatarUrl: "",
            },
            loginIsShow: false, // 登录框是否显示
            defalutRouter: "", // 默认路由
        };
    },
    methods: {
        // 默认跳转路由
        defalutRoute() {
            this.$router.push(this.$route.fullPath);
            const current = this.$route.fullPath.substring(1);
            this.listMenu.forEach((item) => {
                if (current === item.en) {
                    this.defalutRouter = item.cn;
                }
            });
        },
        // 获取用户歌单
        async getUserMusicList() {
            const userMusicList = await this.axios.post("/user/playlist", {
                uid: window.sessionStorage.getItem("userId"), // 用户ID
            });
            const getPlayList = userMusicList.data.body.playlist;

            const pushSongList = getPlayList.map((item) => {
                return {
                    cn: item.name,
                    en: `songList/${item.id}`,
                    icon: "el-icon-magic-stick",
                    // coverImgUrl: item.coverImgUrl,
                };
            });
            this.listMenu = this.listMenu.concat(pushSongList);

            // 获取到所有歌单，再跳转路由
            this.$nextTick(() => {
                this.defalutRoute();
            });
        },
    },
    components: {
        login,loading
    },
    created() {
        this.getUserMusicList();

        const LinkCss = document.getElementById("theme");
        LinkCss.href = require("../assets/css/theme-green.css");
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
            padding: 0 0 10px 0;
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

    .el-main {
        position: relative;
    }
}
</style>
