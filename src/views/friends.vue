<template>
    <div>
        <dynamic v-for="item in getDynamic" :key="item.json" :dynamic="item" />
    </div>
</template>

<script>
import dynamic from "../components/dynamic.vue";
export default {
    data() {
        return {
            getDynamic: [],
        };
    },
    components: {
        dynamic,
    },
    methods: {
        async getFriends() {
            const resData = await this.axios.post("/event", {
                pagesize: 6,
                withCredentials: true,
                cookie: window.sessionStorage.getItem("cookie"),
            });
            // console.log(resData);

            this.getDynamic = resData.data.body.event;
            // console.log(this.getDynamic)
        },
    },
    created() {
        this.getFriends();
    },
};
</script>

<style lang="scss"></style>
