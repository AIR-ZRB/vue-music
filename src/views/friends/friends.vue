<template>
    <div>
        <h2>好友动态</h2>
        <notLogin v-if="getDynamic.length === 0" />
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
    components: { dynamic },
    created() {
        request.getFriends.call(this);
    },
};
</script>

<style lang="scss"></style>
