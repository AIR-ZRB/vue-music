<template>
    <div class="private-fm">
        <h2>私人FM</h2>
        <div class="music-picture">
            <img
                v-for="item in fm"
                :key="item.album.picUrl"
                :src="item.album.picUrl"
            />
            <div class="button-group">
                <el-button icon="el-icon-star-off" circle></el-button>
                <el-button icon="el-icon-delete" circle></el-button>
                <el-button icon="el-icon-d-arrow-right" circle></el-button>
                <el-button icon="el-icon-more-outline" circle></el-button>
            </div>
        </div>

        <div class="music-message">
            <p class="title"></p>
            <p class="author"></p>
        </div>
    </div>
</template>

<script>
import request from "../request";
export default {
    data() {
        return {
            fm: [],
        };
    },
    created() {
        request.getFM.call(this);
    },
};
</script>

<style lang="scss">
.music-picture {
    width: 60%;
    float: left;
    img {
        width: 300px;
        height: 300px;
    }

    .button-group {
        button {
            width: 50px;
            height: 50px;
            font-size: 20px;
            background: var(--theme-color);
            color: var(--theme-text-color);
            border: 1px solid var(--theme-text-color);
            margin: 0 15px;
        }
    }
}
.music-message {
    width: 40%;
    float: left;
}
</style>
