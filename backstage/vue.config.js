const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin"); // gzip压缩


module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '/back/' : '/',
  // 输出文件目录
  outputDir: process.env.NODE_ENV === 'production' ? path.resolve(__dirname, '../public/back') : 'devdist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  /**
   * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
   **/
  configureWebpack: (config) => {
    config.resolve = { // 配置解析别名
      extensions: ['.js', '.json', '.vue'],
      alias: {
        'vue': 'vue/dist/vue.js',
        '@': path.resolve(__dirname, './src'),
        '@img': path.resolve(__dirname, './src/assets/img'),
        '@c': path.resolve(__dirname, './src/components'),
      }
    },
    config.externals = { // 不打包elementUi和Vue 使用cdn的方式引入
      "element-ui": "ELEMENT",
      'vue': 'Vue'
    },
    process.env.NODE_ENV === 'production' ? config.mode = 'production' : config.mode = 'development'
    // config.optimization.minimizer[0].options.terserOptions.compress = { drop_console: process.env.NODE_ENV === 'production', drop_debugger: false, pure_funcs: ['console.log'] } // 移除console
    config.plugins.push(new CompressionPlugin({
      filename: '[path].gz[query]',
      //压缩算法
      algorithm: 'gzip',
      //匹配文件
      test: /\.js$|\.css$|\.html$|/,
      //压缩超过此大小的文件,以字节为单位
      threshold: 1024,
      minRatio: 0.8,
      //删除原始文件只保留压缩后的文件
      // deleteOriginalAssets: process.env.NODE_ENV === 'production'
    }))
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: {
        prependData: `@import "./src/styles/main.scss";`
      }
    }
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  /**
   *  PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   */
  pwa: {},
  // webpack-dev-server 相关配置
  // devServer: {
  //   hot: true, // 开启热加载
  //   hotOnly: false,
  //   proxy: { // 设置代理
  //     '/api': {
  //       target: 'http://localhost:5008', //API服务器的地址
  //       changeOrigin: true
  //     }
  //   },
  //   overlay: { // 全屏模式下是否显示脚本错误
  //     warnings: true,
  //     errors: true
  //   },
  //   before: app => {}
  // },
  /**
   * 第三方插件配置
   */
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 需要通过less-loader自动引入的资源，集合类型
      patterns: [path.resolve(__dirname, 'src/style/normalize.less')]
    }
  }
}
