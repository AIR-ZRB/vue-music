<template>
    <div class="not-login">
        <p>需要登录后才能查看哦</p>
        <el-button type="primary" @click="showLogin">去登陆</el-button>
    </div>
</template>

<script>
import Bus from "../bus";
export default {
    methods: {
        showLogin() {
            Bus.$emit("loginIsShow", true);
        },
    },
};
</script>

<style lang="scss">
.not-login {
    width: 500px;
    margin: 20px auto;
    text-align: center;
    p {
        font-size: 20px;
        margin-bottom: 20px;
    }
}
</style>
