const Bus = require("./bus.js").default;
// console.log(Bus);

// 提取一些不需要传参的请求
module.exports = {
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
    },
    // 获取云盘音乐里的数据
    async getCloudMusic() {
        const cloudMusic = await this.axios.post("/user/cloud", {
            withCredentials: true,
            date: +new Date(),
            cookie: window.sessionStorage.getItem("cookie"),
        });
        this.cloudMusic = cloudMusic.data.body.data;
    },
    // 获取发现音乐页的banner
    async getBanner() {
        let banner = await this.axios.get("/banner?type=0");
        this.banner = banner.data.body.banners;
    },
    // 获取发现音乐页的推荐歌单
    async getRecommendPlaylist() {
        let getCookie = window.sessionStorage.getItem("cookie");
        if (this.$root.login && getCookie) {
            let playList = await this.axios.post("/recommend/resource", {
                withCredentials: true,
                date: +new Date(),
                cookie: window.sessionStorage.getItem("cookie"),
            });
            this.recommendPlaylist = playList.data.body.recommend;
            this.isLogin = true;
        }
    },
    // 获取朋友动态
    async getFriends() {
        const resData = await this.axios.post("/event", {
            pagesize: 8,
            withCredentials: true,
            cookie: window.sessionStorage.getItem("cookie"),
        });
        this.getDynamic = resData.data.body.event;
    },
    // 获取私人FM数据
    async getFM() {
        const getFM = await this.axios.get("/personal_fm", {
            withCredentials: true,
            date: +new Date(),
            cookie: window.sessionStorage.getItem("cookie"),
        });
        this.fm = getFM.data.body.data;
        console.log(this.fm);
    },

    // 获取音乐播放地址
    async getMusicUrl(musicMessage) {
        this.$root.music.MusicLoading = true;
        let musicUrl = await this.axios.post(`/song/url?id=${musicMessage.id}`);
        this.$root.music.MusicUrl = "";

        console.log("音乐的播放地址" + musicUrl.data.body.data[0].url);

        if (musicUrl.data.body.data[0].url) {
            this.$root.music.MusicId = musicMessage.id;
            this.$root.music.MusicName = musicMessage.name;
            this.$root.music.MusicAvatar = musicMessage.author;
            this.$root.music.MusicPicture = musicMessage.musicPicture;
            this.$root.music.MusicUrl = musicUrl.data.body.data[0].url;
        }

        // 获取歌曲的URL，如果没有播放地址，则下一首
        if (!this.$root.music.MusicUrl) {
            this.$message.error("没有版权或者VIP音乐");
            Bus.$emit("nextMusic");
            return;
        }
        this.$root.music.MusicLoading = false;
    },
    async downloadMusic(musicMessage) {
        let musicUrl = await this.axios.post(`/song/url?id=${musicMessage.id}`);
        musicUrl = musicUrl.data.body;
        if (musicUrl.data[0].url) return musicUrl.data[0].url;
        if (!musicUrl.data[0].url) return false;
    },
};
