import fastclick from 'fastclick';
import FineCity from './FineCity.vue';
import '../packages/common/icon/iconfont'
const comment = {
  install: (Vue) => {
    Vue.component(FineCity.name, FineCity);
  }
};
fastclick.attach(document.body); // fastclick插件使用

// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(comment);
}
// 导出模块
export default FineCity;
