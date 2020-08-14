module.exports = {
    css: {
        sourceMap: false,
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/assets/css/vars.scss";`,
            },
        },
    },
};
