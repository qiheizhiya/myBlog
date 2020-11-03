const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const cdn = {
  externals: {
    'vue': 'Vue',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter',
    'axios': 'axios',
    "element-ui": "ELEMENT",
  },
  css: [
    'https://lib.baomitu.com/element-ui/2.13.2/theme-chalk/index.css'
  ],
  js: [
    'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
    'https://lib.baomitu.com/element-ui/2.13.2/index.js',
    'https://cdn.bootcss.com/axios/0.19.2/axios.min.js'
  ]
}

module.exports = {
  // 基本路径
  publicPath: '/',
  assetsDir: './',
  // 输出文件目录
  outputDir: isProduction ? path.resolve(__dirname, '../public/pc') : 'devdist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
  filenameHashing: true,
  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性（注：仅影响构建时注入的标签）
  crossorigin: undefined,
  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。
  integrity: false,
  /**
   * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
   **/
  chainWebpack: config => {
    // 注入cdn
    config.plugin('html').tap(args => {
      // 生产环境或本地需要cdn时，才注入cdn
      if (isProduction) { args[0].cdn = cdn }
      return args
    })
  },

  configureWebpack: (config) => {
    // 配置解析别名
    config.resolve = { 
      extensions: ['.js', '.json', '.vue'],
      alias: {
        'vue': 'vue/dist/vue.js',
        '@': path.resolve(__dirname, './src'),
        '@img': path.resolve(__dirname, './src/assets/img'),
        '@c': path.resolve(__dirname, './src/components'),
      }
    }
    if (isProduction) {
      // 不打包这些资源
      config.externals = cdn.externals
      // 公共代码抽离
      config.optimization.splitChunks.cacheGroups = {
        vendor: {
          chunks: 'all',
          test: /node_modules/,
          name: 'vendor',
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100
        },
        common: {
          chunks: 'all',
          test: /[\\/]src[\\/]js[\\/]/,
          name: 'common',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 60
        },
        styles: {
          name: 'styles',
          test: /\.(le|sa|sc|c)ss$/,
          chunks: 'all',
          reuseExistingChunk: true,
          minChunks: 1,
          enforce: true
        }
      }
      config.mode = 'production'
      // 生产环境删除console
      config.optimization.minimizer[0].options.terserOptions.compress = { drop_console: true, drop_debugger: false, pure_funcs: ['console.log'] } // 移除console
      // //gzip压缩
      config.plugins.push(new CompressionPlugin({
        filename: '[path].gz[query]',
        //压缩算法
        algorithm: 'gzip',
        //匹配文件
        test: /\.js$|\.css$|\.html$|\.woff$|\.ttf$|\.eot$|/,
        //压缩超过此大小的文件,以字节为单位
        threshold: 1024,
        minRatio: 0.8,
        //删除原始文件只保留压缩后的文件
        deleteOriginalAssets: isProduction
      }))
      // config.plugins.push(new BundleAnalyzerPlugin()) // 是否查看构建后的信息
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。
    // 设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    requireModuleExtension: true,
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
  },
  parallel: require('os').cpus().length > 1,
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
