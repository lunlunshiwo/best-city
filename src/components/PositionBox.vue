<template>
  <div class="positionbox">
    <div class="hostory">
      <p>定位 / 最近</p>
      <div class="citybox">
        <button @click="changeCity(nowCity)">
          <i class="iconfont icon-dingwei icon" style="margin:0px auto;">
            <a style="color:#666;font-size: 13px;margin-left: 5px;">{{nowCity}}</a>
          </i>
        </button>
      </div>
    </div>
    <div class="hot" v-if="needHotCity">
      <p>热门城市</p>
      <div class="citybox">
        <button v-for="(city,index) in hotCityList" :key="index" @click="changeCity(city.name)">
          <a style="color:#666;font-size: 13px;">{{city.name}}</a>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import hotCityList from 'common/js/hotCity';

export default {
  name: 'PositionBox',
  props: {
    hotCityList: {
      type: Array,
      default: () => {
        return hotCityList;
      }
    },
    needHotCity: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      nowCity: '北京'
    };
  },
  methods: {
    changeCity (name) {
      this.$emit('changeCity', name);
    }
  }
};
</script>
<style lang="stylus" scoped>
.positionbox
  background #eee
  padding-bottom 10px
  .hostory
    padding 5px 10px 0px 10px
    box-sizing border-box
    p
      line-height 30px
      color #847d7d
    .citybox
      height 40px
      box-sizing border-box
      button
        box-sizing border-box
        border-radius 4px
        outline none
        width 23%
        height 30px
        margin 5px 5%
        background #fdfdfd
        color #666
        float left
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        font-size 14px
        border none
        text-align center
        .icon
          color #119dfc
  .hot
    padding 5px 10px 0px 10px
    box-sizing border-box
    p
      line-height 30px
      color #847d7d
    .citybox
      height 80px
      box-sizing border-box
      display flex
      flex-flow row wrap
      justify-content flex-start
      button
        box-sizing border-box
        border-radius 4px
        outline none
        width 23%
        margin 5px 5%
        height 30px
        background #fdfdfd
        color #666
        float left
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        font-size 14px
        border none
        text-align center
        .icon
          color #119dfc
</style>
