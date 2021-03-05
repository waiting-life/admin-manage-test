module.exports = {
  devServer: {
    proxy: 'http://localhost:3000'
  },
  configureWebpack: {
    resolve: {
      alias: {
        "assets": "@/assets",
        "common": "@/common",
        "components": "@/components",
        "network": "@/network",
        "utils": "@/utils",
        "layout": "@/layout",
        "icons": "@/icons",
        "views": "@/views"
      }
    }
  }
};