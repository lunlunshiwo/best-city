<template>
  <transition name="mapStyle">
    <city-view
      v-if="showStatus"
      :hide="hide"
      @closeChooseCity="closeChooseCity"
    ></city-view>
  </transition>
</template>

<script>
import CityView from './view/view.vue';

export default {
  components: {
    'city-view': CityView
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
    }
  },
  data() {
    return {
      showStatus: false
    };
  },
  methods: {
    show() {
      this.showStatus = true;
    },
    hide() {
      this.showStatus = false;
    },
    closeChooseCity(res) {
      this.$emit('closeChooseCity', res);
    }
  }
};
</script>

<style lang="stylus">
@import 'common/icon/iconfont.css'
@import 'common/stylus/index.styl'
.mapStyle-enter-active, .mapStyle-leave-active
  transition all 0.2s ease
.mapStyle-enter, .mapStyle-leave-to
  transform translateY(-100%)
</style>
