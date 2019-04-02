<template>
  <div class="listbody">
    <scroll :data="searchListContent">
      <div>
        <city-item
          :search-list-content="searchListContent"
          @changeName="changeCity"
        />
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from './Scroll.vue';
import CityItem from './CityItem.vue';
export default {
  name: 'SearchList',
  components: {
    'scroll': Scroll,
    'city-item': CityItem
  },
  props: {
    searchListContent: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 点击列表触发改变定位的事件
    changeCity(name) {
      this.$emit('changeName', name);
    }
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
