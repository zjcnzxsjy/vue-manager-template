const path = require('path');
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');

module.exports = {
  publicPath: "./",
  devServer: {
    port: 8092,
    proxy: {
      "/api/*": {
        target: "https://www.easy-mock.com/mock/5b95cb4a9b7e7a16f787f6e2",
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: (config)=>{
    config.plugins.push(new SkeletonWebpackPlugin({
      webpackConfig: {
        entry: {
          app: path.join(__dirname, './src/skeleton.js'),
        },
      },
      minimize: true,
      quiet: true,
      // router: {
      //   mode: 'hash',
      //   routes: [
      //     {
      //       path: '/mainIndex',
      //       skeletonId: 'skeleton'
      //     }
      //   ]
      // }
    })) 
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  }
};
