<template>
    <div class="dynamic" v-if="dynamic.tailMark !== null">
        <div class="header-message">
            <img :src="_props.dynamic.tailMark.circle.imageUrl" alt="" />
            <div class="message">
                <div>
                    <p class="name">{{ _props.dynamic.tailMark.markTitle }}</p>
                    <p class="time">{{ new Date(_props.dynamic.eventTime) }}</p>
                </div>
                <div class="formattingDynamic">
                    <p>{{ formattingDynamic }}</p>
                    <div class="shareMusic" v-if="msg.song">
                        <img :src="msg.song.album.picUrl" alt="" />
                        <div>
                            <p>{{ msg.song.album.name }}</p>
                            <p>{{ msg.song.album.artists[0].name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["dynamic"],
    data() {
        return {
            msg: "",
        };
    },
    computed: {
        formattingDynamic() {
            return JSON.parse(this._props.dynamic.json).msg;
        },
    },
    created() {
        this.msg = JSON.parse(this._props.dynamic.json);
    },
};
</script>

<style lang="scss">
.dynamic {
    padding-bottom: 40px;
    margin-bottom: 40px;
    border-bottom: 1px solid var(--theme-color);
    .header-message {
        display: flex;
        // justify-content: center;
        // align-items: center;
        margin-bottom: 10px;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }
        .message {
            // margin-top: 10px;
            width: 100%;
            .time {
                font-size: 14px;
                color: #666;
            }
        }
        .formattingDynamic {
            margin-top: 20px;
            width: 100%;

            .shareMusic {
                width: 100%;
                margin-top: 10px;
                padding: 10px;
                background: #eee;
                display: flex;
                justify-content: flex-start;
                img {
                    border-radius: 0;
                }
            }
        }
    }
}
</style>
