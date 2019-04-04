<template>
  <div class="listbox">
    <p
      v-for="city in searchListContent"
      :key="city.id"
      class="city-search-item"
      @click="changeCity(city)"
    >{{ city.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'CityItem',
  props: {
    searchListContent: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeCity(city) {
      this.$emit('changeName', city);
    }
  }
};
</script>

<style lang="stylus" scoped>
.listbox
  width 100%
  background #fff
  .city-search-item
    background #fff
    margin 0px 10px
    height 35px
    line-height 35px
    border-bottom 1px solid #ccc
    box-sizing border-box
  .city-item:last-child
    border none
</style>
