import fastclick from 'fastclick';
import VueCity from './VueCity.vue';
const comment = {
  install: (Vue) => {
    Vue.component(VueCity.name, VueCity);
  }
};
fastclick.attach(document.body); // fastclick插件使用

// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment);
}
// 导出模块
export default VueCity;
