<template>
  <div class="lists">
    <div
      v-for="citys in citylist"
      :key="citys[0]"
      :dataNum="citys[1].length"
    >
      <p
        :ref="citys[0]"
        class="city-title"
      >{{ citys[0] }}</p>
      <p
        v-for="city in citys[1]"
        :key="city.id"
        class="city-item"
        @click="changeCity(city)"
      >{{ city.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CityList',
  props: {
    'citylist': {
      type: Array,
      default: () => []
    },
    elementIndex: {
      type: String,
      default: ''
    }
  },
  watch: {
    elementIndex(val) {
      if (!val) return;
      if (val === '顶') return;
      this.$emit('singleLetter', this.$refs[val][0]);
    }
  },
  methods: {
    changeCity(city) {
      this.$emit('positionCity', city);
    }
  }
};
</script>

<style lang="stylus" scoped>
.lists
  width 100%
  background #fff
  div
    .city-title
      height 30px
      border-top 1px solid #ccc
      background #f0efed
      line-height 29px
      padding-left 10px
      box-sizing border-box
    .city-item
      margin 0px 10px
      height 35px
      line-height 35px
      border-bottom 1px solid #ccc
      box-sizing border-box
    .city-item:last-child
      border none
</style>
