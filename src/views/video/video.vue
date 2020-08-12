<template>
    <div class="video">
        <h2>视频</h2>
        <!-- 标签区域, -->
        <div class="tag-group">
            <el-button @click="outerVisible = true">
                选择标签：{{ currentSelectText }}
            </el-button>

            <!-- 对话框 -->

            <el-dialog
                width="80%"
                title="请选择标签"
                :visible.sync="outerVisible"
                append-to-body
            >
                <el-tag
                    v-for="item in tagsList"
                    @click="(event) => getCurrentSelectTags(event, item)"
                    :key="item.name"
                    >{{ item.name }}</el-tag
                >
            </el-dialog>
        </div>

        <!-- 视频区域 -->
        <notLogin v-if="videoList.length === 0" />
        
        <div class="video-group">
            <el-row v-for="item in videoList" :key="item.data.coverUrl">
                <el-col>
                    <el-card :body-style="{ padding: '0px' }">
                        <router-link :to="'/playVideo/' + item.data.vid">
                            <img :src="item.data.coverUrl" class="image" />
                            <p>{{ item.data.title }}</p>
                        </router-link>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tagsList: [],
            videoList: [],
            currentSelect: [],
            currentSelectText: "动漫",
            outerVisible: false,
            selectTagId: 4108, // 选择的ID，默认动漫Id
        };
    },
    watch: {
        selectTagId() {
            this.getVideoList();
        },
    },
    methods: {
        async getTags() {
            // 获取所有标签,获取ID，再通过标签ID获取相对应的视频
            const getTags = await this.axios.get("/video/group/list", {
                date: +new Date(),
                cookie: window.sessionStorage.getItem("cookie"),
                id: 1, // 1代表PC版
            });
            this.tagsList = getTags.data.body.data;
        },
        async getVideoList() {
            // 获取一个标签下的视频
            // 能传入offset
            const videoList = await this.axios.post(
                `/video/group?id=${this.selectTagId}`,
                {
                    cookie: window.sessionStorage.getItem("cookie"),
                }
            );
            this.videoList = videoList.data.body.datas;
        },
        // 获取点击之后的tag
        getCurrentSelectTags(event, data) {
            this.currentSelectText = data.name;
            this.selectTagId = data.id;
            this.outerVisible = false;
        },
    },
    created() {
        this.getVideoList();
        this.getTags();
    },
};
</script>

<style lang="scss">
// 标签
.tag-group {
    .el-button {
        background: var(--theme-color);
        color: var(--theme-text-color);
        margin-bottom: 10px;
    }
}
// 下拉菜单样式
.el-dialog {
    .el-dialog__body {
        .el-tag {
            margin: 5px;
            background: var(--theme-color);
            color: var(--theme-text-color);
            cursor: pointer;
        }
    }
}

// 视频
.video-group {
    display: flex;
    flex-wrap: wrap;
    .el-row {
        width: 25%;
        margin: 20px 0;

        .el-card {
            border: none;
            box-shadow: none;
        }

        a {
            text-decoration: none;
            color: #000;
        }

        img {
            width: 275px;
            height: 150px;
            transition: all 0.3s;
            &:hover {
                transform: scale(1.1);
            }
        }
        p {
            width: 275px;
            line-height: 24px;
        }
    }
}
</style>
