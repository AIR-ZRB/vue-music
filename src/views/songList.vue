<template>
    <div class="songlist">
        <div class="songlist-top">
            <img :src="songListImage" alt="" class="songlist-image" />
            <div>
                <h3>{{ songListName }}</h3>
                <p class="author">晴空_AIR</p>
                <div class="button-group">
                    <el-button icon="el-icon-caret-right">播放全部</el-button>
                    <el-button icon="el-icon-folder-add">收藏</el-button>
                    <el-button icon="el-icon-search">分享</el-button>
                    <el-button icon="el-icon-search">下载全部</el-button>
                </div>
                <div class="tags"></div>
                <div class="description"></div>
            </div>
        </div>
        <div class="songlist-content">
            <musicList :showItems="showItems" :musicMessage="musicMessage" />
        </div>
    </div>
</template>

<script>
import musicList from "../components/musicList";

export default {
    data() {
        return {
            showItems: [
                { cn: "音乐标题", en: "name" },
                { cn: "歌手", en: "author" },
                { cn: "专辑", en: "album" },
                // { cn: "操作", en: "?" },
                // { cn: "音乐下载地址", en: "url" },
            ],
            detailsSongList: [], // 歌单纤细信息
            songListImage: "", // 歌单的图片
            songListName: "", // 歌单的名字
            musicMessage: [], // 歌曲的详细信息
            musicShowQuantity: 20, // 一次性显示歌曲的数量
        };
    },
    components: {
        musicList,
    },
    methods: {
        // 用于获取歌单的信息
        async getUserSongList() {
            this.$root.music.MusicLoading = true;
            // 获取本歌单ID
            let getSongListId = this.$route.fullPath.split("/");
            getSongListId = getSongListId[getSongListId.length - 1];
            console.log(getSongListId);

            // 获取歌单里的所有歌曲
            const detailsSongList = await this.axios.post(
                `/playlist/detail?id=${getSongListId}`
            );
            this.detailsSongList = detailsSongList.data.body.playlist.trackIds;

            this.songListImage = detailsSongList.data.body.playlist.coverImgUrl;
            this.songListName = detailsSongList.data.body.playlist.name;

            this.$nextTick(() => {
                let ids = "";
                this.detailsSongList.forEach((item) => {
                    // 这里可以控制以下数量免得加载时间太长
                    ids += `${item.id},`;
                });
                // console.log(ids.substr(0,ids.length-1))
                this.getMusicMessage(ids.substr(0, ids.length - 1));
            });
        },
        // 用于获取音乐的详情信息
        async getMusicMessage(musicId) {
            // 必须需要使用字符串形式，不然报错
            let musicMessage = "";
            if (musicId !== "") {
                musicMessage = await this.axios.post(`/song/detail?ids=${musicId}`);
                const temporary = [];

                musicMessage.data.body.songs.forEach((item) => {
                    // console.log(item);
                    temporary.push({
                        name: item.name,
                        album: item.al.name,
                        musicPicture: item.al.picUrl,
                        musicDescription: item.alia[0],
                        author: item.ar[0].name,
                        id: item.id,
                        // time:
                    });
                });
                this.musicMessage = temporary;
            }

            this.$root.music.MusicLoading = false;
        },
    },
    created() {
        this.getUserSongList();
    },
    watch: {
        $route() {
            this.getUserSongList();
        },
    },
};
</script>

<style lang="scss">
.songlist {
    .songlist-top {
        display: flex;

        .songlist-image {
            width: 250px;
            height: 250px;
            margin: 0 40px 0 0;
        }

        .author {
            margin: 10px 0;
            line-height: 40px;
        }

        .button-group {
            button {
                background: var(--theme-color);
                color: var(--theme-text-color);
            }
        }
    }
}
</style>
