import Vue from 'vue';
import App from './App.vue';
import fastclick from 'fastclick';
import './common/icon/iconfont.css';

Vue.config.productionTip = false;

fastclick.attach(document.body); // fastclick插件使用

new Vue({
  render: (h) => h(App)
}).$mount('#app');
