<template>
  <div id="app">
    <button @click="showCity">点击</button>
    <fine-city
      ref="vuecity"
      :canSearchSpell="false"
      @closeChooseCity="getCity"
    ></fine-city>
  </div>
</template>
<script>
import FineCity from './index.js';
export default {
  name: 'app',
  components: {
    'fine-city': FineCity
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

