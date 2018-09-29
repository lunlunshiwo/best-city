<template>
  <div class="mask-box">
    <div class="mask-body"></div>
    <div class="btn-box">
      <div class="message">
        <p>{{message}}</p>
      </div>
      <div class="btn-left" @click="chooseTrue()">
        <p>确定</p>
      </div>
      <div class="btn-right" @click="chooseFalse()">
        <p>取消</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaskBox',
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  methods: {
    chooseTrue () {
      this.$emit('chooseing', true);
    },
    chooseFalse () {
      this.$emit('chooseing', false);
    }
  }
};
</script><style lang="stylus" scoped>
.mask-box
  width 100%
  height 100%
  position absolute
  top 0
  left 0
  .mask-body
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    background #000000
    opacity 0.2
    z-index 200
  .btn-box
    width 300px
    height 155px
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    margin auto
    background #ffffff
    z-index 300
    border-radius 8px
    .message
      width 100%
      height 108px
      border-radius 8px 8px 0 0
      line-height 22px
      text-align center
      border-bottom 2px solid #666
      float left
      display flex
      flex-direction column
      justify-content space-around
      align-items center
      p
        font-size 22px
        font-weight 900
    .btn-left
      width 149px
      height 45px
      border-radius 0 0 0 8px
      border-right 1px solid #666
      text-align center
      line-height 45px
      float left
      p
        font-size 16px
        font-weight 900
    .btn-right
      width 149px
      height 45px
      border-radius 0 0 8px 0
      border-left 1px solid #666
      text-align center
      line-height 45px
      float left
      p
        font-size 16px
        font-weight 900
</style>
