<template>
  <div class="listbox">
    <p class="city-item" v-for="city in searchListContent" :key="city.id" @click="changeCity(city.name)">{{city.name}}</p>
  </div>
</template>

<script>
export default {
  name: 'CityItem',
  props: {
    searchListContent: Array
  },
  methods: {
    changeCity (name) {
      this.$emit('changeName', name)
    }
  }
}
</script>

<style lang="stylus" scoped>
.listbox
  width 100%
  background #fff
  .city-item
    background #fff
    margin 0px 10px
    height 35px
    line-height 35px
    border-bottom 1px solid #ccc
    box-sizing border-box
  .city-item:last-child
    border none
</style>
