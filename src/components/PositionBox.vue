<template>
  <div class="position-box">
    <div class="choose">
      <span>你已选择：{{chooseCity}}</span>
    </div>
    <div class="hostory">
      <p>定位/最近访问</p>
      <div class="citybox">
        <button @click="changeCity(orientate)">
          <i class="iconfont icon-dingwei icon"></i>{{orientate}}
        </button>
        <button @click="changeCity(item)" v-for="item in historyCityArr" :key="item">{{item}}</button>
      </div>
    </div>
    <div class="hot">
      <p>热门城市</p>
      <div class="citybox">
        <button v-for="city in hotCitys" :key="city" @click="changeCity(city)">{{city}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PositionBox',
  props: {
    chooseCity: {
      type: String,
      default: ''
    },
    historyCityArr: Array,
    orientate: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      hotCitys: ['北京', '上海', '广州', '深圳', '天津', '西安', '重庆', '杭州', '南京']
    }
  },
  methods: {
    changeCity (name) {
      this.$emit('changeCity', name)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/css.styl'
.position-box
  background #f0efed
  padding-bottom 10px
  .choose
    height 40px
    border-top 2px #ccc solid
    border-bottom 1px #ccc solid
    box-sizing border-box
    line-height 37px
    padding-left 10px
    background #fdfdfd
    span
      font-weight 900
  .hostory
    height 70px
    padding 0px 10px
    box-sizing border-box
    p
      line-height 30px
      font-weight 900
      color $color-text
    .citybox
      height 40px
      box-sizing border-box
      padding-top 5px
      button
        box-sizing border-box
        border 1px solid #ddd8ce
        border-radius 4px
        outline none
        width 26%
        height 30px
        margin 0px 3.6%
        background #fdfdfd
        color $color-text
        float left
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        font-weight 900
        font-size 14px
        .icon
          color #4395ff
  .hot
    height 130px
    padding 0px 10px
    box-sizing border-box
    p
      line-height 30px
      font-weight 900
      color $color-text
    .citybox
      height 100px
      display flex
      flex-direction row
      justify-content space-around
      align-items center
      flex-wrap wrap
      button
        box-sizing border-box
        border 1px solid #ddd8ce
        border-radius 4px
        outline none
        width 26%
        height 30px
        margin 0px 3%
        background #fdfdfd
        color $color-text
        font-size 14px
</style>
