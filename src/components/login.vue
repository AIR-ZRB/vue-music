<template>
    <div class="login" @click="loginClick" v-if="_props.loginIsShow">
        <div class="login-box">
            <h2>手机登录</h2>

            <el-input
                v-model.trim="username"
                placeholder="请输入账号"
            ></el-input>
            <el-input
                v-model.trim="password"
                placeholder="请输入密码"
                type="password"
            ></el-input>

            <el-button type="success" class="login-submit">Login</el-button>
        </div>
    </div>
</template>

<script>
import Bus from "../bus";
export default {
    props: ["loginIsShow"],
    data() {
        return {
            username: "15889580759",
            password: "zhu123",
        };
    },
    methods: {
        // 如果账号密码错误，无法捕获--------------------------
        loginClick(event) {
            const targetClass = event.target.className;
            targetClass === "login" && this.$emit("update:loginIsShow", false);

            if (targetClass.search("login-submit") > 0) {
                this.axios
                    .post(`/login/cellphone`, {
                        phone: this.username,
                        password: this.password,
                        url: +new Date(),
                    })
                    .then((data) => {
                        let loginRes = data;
                        let userId = loginRes.data.body.account.id;
                        let cookie = "";
                        for (let item of loginRes.data.cookie) {
                            cookie += item.replace("Path=/", "");
                        }
                        // 登录完成把cookie保存来，如果遇到需要登录才能获取的数据，则url则携带cookie
                        //  用户Id用来请求喜欢音乐的歌单使用
                        window.sessionStorage.setItem("cookie", cookie);
                        window.sessionStorage.setItem("userId", userId);
                        this.$root.login = true;

                        const username = loginRes.data.body.profile.nickname;
                        const avatarUrl = loginRes.data.body.profile.avatarUrl;

                        this.$emit("update:username", username);
                        this.$emit("update:avatarUrl", avatarUrl);
                        this.$emit("update:loginIsShow", false);

                        Bus.$emit("isLogin",true);
                    })
                    .catch(() => {
                        this.$message.error("账号/密码错误");
                    });

            }
        },
    },
};
</script>

<style lang="scss">
.login {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    .login-box {
        width: 350px;
        height: 300px;
        border-radius: 20px;
        background: #fff;
        padding: 20px 20px 0 20px;
        display: flex;
        justify-content: left;
        flex-wrap: wrap;

        // .el-input {
        //     margin-bottom: 30px;
        // }
        button {
            // padding: 0;
            height: 40px;
        }
    }
}
</style>
