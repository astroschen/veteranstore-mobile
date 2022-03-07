module.exports = {
  lintOnSave: false,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false
    extract: false,

    // 是否开启 CSS source map？
    sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    /* loaderOptions: {
      sass: {
        prependData: `@import "@/styles/common.scss";`,
      },
      less: {
        prependData: `@import "@/styles/common.less";`,

      }
    }, */
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。

    requireModuleExtension: true,
  },
  devServer: {
    // 此处开启 https
    https: true,
    proxy: {
      '/gds': {
        target: 'https://bff.gds.org.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/local': ''
        }
      },
    }
  }
}
