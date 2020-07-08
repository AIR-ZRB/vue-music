<template>
    <div class="loading" v-show="$root.music.MusicLoading">
        <div>
            <i class="el-icon-loading"></i>
            <p>努力加载中</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {},
    created() {},
};
</script>

<style lang="scss">
.loading {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--theme-color);
    text-align: center;
    z-index: 3;
    i {
        font-size: 40px;
    }
}
</style>
