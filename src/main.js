import Vue from 'vue';
import App from './App';
import fastclick from 'fastclick';
import 'common/icon/iconfont.css';

Vue.config.productionTip = false;

fastclick.attach(document.body); // fastclick插件使用
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
