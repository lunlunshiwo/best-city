<template>
  <transition name="mapStyle">
    <div id="vuecity">
      <div class="pattern-box">
        <span
          class="mapBack"
          @click="mapBack(null)"
        >
          <i
            class="iconfont icon-fanhui2"
            style="fontSize:30px"
          ></i>
        </span>
        <search
          :can-search-spell="canSearchSpell"
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
            <position-box
              :location="location"
              :choice-city-name="chooseCityName"
              @changeCity="changeCity"
            />
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
        v-show="!associationShow"
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
  </transition>
</template>

<script>
import Search from '../components/Search';
import Scroll from '../components/Scroll.vue';
import PositionBox from '../components/PositionBox';
import CityList from '../components/CityList';
import NavList from '../components/NavList';
import MaskBox from '../components/MaskBox';
import SearchList from '../components/SearchList';
import { getSearchList } from '../common/js/search';
import { getDistance } from '../common/js/dom';
import openCityList from '../common/js/cityData';

export default {
  name: 'VueCity',
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
          acronym: 'bj',
          firstChar: 'B',
          id: 1,
          name: '北京',
          pinyin: 'beijing',
          rank: 'S'
        };
      }
    },
    hide: {
      type: Function,
      default: null
    }
  },
  data: () => {
    return {
      chooseCityName: null, // 选择查看的城市
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
  created() {
    this.getCityListApi();
  },
  methods: {
    // 获取城市列表
    getCityListApi() {
      const arr = this.citylist.map((item) => item[0]);
      this.cityIndexList = this.cityIndexList.concat(arr);
      this.getDomHeight();
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
      if (this.chooseCityName !== null && this.chooseCityName.name === city.name) {
        // 关闭搜索框（在搜索状态下）
        this.associationShow = false;
        // 清除输入框的字（在搜索状态下）
        this.clearSearch = true;
        return false;
      }
      // 选择的城市的名字
      this.maskMessage = city;
      this.maskShow = true;
    },
    // 关闭确认弹窗
    maskClose() {
      this.maskShow = false;
    },
    // 关闭组件
    mapBack(res) {
      this.hide();
      this.$emit('closeChooseCity', res);
    },
    // 是否确认切换定位
    chooseResult(res) {
      if (res) {
        this.chooseCityName = res;
        // 关闭搜索框（在搜索状态下）
        this.associationShow = false;
        // 清除输入框的字（在搜索状态下）
        this.clearSearch = true;
        // 当确认后滚动到顶部
        this.$refs.suggest.scrollTo(0, 0, 200);
        this.maskClose();
        this.mapBack(res);
      } else {
        // 不切换，仅关闭弹窗
        this.maskClose();
      }
    },
    // 点击右边nav，向citylist组件传值
    toElement(text) {
      if (text === '顶') {
        this.$refs.suggest.scrollToElement(this.$refs.positionBox, 300, false, 0);
      }
      this.elementIndex = text;
    },
    // 滚动到相应的dom节点
    singleLetter(dom) {
      this.$refs.suggest.scrollToElement(dom, 300, false, 0);
    },
    // 根据滑动距离显示字母牌上的字
    distance(val) {
      this.elementIndex = '';
      const index = this.arrHeight.findIndex((item) => val < item);
      this.flagText = this.cityIndexList[index];
    },
    // 计算每一部分到顶端的距离
    getDomHeight() {
      this.$nextTick(() => {
        const titleHeight = document.querySelector('#vuecity .lists .city-title').offsetHeight;
        const itemHeight = document.querySelector('#vuecity .lists .city-item').offsetHeight;
        const positionboxHeight = document.querySelector('#vuecity .position-box').offsetHeight;
        const arr = getDistance(this.citylist, titleHeight, itemHeight);
        arr.unshift(positionboxHeight);
        let i = 0;
        arr.forEach((val) => {
          i = i + val;
          this.arrHeight.push(i);
        });
      });
    },
    // 是否显示字母牌
    scrollStore(val) {
      this.flag = val;
      if (!val) {
        // 兼容better-scroll的bug
        this.distance(-1 * this.$refs.suggest.scroll.y);
      }
    }
  }
};
</script>

<style lang="stylus">
.mapStyle-enter-active, .mapStyle-leave-active
  transition all 0.2s ease
.mapStyle-enter, .mapStyle-leave-to
  transform translateY(-100%)
#vuecity
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  height 100%
  width 100%
  font-size 12px
  position absolute
  top 0px
  left 0px
  z-index 1000000000000
  .pattern-box
    width 100%
    height 45px
    position relative
    background #fff
    .mapBack
      display block
      width 30px
      height 45px
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
