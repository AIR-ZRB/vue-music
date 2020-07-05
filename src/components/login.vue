<template>
    <div class="login" @click="loginClick" v-if="_props.loginIsShow">
        <div class="login-box">
            <h2>手机登录</h2>
            <el-input placeholder="请输入内容" v-model.trim="username">
                <template slot="prepend">账号</template>
            </el-input>

            <el-input type="password" v-model.trim="password">
                <template slot="prepend">密码</template>
            </el-input>
            <el-button type="success" class="login-submit">Login</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["loginIsShow"],
    data() {
        return {
            username: "",
            password: "",
        };
    },
    methods: {
        async loginClick(event) {
            // console.log(event)
            const targetClass = event.target.className;
            targetClass === "login" && this.$emit("update:loginIsShow", false); 9

            if (targetClass.search("login-submit") > 0) {
                const loginRes = await this.axios.post(`/login/cellphone`, {
                    phone: this.username,
                    password: this.password,
                    url: +new Date(),
                });

                console.log(loginRes.data)

                let cookie = "";
                for(let item of loginRes.data.cookie){
                    cookie += item.replace("Path=/","");
                }
                 // 登录完成把cookie保存来，如果遇到需要登录才能获取的数据，则url则携带cookie
                window.sessionStorage.setItem("cookie",cookie);

                this.$emit("update:username", loginRes.data.body.profile.nickname);
                this.$emit("update:avatarUrl", loginRes.data.body.profile.avatarUrl);
                this.$emit("update:loginIsShow", false);
               
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
    .login-box {
        width: 350px;
        height: 300px;
        border-radius: 20px;
        background: #fff;
        padding: 20px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        .el-input {
            margin-bottom: 30px;
        }
    }
}
</style>
