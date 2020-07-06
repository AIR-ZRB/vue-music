<template>
    <div class="dynamic">
        <div class="header-message">
            <!-- <img :src="_props.dynamic.tailMark.circle.imageUrl" alt="">
            <div>
                <p class="name">{{_props.dynamic.tailMark.markTitle}}</p>
                <p class="time">{{new Date(_props.dynamic.eventTime)}}</p>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    props: ["dynamic"],
    data() {
        return {};
    },
    methods: {},
    created() {
        // console.log(this._props.dynamic.tailMark.circle)
    },
    mounted() {
        // 获取动态信息里的circle信息会报错？？？？
        // console.log(this._props.dynamic.tailMark.circle.imageUrl);
        // JSON是朋友说过的话
        console.log(JSON.parse(this._props.dynamic.json))
    },
};
</script>

<style lang="scss">
.dynamic {
    .header-message {
        display: flex;
        // justify-content: center;
        align-items: center;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
}
</style>
