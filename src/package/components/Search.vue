<template>
  <div class="search-box">
    <div class="ipt-box">
      <form
        action="javascript:return true"
        @submit.prevent="formSubmit"
      >
        <input
          v-model="searchText"
          class="searchInput"
          type="search"
          v-bind:placeholder="placeholderTxt"
          @input="entry()"
        >
      </form>
      <div class="icon-box">
        <i class="iconfont icon-sousuo icon" />
      </div>
      <div class="mask-box" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    clearText: Boolean,
    canSearchSpell: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      searchText: '',
      timer: {}
    };
  },
  computed: {
    placeholderTxt() {
      return this.canSearchSpell ? '城市名/拼音' : '请输入城市名';
    }
  },
  watch: {
    // 清除搜索内容
    clearText(val) {
      if (val) {
        this.searchText = '';
        this.entry();
      }
    }
  },
  methods: {
    formSubmit() {
      this.$emit('txtdata', this.searchText);
    },
    // 延时搜索
    entry() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.$emit('txtdata', this.searchText);
      }, 300);
    }
  }
};
</script>
<style scoped>
.search-box {
  height: 100%;
  width: 50%;
  margin: 0px auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.search-box > .ipt-box {
  width: 95%;
  position: relative;
  height: 30px;
  border-radius: 15px;
  background: #eee;
  padding-top: 6px;
  box-sizing: border-box;
}
.searchInput {
  display: block;
  width: 100%;
  padding-left: 30%;
  padding-right: 15%;
  border: none;
  outline: none;
  border-radius: 20px;
  box-sizing: border-box;
  font-size: 12px;
  background: #eee;
  line-height: 18px;
  height: 18px;
}
input::-webkit-clear {
  display: none;
}
.search-box > .ipt-box > .icon-box {
  position: absolute;
  top: 0;
  left: 30%;
  margin-left: -20px;
  z-index: 50;
  width: 16px;
  height: 30px;
  line-height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.search-box > .ipt-box > .mask-box {
  position: absolute;
  top: 0;
  right: 15%;
  margin-right: -5px;
  z-index: 50;
  width: 16px;
  height: 30px;
  line-height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #eee;
}
.search-box > .ipt-box > .icon-box > .icon {
  font-size: 16px;
  font-weight: 900;
  color: #aaa;
}
</style>
