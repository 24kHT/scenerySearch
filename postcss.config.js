// postcss.config.js
export default {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 设计稿的视口宽度
      viewportHeight: 667, // 设计稿的视口高度（可选）
      unitPrecision: 5, // 转换后的小数点位数
      viewportUnit: 'vw', // 要转换成的视口单位
      selectorBlackList: ['.ignore', '.hairlines'], // 不转换的类名
      minPixelValue: 1, // 小于或等于 1px 的值不转换
      mediaQuery: false, // 是否在媒体查询中转换
      exclude: [/node_modules/] // 排除的文件或文件夹
    }
  }
}
