<template>
    <div class="video">
        <!-- 标签区域, -->
        <div class="tag-group">
            <el-button @click="drawer = true">
               {{currentSelectText}}
            </el-button>

            <!-- 下拉菜单 -->
            <el-drawer
                title="请选择标签"
                direction="ttb"
                :visible.sync="drawer"
                :before-close="handleClose"
                :modal="false"
                size="40%"
                class="tag-drawer"
            >
                <el-tag
                    v-for="item in tagsList"
                    @click="(event) => getCurrentSelectTags(event, item)"
                    :key="item.name"
                    >{{ item.name }}</el-tag
                >
            </el-drawer>
        </div>

        <!-- 视频区域 -->
        <div class="video-group">
            <el-row v-for="item in videoList" :key="item.data.coverUrl">
                <el-col>
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="item.data.coverUrl" class="image" />
                        <p>{{ item.data.title }}</p>
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
            drawer: false, // 控制抽屉是否打开
            currentSelectText: "选择标签"
        };
    },
    methods: {
        async getTags() {
            // 获取所有标签,获取ID，再通过标签ID获取相对应的视频
            const getTags = await this.axios.get("/video/group/list", {
                date: +new Date(),
                cookie: window.sessionStorage.getItem("cookie"),
                id: 1,
            });
            this.tagsList = getTags.data.body.data;
        },
        async getVideoList() {
            // 获取一个标签下的视频
            // 能传入offset
            const videoList = await this.axios.post("video/group", {
                date: +new Date(),
                withCredentials: true,
                id: 57104,
                cookie: window.sessionStorage.getItem("cookie"),
            });
            this.videoList = videoList.data.body.datas;
        },
        getCurrentSelectTags(event, data) {
           this.currentSelectText = data.name;
        //    点击完之后不会自动关闭抽屉
        //    this.handleClose();
        },
        handleClose(done) {done();},
    },
    created() {
        console.log("video");
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
    .el-drawer {
        padding: 20px;
        height: 40%;
        header {
            padding: 0;
            color: #000;
        }
    }

    .el-tag {
        margin: 0 5px;
        background: var(--theme-color);
        color: var(--theme-text-color);
        cursor: pointer;
    }

    .select-tags {
        padding: 0;
        margin: 0;

        .el-tag {
            margin: 0 5px 0 0;
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

        img {
            width: 275px;
            height: 150px;
        }
        p {
            width: 275px;
            line-height: 24px;
        }
    }
}
</style>
