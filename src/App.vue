<template>
  <div id="app">
    <button @click="showCity">点击</button>
    <vue-city
      :canSearchSpell="false"
      :show="show"
      @closeChooseCity="close"
    ></vue-city>
  </div>
</template>
<script>
import VueCity from './index.js';
export default {
  name: 'VueCity',
  components: {
    'vue-city': VueCity
  },
  data: () => {
    return {
      show: false,
      message: '123'
    };
  },
  methods: {
    close(val) {
      this.show = false;
      console.log(val);
    },
    showCity() {
      this.show = true;
    }
  }
};
</script>

