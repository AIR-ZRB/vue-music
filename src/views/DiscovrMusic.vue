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
            <div class="recommend-playlist-box" v-else>
                <el-row v-for="item in recommendPlaylist" :key="item.name">
                    <el-col>
                        <el-card :body-style="{ padding: '0px' }">
                            <router-link :to="'/songList/' + item.id">
                                <img :src="item.picUrl" class="image" />
                                <span>{{ item.name }}</span>
                            </router-link>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import request from "../request";
import Bus from "../bus";
export default {
    data() {
        return {
            isLogin: this.$root.login,
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
    created() {
        Bus.$on("isLogin", () => {
            this.isLogin = true;
            request.getRecommendPlaylist.call(this);
        });
        request.getBanner.call(this);
        request.getRecommendPlaylist.call(this);
    },
    updated() {
        if (this.recommendPlaylist.length === 0 && this.isLogin === true) {
            request.getRecommendPlaylist.call(this);
        }
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
            margin-top: 30px;

            .el-row {
                float: left;
                width: 20%;
                margin-bottom: 20px;
                .el-card {
                    border: none;
                    box-shadow: none;
                }

                a {
                    text-decoration: none;
                    color: #000;
                }
                img {
                    width: 200px;
                    height: 200px;
                    transition: all 0.3s;
                    &:hover {
                        transform: scale(1.1);
                    }
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
