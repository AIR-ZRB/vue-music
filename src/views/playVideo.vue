<template>
    <div class="play-video">
        <div class="video-area">
            <p class="video-title">
                {{ videoTitle }} <span>by{{ videoAuthor }}</span>
            </p>
            <video :src="videoUrl" autoplay></video>
            <div class="button-group">
                <el-button icon="el-icon-star-off">
                    赞{{ praisedCount }}
                </el-button>
                <el-button icon="el-icon-folder-add">
                    收藏{{ subscribeCount }}
                </el-button>
                <el-button icon="el-icon-position">
                    分享{{ shareCount }}
                </el-button>
            </div>
            <p class="comment">评论（{{ commentCount }}）</p>
        </div>
        <div class="video-message-area">
            <h4>视频介绍</h4>
            <p>发布时间：{{ videoTime }}</p>
            <p v-if="videoDescription">简介：{{ videoDescription }}</p>
            <p>
                标签：
                <span v-for="item in videoGroup" :key="item.name">
                    {{ item.name }}/</span
                >
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            videoUrl: "",
            videoTitle: "",
            videoDescription: "",
            videoAuthor: "",
            videoTime: "",
            videoGroup: "",
            praisedCount: "", // 点赞数
            shareCount: "", // 分享数
            subscribeCount: "", // 收藏数
            commentCount: "", // 评论数
        };
    },
    methods: {
        async getVideoUrl() {
            let id = this.$route.path.split("/");
            id = id[id.length - 1];

            let data = await this.axios.post(`/video/url?id=${id}`);
            data = data.data.body;
            
            this.videoUrl = data.urls[0].url;
            this.getVideoDetail(id);
        },
        async getVideoDetail(id) {
            let data = await this.axios.post(`/video/detail?id=${id}`);
            data = data.data.body;

            this.videoTitle = data.data.title;
            this.videoAuthor = data.data.creator.nickname;
            this.videoDescription = data.data.description;
            this.videoTime = new Date(data.data.publishTime);
            this.videoGroup = data.data.videoGroup;
            this.praisedCount = data.data.praisedCount;
            this.shareCount = data.data.shareCount;
            this.subscribeCount = data.data.subscribeCount;
            this.commentCount = data.data.commentCount;
        },
    },
    created() {
        this.getVideoUrl();
    },
};
</script>

<style lang="scss" scoped>
.play-video {
    display: grid;
    grid-template-columns: 65% 33%;
    justify-content: space-between;
}
.video-area {
    .video-title {
        font-size: 20px;
        span {
            font-size: 14px;
            color: #999;
        }
        margin-bottom: 10px;
    }
    video {
        width: 100%;
        margin-bottom: 10px;
    }

    .comment {
        margin-top: 50px;
        font-size: 22px;
        padding: 0 0 10px 0;
        border-bottom: 1px solid #ccc;
    }
}

.video-message-area {
    h4 {
        font-size: 22px;
        padding: 0 0 10px 0;
        font-weight: 400;
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
    }
    p {
        margin-bottom: 20px;
        line-height: 24px;
        color: #777;
    }
}
</style>
