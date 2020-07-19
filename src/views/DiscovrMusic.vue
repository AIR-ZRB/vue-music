<template>
    <div class="dioscovr-music">
        <!-- 头部二级菜单 -->
        <div class="title-menu">
            <span
                v-for="item in titleMenu"
                :key="item.title"
                :class="item.active ? 'active' : null"
                >{{ item.title }}</span
            >
        </div>

        <!-- 轮播图 -->
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in banner" :key="item.imageUrl">
                <img :src="item.imageUrl" alt="" />
            </el-carousel-item>
        </el-carousel>

        <!-- 歌单部分 -->
        <div class="recommend-playlist">
            <h3>推荐歌单</h3>

            <div v-if="recommendPlaylist.length === 0 ? true : false">
                你还未登录，此功能无法使用
            </div>
            <div
                class="recommend-playlist-box"
                v-if="recommendPlaylist.length === 0 ? false : true"
            >
                <el-row v-for="item in recommendPlaylist" :key="item.name">
                    <el-col>
                        <el-card :body-style="{ padding: '0px' }">
                            <img :src="item.picUrl" class="image" />

                            <span>{{ item.name }}</span>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            banner: [],
            titleMenu: [
                { title: "个性推荐", active: true },
                { title: "歌单" },
                { title: "主播电台" },
                { title: "排行榜" },
                { title: "歌手" },
                { title: "最新音乐" },
            ],
            recommendPlaylist: [],
        };
    },
    methods: {
        async getBanner() {
            let banner = await this.axios.get("/banner?type=0");
            this.banner = banner.data.body.banners;
        },
        async getRecommendPlaylist() {
            let playList = await this.axios.post("/recommend/resource", {
                withCredentials: true,
                date: +new Date(),
                cookie: window.sessionStorage.getItem("cookie"),
            });
            this.recommendPlaylist = playList.data.body.recommend;
            console.log(playList.data.body.recommend);
        },
    },

    created() {
        this.getBanner();
        // 如果登录完要如何自动调用
        this.getRecommendPlaylist();
    },
    updated() {
        // this.getRecommendPlaylist();
        console.log("????   ");
    },
};
</script>

<style lang="scss" scoped>
.dioscovr-music {
    .title-menu {
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        span {
            padding: 10px 20px;
            cursor: pointer;
            &.active {
                color: var(--theme-color);
                border-bottom: 2px solid var(--theme-color);
            }
        }
    }
    .el-carousel {
        img {
            width: 100%;
        }
    }

    .recommend-playlist {
        .recommend-playlist-box {
            display: flex;
            flex-wrap: wrap;
            margin-top: 30px;
            justify-content: space-around;

            .el-row {
                width: 25%;
                margin-bottom: 20px;

                .el-card {
                    border: none;
                    box-shadow: none;
                }

                img {
                    width: 200px;
                    height: 200px;
                }
                span {
                    display: block;
                    height: 50px;
                    width: 200px;
                    margin: 10px 0;
                }
            }
        }
    }
}
</style>
