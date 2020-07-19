<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
};
</script>

<style>
h2 {
    margin-bottom: 20px;
}

*::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
*::-webkit-scrollbar-thumb {
    background: var(--theme-color);
}
*::-webkit-scrollbar-track {
    background-color: transparent;
}
</style>
