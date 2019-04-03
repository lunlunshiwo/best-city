<template>
  <div class="navbody">
    <div
      class="navList"
      @touchstart.stop.prevent="start"
      @touchmove.stop.prevent="move"
    >
      <div
        v-for="item in navList"
        :key="item"
        :class="navClass(item)"
        :data-name="item"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import { handleDomData, getIndex } from '../common/js/dom';
export default {
  name: 'NavList',
  props: {
    navList: {
      type: Array,
      default: () => []
    },
    flagText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      touch: {
        start: 0,
        startIndex: '',
        end: 0,
        endIndex: ''
      },
      itemHight: 20,
      paddingTop: 10
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.itemHight = document.querySelector('.navList .navItem').offsetHeight;
      this.paddingTop = parseInt(getComputedStyle(document.querySelector('#vuecity .navbody'), false).paddingTop, 10);
    });
  },
  methods: {
    // 根据不同的状况赋值不同的样式
    navClass(item) {
      return this.flagText === item ? 'flagItem' : 'navItem';
    },
    // 向上触发scroll滚动事件
    scrollToElement(item) {
      this.$emit('toElement', item);
    },
    // 触摸开始，并向上触发滚动事件
    start(e) {
      const item = handleDomData(e.target, 'data-name');
      this.touch.start = e.touches[0].pageY;
      this.touch.startIndex = getIndex(this.navList, item);
      this.scrollToElement(item);
    },
    // 触摸过程中，根据距离变化应计算滚动到的位置
    move(e) {
      this.touch.end = e.touches[0].pageY;
      const distance = this.touch.end - this.touch.start;
      this.touch.endIndex = Math.min(
        Math.max(
          this.touch.startIndex + Math.floor((distance + this.paddingTop) / this.itemHight), 0
        )
        , this.navList.length - 1
      );
      this.scrollToElement(this.navList[this.touch.endIndex]);
    }
  }
};
</script>

<style lang="stylus" scoped>
.navbody
  width 20px
  border-radius 10px
  height 480px
  position absolute
  top 50%
  right 0
  margin-top -230px
  z-index 95
  box-sizing border-box
  padding 10px 0px
  .navItem
    width 20px
    height 20px
    text-align center
    line-height 20px
    font-size 16px
    color #777
    user-select none
  .flagItem
    width 20px
    height 20px
    text-align center
    line-height 20px
    font-size 14px
    color #fff
    background #4395ff
    border-radius 10px
    user-select none
</style>
