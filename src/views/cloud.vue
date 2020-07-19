<template>
    <div>
        <h2>音乐云盘</h2>
        <!-- <el-table :data="cloudMusic" @row-dblclick="()=>request.getMusicUrl.call(this)"> -->
        <el-table :data="cloudMusic">
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
import request from "../request";
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
    created() {
        request.getCloudMusic.call(this);
    },
};
</script>

<style lang="scss">
.el-table__row {
    border-bottom: 1px solid #000;
}
</style>
