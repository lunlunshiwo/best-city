<template>
  <div id="app">
    <div class="pattern-box">
      <span class="mapBack">
        <i class="iconfont icon-close">X</i>
      </span>
      <search
        :clear-text="clearSearch"
        @txtdata="searchText"
      />
    </div>
    <div style="height: calc(100% - 45px);width: 100%;">
      <transition name="list">
        <search-list
          v-if="associationShow"
          :search-list-content="searchListContent"
          @changeName="changeCity"
        />
      </transition>
      <scroll
        ref="suggest"
        :data="citylist"
        :probe-type="3"
        :listen-scroll="true"
        @distance="distance"
        @scrollStore="scrollStore"
      >
        <div>
          <div ref="positionBox" />
          <position-box @changeCity="changeCity" />
          <city-list
            :citylist="citylist"
            :element-index="elementIndex"
            @positionCity="changeCity"
            @singleLetter="singleLetter"
          />
        </div>
      </scroll>
    </div>
    <nav-list
      :nav-list="cityIndexList"
      :flag-text="flagText"
      @toElement="toElement"
    />
    <mask-box
      v-if="maskShow"
      :message="maskMessage"
      @chooseing="chooseResult"
    />
    <transition name="flag">
      <div
        v-if="flag"
        class="nowFlag"
      >{{ flagText }}</div>
    </transition>
  </div>
</template>

<script>
import Search from './components/Search';
import Scroll from './base/Scroll.vue';
import PositionBox from './components/PositionBox';
import CityList from '././components/CityList';
import NavList from './components/NavList';
import MaskBox from './components/MaskBox';
import SearchList from './components/SearchList';
import { getSearchList } from './common/js/search';
import { getDistance } from './common/js/dom';
import openCityList from './common/js/cityData';

export default {
  name: 'App',
  components: {
    'search': Search,
    'scroll': Scroll,
    'position-box': PositionBox,
    'nav-list': NavList,
    'city-list': CityList,
    'mask-box': MaskBox,
    'search-list': SearchList
  },
  props: {
    // 是否可以使用拼音（若没拼音这个属性需要设置为false
    canSearchSpell: {
      type: Boolean,
      default: true
    },
    location: {
      type: Object,
      default: () => {
        return {
          name: '北京'
        };
      }
    }
  },
  data: () => {
    return {
      nowCity: '', // 当前所在的城市
      choiceCityName: '', // 选择查看的城市
      citylist: openCityList, // 城市列表
      cityIndexList: ['顶'], // 右边导航栏列表
      maskShow: false, // 弹窗是否弹出
      maskMessage: '', // 弹窗展示的信息
      associationShow: false, // 是否开启联想展示框
      searchListContent: [], // 搜索页的内容数组
      clearSearch: false, // 是否清除输入框的文字
      elementIndex: '', // navlist页点击的index
      arrHeight: [], // 高度数组
      flag: false, // 字母牌是否显示
      flagText: '顶' // 字母牌显示的字
    };
  },
  computed: {
    // 如果没有选择地址，默认切换到定位所在地址
    chooseCity() {
      return this.choiceCityName ? this.choiceCityName : this.nowCity;
    }
  },
  created() {
    this.getNowCity();
    this.getCityListApi();
  },
  methods: {
    // 定位当前所在城市
    getNowCity() {
      this.getCity();
      this.nowCity = '北京';
      if (!this.choiceCityName) {
        this.choiceCityName = this.nowCity;
      }
    },
    // 获取城市列表
    getCityListApi() {
      this.citylist.map((item) => {
        this.cityIndexList.push(item[0]);
      });
      this.getDomHeight();
    },
    // 存到本地,正在查看的城市
    setCity(name) {
      localStorage.setItem('seeCity', name);
    },
    // 从本地取，,正在查看的城市
    getCity() {
      const name = localStorage.getItem('seeCity');
      if (!name) {
        this.choiceCityName = '';
      } else {
        this.choiceCityName = name;
      }
    },
    // 搜索框内容
    searchText(text) {
      if (text.length === 0) {
        this.associationShow = false;
        return false;
      }
      this.clearSearch = false;
      this.associationShow = true;
      this.searchListContent = getSearchList(text, this.citylist, this.canSearchSpell);
    },
    // 点击城市名字，弹出弹窗确认
    changeCity(city) {
      if (this.choiceCityName === city.name) {
        // 关闭搜索框（在搜索状态下）
        this.associationShow = false;
        // 清除输入框的字（在搜索状态下）
        this.clearSearch = true;
        return false;
      }
      // 选择的城市的名字
      this.maskMessage = city.name;
      this.maskShow = true;
    },
    // 关闭确认弹窗
    maskClose() {
      this.maskShow = false;
    },
    // 是否确认切换定位
    chooseResult(res) {
      if (!res) {
        // 不切换，仅关闭弹窗
        this.maskClose();
      } else {
        this.choiceCityName = res;
        // 关闭搜索框（在搜索状态下）
        this.associationShow = false;
        // 清除输入框的字（在搜索状态下）
        this.clearSearch = true;
        // 当确认后滚动到顶部
        this.$refs.suggest.scrollTo(0, 0, 200);
        this.maskClose();
      }
    },
    // 点击右边nav，向citylist组件传值
    toElement(text) {
      if (text === '顶') {
        this.$refs.suggest.scrollToElement(this.$refs.positionBox, 200, false, 0);
      }
      this.elementIndex = text;
    },
    // 滚动到相应的dom节点
    singleLetter(dom) {
      this.$refs.suggest.scrollToElement(dom, 200, false, 30);
    },
    // 根据滑动距离显示字母牌上的字
    distance(val) {
      this.elementIndex = '';
      for (let i = 0, len = this.arrHeight.length; i < len; i++) {
        if (val < this.arrHeight[i]) {
          this.flagText = this.cityIndexList[i];
          return false;
        }
      }
    },
    // 计算每一部分到顶端的距离
    getDomHeight() {
      const arr = getDistance(this.citylist);
      // 向开始添加顶端的95px的距离,作为当前定位的高度
      arr.unshift(95);
      let i = 0;
      arr.map((val) => {
        i = i + val;
        this.arrHeight.push(i);
      });
    },
    // 是否显示字母牌
    scrollStore(val) {
      this.flag = val;
    }
  }
};
</script>

<style lang="stylus">
@import 'common/stylus/index.styl'
html
  body
    #app
      font-family 'Avenir', Helvetica, Arial, sans-serif
      -webkit-font-smoothing antialiased
      -moz-osx-font-smoothing grayscale
      color #2c3e50
      height 100%
      font-size 12px
      .pattern-box
        width 100%
        height 45px
        position relative
        background #fff
        .mapBack
          display block
          width 30px
          line-height 45px
          margin-left 8px
          position absolute
      .nowFlag
        width 50px
        height 50px
        background #4395ff
        color #fff
        font-size 30px
        font-weight 900
        line-height 50px
        text-align center
        position absolute
        top 60px
        left 50%
        margin-left -25px
.list-enter-active, .list-leave-active
  transition all 0.5s
.list-enter
  opacity 0
.list-leave-to
  transform scale(0, 0)
  opacity 0
.flag-leave-active
  transition all 1s
.flag-leave-to
  opacity 0
</style>
