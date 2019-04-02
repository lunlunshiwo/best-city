<template>
  <div class="listbody">
    <scroll :data="searchListContent">
      <div>
        <city-item
          :searchListContent="searchListContent"
          @changeName="changeCity"
        ></city-item>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/Scroll.vue';
import CityItem from 'base/CityItem.vue';
export default {
  name: 'SearchList',
  props: {
    searchListContent: Array
  },
  methods: {
    // 点击列表触发改变定位的事件
    changeCity(name) {
      this.$emit('changeName', name);
    }
  },
  components: {
    'scroll': Scroll,
    'city-item': CityItem
  }
};
</script>

<style lang="stylus" scoped>
.listbody
  width 100%
  height 100%
  background #f5f5f5
  position absolute
  z-index 100
</style>
