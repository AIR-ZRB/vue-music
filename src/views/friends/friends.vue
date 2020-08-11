<template>
    <div>
        <h2>好友动态</h2>
        <dynamic v-for="item in getDynamic" :key="item.json" :dynamic="item" />
    </div>
</template>

<script>
import dynamic from "./dynamic.vue";
import request from "../../request";
export default {
    data() {
        return {
            getDynamic: [],
        };
    },
    components: {
        dynamic,
    },
    created() {
        request.getFriends.call(this);
    },
};
</script>

<style lang="scss"></style>
