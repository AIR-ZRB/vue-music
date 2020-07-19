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

        <!-- 音乐播放媒体组件 -->
        <audio
            :src="this.$root.music.MusicUrl"
            autoplay
            ref="audio"
            @canplay="playing"
        ></audio>

        <!-- 登录框 -->
        <login
            :loginIsShow.sync="loginIsShow"
            :username.sync="userMessage.username"
            :avatarUrl.sync="userMessage.avatarUrl"
        />

        <!-- 底部音乐控件 -->
        <div class="play-component">
            <div class="btn-ctrl">
                <i class="el-icon-caret-left"></i>
                <i class="el-icon-video-pause" @click="musicPlaying"></i>
                <i class="el-icon-caret-right"></i>
            </div>
            <div class="progress">
                <img :src="$root.music.MusicPicture" alt="" />
                <div class="music-message">
                    <p>{{ $root.music.MusicName }}</p>
                    <p>{{ $root.music.MusicAvatar }}</p>
                </div>
                <el-progress
                    :percentage="playMusicMessage.progress"
                ></el-progress>
            </div>
            <div class="voice-ctrl">
                <i class="el-icon-microphone"></i>
                <el-progress :show-text="false" :percentage="100"></el-progress>
            </div>
        </div>
    </div>
</template>

<script>
import login from "../components/login";
import loading from "../components/loading";
export default {
    data() {
        return {
            // 初始列表
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
                isLogin: false
            },
            loginIsShow: false, // 登录框是否显示
            defalutRouter: "", // 默认路由
            playMusicMessage: {
                progress: 0,
                volume: this.$root.music.MusicVolume,
            },
            timer: null,
            timerFlag: false,
            currentMusic: "",
            currentProgress: 0,
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
        playing() {
            if (!this.$refs.audio.duration) return;

            if (this.$root.music.MusicUrl != this.currentMusic) {
                clearInterval(this.timer);
                this.timer = setInterval(this.timerFunction, 1000);
                this.currentMusic = this.$root.music.MusicUrl;
                this.currentProgress = 0;
                this.timerFlag = false;
                console.log("切歌");
            }
        },
        timerFunction() {
            const duration = this.$refs.audio.duration;
            console.log(duration);
            this.currentProgress++;
            let proportion = parseInt((this.currentProgress / duration) * 100);
            this.playMusicMessage.progress =
                proportion > 100 ? 100 : proportion;

            // 当比例到达100时，停止定时器，且清空
            if (proportion >= 100) {
                clearInterval(this.timer);
                this.timer = null;
                this.timerFlag = true;
            }
        },
        // 封装promise
        isLogin() {
            const getCookie = window.sessionStorage.getItem("cookie");
            // getCookie ? this.getUserMusicList()  : this.loginIsShow = true;
             if (getCookie && this.userMessage.isLogin === false) {
                this.getUserMusicList();
                this.userMessage.isLogin = true;
            } 
        },
        musicPlaying(){

        }
    },
    updated() {
        // 点击新歌曲，currentMusic的url更改，触发
        this.playing();


        // 当登录时触发
        console.log("????");
        this.isLogin();
    },
    components: {
        login,
        loading,
    },
    created() {
        this.isLogin();
        const LinkCss = document.getElementById("theme");
        LinkCss.href = require("../assets/css/theme-green.css");
        // this.axios.get("/login/status").then((data)=>{
        //     console.log(data);
        // })
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

    .play-component {
        width: 100%;
        height: 50px;
        position: fixed;
        bottom: 0;
        left: 0;
        background: #fff;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #000;
        .btn-ctrl {
            i {
                font-size: 40px;
                color: var(--theme-color);
                cursor: pointer;
                margin: 0 5px;
            }
        }
        .progress {
            display: flex;
            justify-content: space-between;
            align-items: center;
            img {
                width: 40px;
                height: 40px;
            }
            .el-progress {
                width: 500px;
            }
            .music-message {
                margin: 0 20px;
                p {
                    font-size: 14px;
                }
            }
        }

        .el-progress-bar__inner {
            background: var(--theme-color);
        }

        .voice-ctrl {
            display: flex;
            justify-content: center;
            align-items: center;
            i {
                font-size: 16px;
            }
            .el-progress {
                width: 100px;
                margin-left: 10px;
            }
        }
    }
}

*::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
*::-webkit-scrollbar-thumb {
    background: var(--theme-color);
}
*::-webkit-scrollbar-track {
    background-color: transparent;
}
</style>
