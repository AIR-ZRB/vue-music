<template>
    <div class="songlist">
        <div class="songlist-top">
            <img :src="songListImage" alt="" class="songlist-image" />
            <div>
                <h3>{{ songListName }}</h3>
                <p class="author">
                    <img :src="authorPicture" alt="" />
                    <span class="author-name">{{ songListAuthor }}</span>
                    <span>创建时间：{{ createdTime }}</span>
                </p>
                <div class="button-group">
                    <el-button icon="el-icon-caret-right">播放全部</el-button>
                    <el-button icon="el-icon-folder-add">收藏</el-button>
                    <el-button icon="el-icon-search">分享</el-button>
                    <el-button icon="el-icon-search">下载全部</el-button>
                </div>
                <div class="tags">
                    标签：
                    <span v-for="item in tags" :key="item">{{ item }}/</span>
                </div>
                <div class="description">简介：{{ description }}</div>
            </div>
        </div>

        <div class="songlist-content">
            <!-- 渲染歌曲 -->
            <musicList :showItems="showItems" :musicMessage="musicMessage" />
        </div>
    </div>
</template>

<script>
import musicList from "./musicList";
export default {
    data() {
        return {
            showItems: [
                { cn: "音乐标题", en: "name" },
                { cn: "歌手", en: "author" },
                { cn: "专辑", en: "album" },
                // { cn: "下载", en: "download" },
            ],
            detailsSongList: [], // 歌单详细信息
            songListImage: "", // 歌单的图片
            songListName: "", // 歌单的名字
            songListAuthor: "", // 歌单的创建者
            authorPicture: "",
            createdTime: "", // 创建时间
            musicMessage: [], // 歌曲的详细信息
            description: "", // 歌单简介
            tags: [], // 歌单标签
            musicShowCount: 20, // 一次性显示歌曲的数量
        };
    },
    components: {
        musicList,
    },
    methods: {
        // 用于获取歌单的信息
        async getUserSongList() {
            this.detailsSongList = [];

            // 加载动画
            this.$root.music.MusicLoading = true;

            // 获取本歌单ID
            let getSongListId = this.$route.fullPath.split("/");
            getSongListId = getSongListId[getSongListId.length - 1];

            // 获取歌单里的所有歌曲
            let detailsSongList = await this.axios.post(
                `/playlist/detail?id=${getSongListId}`
            );

            detailsSongList = detailsSongList.data.body;
            console.log(detailsSongList);
            this.songListAuthor = detailsSongList.playlist.creator.nickname;
            this.authorPicture = detailsSongList.playlist.creator.avatarUrl;
            this.createdTime = detailsSongList.playlist.creator.birthday;

            this.description = detailsSongList.playlist.description;
            this.tags = detailsSongList.playlist.tags;

            this.detailsSongList = detailsSongList.playlist.trackIds;
            this.songListImage = detailsSongList.playlist.coverImgUrl;
            this.songListName = detailsSongList.playlist.name;

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
            // 进来前线清楚之前的音乐，避免出BUG
            this.musicMessage = [];

            // 必须需要使用字符串形式，不然报错
            let musicMessage = "";
            if (musicId !== "") {
                musicMessage = await this.axios.post(
                    `/song/detail?ids=${musicId}`
                );
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
                    });
                });
                this.musicMessage = temporary;
                this.$root.music.MusicList = temporary;
            }

            // 加载动画停止
            this.$root.music.MusicLoading = false;
        },
    },
    created() {
        this.getUserSongList();
    },
    watch: {
        // 切换歌单时，不会重新渲染组件，需手动监听
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
        margin-bottom: 20px;

        .songlist-image {
            width: 250px;
            height: 250px;
            margin: 0 40px 0 0;
        }

        h3 {
            font-weight: 500;
            font-size: 22px;
        }

        .author {
            margin: 20px 0;
            // line-height: 40px;
            display: flex;
            align-items: center;
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-right: 10px;
            }
            .author-name {
                margin-right: 30px;
            }
        }

        .button-group {
            button {
                background: var(--theme-color);
                color: var(--theme-text-color);
            }
        }

        .tags,
        .description {
            font-size: 14px;
        }
        .tags {
            margin: 30px 0 10px;
        }
    }
}
</style>
