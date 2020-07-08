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
export default {
    props: ["musicMessage", "showItems"],
    methods: {
        async getMusicUrl(musicMessage) {
            this.$root.music.MusicLoading = true;
            let musicUrl = await this.axios.post(`/song/url?id=${musicMessage.id}`);
            console.log(musicMessage)
            this.$root.music.MusicId = musicMessage.id;
            this.$root.music.MusicName = musicMessage.name;
            this.$root.music.MusicAvatar = musicMessage.author;
            this.$root.music.MusicPicture = musicMessage.musicPicture;
            this.$root.music.MusicName = musicMessage.name;
            this.$root.music.MusicUrl = musicUrl.data.body.data[0].url;
            

            this.$nextTick(() => {
                // 获取歌曲的URL
                console.log(this.$root.music.MusicUrl);
                this.$root.music.MusicUrl == null && this.$message.error('没有版权或者VIP音乐');
                this.$root.music.MusicLoading = false;
            });

        },
    }
};
</script>

<style lang="scss">
.el-table__row {
    cursor: pointer;
}
</style>
