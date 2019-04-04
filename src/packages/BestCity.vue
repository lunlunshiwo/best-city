<template>
  <transition :name="slideStyle">
    <city-view
      v-if="showStatus"
      :hide="hide"
      :backStyle="backStyle"
      :canSearchSpell="canSearchSpell"
      @closeChooseCity="closeChooseCity"
    ></city-view>
  </transition>
</template>

<script>
import CityView from './view/view.vue';
export default {
  name: 'BestCity',
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
    },
    slide: {
      type: String,
      default: 'vertical' // horizontal
    },
    backStyle: {
      type: String,
      default: 'retreat' // cross/retreat/tilted/fold/return
    },
  },
  data() {
    return {
      showStatus: false
    };
  },
  computed: {
    slideStyle() {
      return this.slide === 'horizontal' ? 'horizontalSide' : 'verticalSide'
    }
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
@import '/common/stylus/index.styl'
@import url('https://at.alicdn.com/t/font_1125658_wv3sr6cqm8f.css')
.horizontalSide-enter-active, .horizontalSide-leave-active, .verticalSide-enter-active, .verticalSide-leave-active
  transition all 0.2s ease
.horizontalSide-enter, .horizontalSide-leave-to
  transform translateX(100%)
.verticalSide-enter, .verticalSide-leave-to
  transform translateY(-100%)
</style>
