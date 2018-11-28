module.exports = {
  baseUrl: "./",
  devServer: {
    port: 8092,
    proxy: {
      "/api/*": {
        target: "https://www.easy-mock.com/mock/5b95cb4a9b7e7a16f787f6e2",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
