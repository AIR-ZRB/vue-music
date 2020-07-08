<template>
    <div>
        as
    </div>
</template>

<script>
export default {
    data() {
        return {
            likeMusicIds: [],
            musicList: [],
            showList: [
                {en: ""}
            ],
        };
    },
    methods: {
        // 获取列表的所有音乐的ID
        // async getLikeMusicIds() {
        //     const likeMusicIds = await this.axios.post("/likelist", {
        //         uid: window.sessionStorage.getItem("userId"), // 用户ID
        //         withCredentials: true,
        //         date: +new Date(),
        //         cookie: window.sessionStorage.getItem("cookie"),
        //     });
        //     this.likeMusicIds = likeMusicIds.data.body.ids;
        //     // console.log(this.likeMusicIds);

        //     this.$nextTick(() => {
        //         this.getMusicList(this.likeMusicIds[10]);
        //     });
        // },

        // 通过ID获取到歌曲
      
      
    },
    async created() {
        // this.getLikeMusicIds();
       
    },
};
</script>

<style></style>
