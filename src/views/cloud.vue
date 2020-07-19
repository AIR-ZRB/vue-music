<template>
    <div>
        <h2>音乐云盘</h2>
        <el-table :data="cloudMusic" @row-dblclick="getMusicUrl">
            <el-table-column
                v-for="item in showList"
                :key="item.songId"
                :prop="item.en"
                :label="item.cn"
            ></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cloudMusic: [],
            showList: [
                { cn: "音乐标题", en: "songName" },
                { cn: "歌手", en: "artist" },
                { cn: "文件大小", en: "fileSize" },
                { cn: "专辑", en: "album" },
                { cn: "音乐ID", en: "songId" },
                { cn: "上传时间", en: "addTime" },
            ],
        };
    },
    methods: {
        async getCloudMusic() {
            const cloudMusic = await this.axios.post("/user/cloud", {
                withCredentials: true,
                date: +new Date(),
                cookie: window.sessionStorage.getItem("cookie"),
            });

            this.cloudMusic = cloudMusic.data.body.data;
            // console.log(this.cloudMusic);
        },
        async getMusicUrl(musicMessage) {
            let musicUrl = await this.axios.post(
                `/song/url?id=${musicMessage.songId}`
            );
            // console.log(musicUrl);
            if (musicUrl.data.body.data[0].url) {
                this.$root.music.MusicId = musicMessage.songId;
                this.$root.music.MusicName = musicMessage.songName;
                this.$root.music.MusicAvatar = musicMessage.artist;
                this.$root.music.MusicPicture = musicMessage.musicPicture;
                this.$root.music.MusicUrl = musicUrl.data.body.data[0].url;
            }

            this.$nextTick(() => {
                // 获取歌曲的URL
                // console.log(this.$root.music.MusicUrl);
                this.$root.music.MusicUrl == null &&
                    this.$message.error("没有版权或者VIP音乐");
                this.$root.music.MusicLoading = false;
            });
        },
    },
    created() {
        this.getCloudMusic();
    },
};
</script>

<style lang="scss">
.el-table__row {
    border-bottom: 1px solid #000;
}
</style>
