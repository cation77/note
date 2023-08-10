---
title: vue3 响应式
---

项目使用 vite 构建

## 配置 PostCSS

如果项目包含有效的 PostCSS 配置 (任何受 postcss-load-config 支持的格式，例如 postcss.config.js)，它将会自动应用于所有已导入的 CSS。

### 安装依赖包

```shell
yarn add postcss postcss-pxtorem -D
```

### 配置 px 转 rem

```js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      //根元素字体大小
      rootValue: 16,
      //匹配CSS中的属性，* 代表启用所有属性
      propList: ['*'],
      //转换成rem后保留的小数点位数
      unitPrecision: 5,
      //小于12px的样式不被替换成rem
      minPixelValue: 12,
      //忽略一些文件，不进行转换，比如我想忽略 依赖的UI框架
      exclude: ['node_modules']
    }
  }
}
```

### 设置 rem

方案一

```js
// 基准大小
const baseSize = 16
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于1920宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 1920
  // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
```

方案二

```js
// html fontSize 初始为16px
// 1rem = 10px
document.querySelector('html').style.fontSize = '62.5%';
```

方案三

```css
html {
  font-size：calc(100vw/7.5)
}
```

## 参考

1. [vite css](https://vitejs.cn/vite3-cn/guide/features.html#css)
2. [对比px、em、rem有什么不同](https://github.com/haizlin/fe-interview/issues/29#issuecomment-659119958)
