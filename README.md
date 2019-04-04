# fine-city

[![npm](https://img.shields.io/badge/npm-1.0.5-blue.svg)](https://www.npmjs.com/package/fine-city) [![downloads](https://img.shields.io/badge/downloads-1.0.5-green.svg)](https://github.com/lunlunshiwo/fine-city)

## fine-city 是什么

**fine-city** 是一款用于解决移动端选择城市需求的插件。在兼顾体验度如丝般顺滑的同时，做到了市面上大多数插件不曾拥有的交互体验，力求做到如真实的ntive般的体验。

不仅在移动网页端，**fine-city** 在还是雏形阶段时已经被应用到了H5+混合移动app应用中，并成为应用的一大亮点。

在fine-city的右边是一条Nav，不仅仅可以点击，还能如丝般顺滑的滑动，手指划过Nav，与城市列表交互的感觉是别的插件无法带给你的。


## Attributes
在1.0.5发布的fine-city中，用户可以根据设置属性来定制属于自己的移动端城市选择组件。

| 参数 | 说明	| 类型 | 可选值| 默认值|
|:---|:---|:---|:---|:---|
| slide | 插件页面过渡动画 | String | vertical/horizontal | vertical |
| canSearchSpell | 是否支持拼音搜索 | Boolean | true/false | true |
| location | 当前定位 | Object | —— | 北京 |
| backStyle | 返回键的样式 | String | cross/retreat/tilted/fold/return | retreat |

## Events
在1.0.5发布的fine-city中，用户可以根据事件在获得插件的返回值。

| 事件名称 | 说明	| 回调参数 |
|:---|:---|:---|
| closeChooseCity | 关闭城市选择插件的事件 | 选中的 city 对象 / null |

## Methods
在1.0.5发布的fine-city中，用户可以调用插件的方法达到自己的目的。

| 方法名称 | 说明	| 回调参数 |
|:---|:---|:---|
| show | 打开城市选择插件 | —— |
| hide | 关闭城市选择插件 | —— |

## 用法
fine-city用法简单，首先下载依赖：
```js
npm install fine-city -S
```
然后添加到你的项目中, 将下列代码加在 main.js中:
```js
import FineCity from 'fine-city'

Vue.use(FineCity)
```
## Model
```HTML
<template>
  <div id="app">
    <button @click="showCity">点击</button>
    <fine-city
      ref="vuecity"
      @closeChooseCity="getCity"
    ></fine-city>
  </div>
</template>
```
```js
export default {
  name: 'app',
  methods: {
    getCity(val) {
      console.log(val);
    },
    showCity() {
      this.$refs.vuecity.show();
    }
  }
};
```
## Screenshot
![](https://i.loli.net/2019/04/04/5ca60face3c18.gif)