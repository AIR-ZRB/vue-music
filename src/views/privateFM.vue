<template>
    <div class="private-fm">
        <div class="music-picture">
            <img
                v-for="item in fm"
                :key="item.album.picUrl"
                :src="item.album.picUrl"
                alt=""
            />

            <div class="button-group">
                <el-button icon="el-icon-star-off" circle></el-button>
                <el-button icon="el-icon-delete" circle></el-button>
                <el-button icon="el-icon-d-arrow-right" circle></el-button>
                <el-button icon="el-icon-more-outline" circle></el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            fm: [],
        };
    },
    methods: {
        async getFM() {
            const getFM = await this.axios.get("/personal_fm", {
                withCredentials: true,
                date: +new Date(),
                cookie: window.sessionStorage.getItem("cookie"),
            });

            this.fm = getFM.data.body.data;
            console.log(this.fm);

            // this.fn[0].name
            // this.fm[0].album.picUrl
            // this.fm[0].mMusic.id
        },
    },
    created() {
        // this.getFM();
    },
};
</script>

<style lang="scss">
.music-picture {
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
</style>
