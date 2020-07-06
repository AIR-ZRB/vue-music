<template>
    <div>
        <el-table :data="cloudMusic" style="width: 100%">
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
