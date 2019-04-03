<template>
  <div id="app">
    <button @click="showCity">点击</button>
    <vue-city
      ref="vuecity"
      :canSearchSpell="false"
      @closeChooseCity="getCity"
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
      message: '123'
    };
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

