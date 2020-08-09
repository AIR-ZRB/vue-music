<template>
    <div class="song">
        <el-table
            :data="_props.musicMessage"
            style="width: 100%"
            @row-dblclick="getMusicUrl"
        >
            <el-table-column
                v-for="item in _props.showItems"
                :key="item.en"
                :prop="item.en"
                :label="item.cn"
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import request from "../request";
export default {
    props: ["musicMessage", "showItems"],
    methods: {
        // 双击播放音乐
        async getMusicUrl(musicMessage) {
            return request.getMusicUrl.call(this, musicMessage);
        },
    },
};
</script>

<style lang="scss">
.el-table__row {
    cursor: pointer;
}
</style>
