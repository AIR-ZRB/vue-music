<template>
    <div class="home">
        <el-container>
            <el-header>
                <h1>青空云音乐</h1>

                <el-dropdown @command="toggleTheme" trigger="click">
                    <el-button type="primary" icon="el-icon-brush">
                        <span>{{ currentTheme }}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            v-for="item in themeColor"
                            :key="item.cn"
                            :command="item"
                            >{{ item.cn }}</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </el-dropdown>

                <!-- 登录按钮 -->
                <el-button
                    plain
                    @click="() => (this.loginIsShow = true)"
                    v-if="!userMessage.username"
                    >Login</el-button
                >

                <!-- 登录完后的信息 -->
                <div class="user-message" v-if="userMessage.username">
                    <img :src="userMessage.avatarUrl" alt="" class="avatar" />
                    <p>{{ userMessage.username }}</p>
                </div>
            </el-header>
            <el-container>
                <!-- 左侧列表 -->
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

                <!-- 右侧内容主题区域 -->
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
                <i
                    class="el-icon-caret-left"
                    @click="() => switchoverMusic('prev')"
                ></i>
                <i :class="playMusicMessage.icon" @click="musicPlaying"></i>
                <i
                    class="el-icon-caret-right"
                    @click="() => switchoverMusic('next')"
                ></i>
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
import request from "../request";
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
            // 主题色
            currentTheme: "清新绿",
            themeColor: [
                { cn: "炫酷黑", en: "theme-black" },
                { cn: "天空蓝", en: "theme-blue" },
                { cn: "清新绿", en: "theme-green" },
                { cn: "可爱粉", en: "theme-pink" },
            ],
            // 登录之后的用户信息
            userMessage: {
                username: "", // 用户名
                avatarUrl: "", // 头像
                isLogin: false, // 是否登录
            },
            loginIsShow: true, // 登录框是否显示
            defalutRouter: "发现音乐", // 默认路由
            playMusicMessage: {
                progress: 0,
                volume: this.$root.music.MusicVolume,
                playing: true,
                icon: "el-icon-video-play",
            },
            timer: null, // 定时器
            currentMusic: "", // 目前播放音乐的URL
            currentProgress: 0, // 目前进度条的进度
        };
    },

    methods: {
        // 获取用户歌单
        playing() {
            if (!this.$refs.audio.duration) return;
            /**
             * 1. 当前音乐跟最新的音乐地址不一样时触发
             * 2. 清除原本的定时器，再启动
             * 3. 把进度调成0，并且切换成播放标识
             */
            if (this.$root.music.MusicUrl != this.currentMusic) {
                clearInterval(this.timer);
                this.timer = setInterval(this.timerFunction, 1000);
                this.currentMusic = this.$root.music.MusicUrl;
                this.currentProgress = 0;
                console.log("切歌");
                this.playMusicMessage.icon = "el-icon-video-pause";
            }
        },
        // 播放定时器里的函数
        timerFunction() {
            /**
             * 1. 获取持续事件，如果未获取到则使用0，否则会出现NaN
             * 2. 让进度条跑起来
             * 3. 进度条不能超过100%
             */
            const duration = this.$refs.audio.duration || 0;
            this.currentProgress++;
            let proportion =
                parseInt((this.currentProgress / duration) * 100) || 0;
            this.playMusicMessage.progress =
                proportion > 100 ? 100 : proportion;

            console.log("持续时间" + duration);
            // 当比例到达100时，停止定时器，且清空,自动播放下一首
            if (proportion >= 100) {
                clearInterval(this.timer);
                this.timer = null;
                this.switchoverMusic("next");
            }
        },
        // 进来时的登录
        isLogin() {
            const getCookie = window.sessionStorage.getItem("cookie");
            if (getCookie && this.userMessage.isLogin === false) {
                request.getUserMusicList.call(this);
                this.userMessage.isLogin = true;
            }
        },
        // 音乐组件的暂停与播放
        musicPlaying() {
            if (this.playMusicMessage.playing) {
                this.$refs.audio.pause();
                clearInterval(this.timer);
                this.playMusicMessage.icon = "el-icon-video-play";
            } else {
                this.$refs.audio.play();
                this.timer = setInterval(this.timerFunction, 1000);
                this.playMusicMessage.icon = "el-icon-video-pause";
            }
            this.playMusicMessage.playing = !this.playMusicMessage.playing;
        },
        // 音乐组件的上/下一首功能
        switchoverMusic(direction) {
            /**
             * 1. 从当前音乐歌单内获取到当前播放的索引
             * 2. 通过获取到相对应的索引获取到歌曲
             */
            let index = this.$root.music.MusicList.findIndex((item) => {
                return item.id === this.$root.music.MusicId;
            });

            switch (direction) {
                case "prev":
                    index -= 1;
                    break;
                case "next":
                    index += 1;
                    break;
            }

            if (!this.$root.music.MusicList[index]) {
                this.$message.error("已经到顶了");
                return;
            }

            let currentMusicId = {
                id: this.$root.music.MusicList[index].id,
                name: this.$root.music.MusicList[index].name,
                author: this.$root.music.MusicList[index].author,
                musicPicture: this.$root.music.MusicList[index].musicPicture,
            };
            console.log(this.$root.music.MusicList[index]);
            request.getMusicUrl.call(this, currentMusicId);
        },
        // 切换主题色
        toggleTheme(theme) {
            this.currentTheme = theme.cn;

            // 主题色
            const LinkCss = document.getElementById("theme");
            LinkCss.href = require(`../assets/css/${theme.en}.css`);
        },
    },
    updated() {
        // 点击新歌曲，currentMusic的url更改，触发
        this.playing();

        // 当登录时触发
        this.isLogin();
    },
    components: {
        login,
        loading,
    },
    created() {
        // 清除之前的缓存Cookie和UserId，不能从Cookie登录，每次进来都需要重新登录
        window.sessionStorage.removeItem("cookie");
        window.sessionStorage.removeItem("userId");
        this.$router.push("/DiscovrMusic");

        // 主题色
        const LinkCss = document.getElementById("theme");
        LinkCss.href = require("../assets/css/theme-green.css");
    },
};
</script>

<style lang="scss">
.home {
    min-width: 1400px;
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
        button {
            background: var(--theme-color);
            border: none;
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
        }
    }

    .el-main {
        position: relative;
    }

    .play-component {
        width: 100%;
        height: 50px;
        min-width: 1400px;
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
</style>
