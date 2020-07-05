<template>
    <div class="home">
        <el-container>
            <el-header>
                <h1>青空云音乐</h1>
                <el-button type="success" plain>Login</el-button>
            </el-header>
            <el-container>
                <el-aside width="250px">
                    <el-col>
                        <el-menu default-active="发现音乐">
                            <el-menu-item
                                :index="item.cn"
                                v-for="item in listMenu"
                                :key="item.cn"
                            >
                                <i :class="item.icon"></i>
                                <span slot="title">{{ item.cn }}</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-aside>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            listMenu: [
                { cn: "发现音乐", en: "", icon: "el-icon-user" },
                { cn: "私人FM", en: "", icon: "el-icon-place" },
                { cn: "视频", en: "", icon: "el-icon-video-camera" },
                { cn: "朋友", en: "", icon: "el-icon-user" },
                { cn: "音乐云盘", en: "", icon: "el-icon-cloudy" },
            ],
        };
    },
    created() {
        // let newLink = document.createElement("link");
        // newLink.setAttribute("href","/assets/css/theme-green.css");
        // newLink.setAttribute("type","text/css");
        // newLink.setAttribute("rel","stylesheet");
        // document.head.appendChild(newLink)

        const LinkCss = document.getElementById("theme");
        LinkCss.href = require("../assets/css/theme-green.css");
    },
};
</script>

<style lang="scss">
.home {
    .el-header {
        background: var(--theme-color);
        display: flex;
        align-items: center;
        justify-content: space-between;
        h1 {
            color: var(--theme-text-color);
        }
    }

    .el-aside {
        .el-menu {
            border: none;
        }

        .el-menu-item.is-active {
            color: var(--theme-color-light);
            // color: var(--theme-color);
            transition: all 0.3s;
            &:hover {
                // transform: translate(10px)
            }
        }
    }
}
</style>
