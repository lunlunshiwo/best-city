<template>
  <div id="app">
    <button @click="showCity">点击</button>
    <best-city
      ref="vuecity"
      slide="horizontal"
      backStyle="tilted"
      @closeChooseCity="getCity"
    ></best-city>
  </div>
</template>
<script>
import BestCity from './index.js';
export default {
  name: 'app',
  components: {
    'best-city': BestCity
  },
  methods: {
    getCity(val) {
      console.log(val);
    },
    showCity() {
      this.$refs.vuecity.show();
    }
  }
};
</script>

