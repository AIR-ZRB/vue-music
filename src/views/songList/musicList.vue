<template>
    <div class="song">
        <el-table
            :data="_props.musicMessage"
            style="width: 100%"
            @row-dblclick="getMusicUrl"
        >
            <el-table-column
                v-for="item in _props.showItems"
                :key="item.en"
                :prop="item.en"
                :label="item.cn"
            />

            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <i
                        class="el-icon-download"
                        title="download"
                        @click="downloadMusic(scope.$index)"
                    />
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="下载说明" :visible.sync="dialogVisible" width="40%">
            <p>由于是跨域请求，无法直接下载</p>
            <p>把歌曲URL复制，去下载软件里新建下载即可</p>
            <p>歌曲名：{{ name }}</p>
            <p>歌手：{{ author }}</p>
            <p>专辑：{{ album }}</p>
            <p>歌曲URL：{{ downloadUrl }}</p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">
                    确 定
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import request from "../../request";
export default {
    props: ["musicMessage", "showItems"],
    data() {
        return {
            name: "",
            author: "",
            album: "",
            downloadUrl: "",
            dialogVisible: false,
        };
    },
    methods: {
        // 双击播放音乐
        async getMusicUrl(musicMessage) {
            return request.getMusicUrl.call(this, musicMessage);
        },
        async downloadMusic(index) {
            this.dialogVisible = true;

            const currentMusic = this._props.musicMessage[index];

            this.name = currentMusic.name;
            this.author = currentMusic.author;
            this.album = currentMusic.album;

            this.downloadUrl = await request.downloadMusic.call(
                this,
                currentMusic
            );

            if (!this.downloadUrl) {
                this.$message.error("没有版权或者VIP音乐");
                return;
            }
        },
    },
};
</script>

<style lang="scss">
.el-table__row {
    cursor: pointer;
}
.el-icon-download {
    color: #000;
}
.el-dialog {
    p {
        line-height: 26px;
    }
    .dialog-footer {
        button {
            background: var(--theme-color);
            border-color: var(--theme-color);
        }
    }
}
</style>
