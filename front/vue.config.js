module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/scss/_fonts.scss";
          @import "~@/scss/_variables.scss";
          @import "~@/scss/_mixins.scss";
          @import "~@/scss/_reset.scss";
          @import "~@/scss/_global.scss";
        `
      }
    }
  }
}
