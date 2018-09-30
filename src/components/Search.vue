<template>
  <div class="search-box">
    <div class="ipt-box">
      <form @submit.prevent="formSubmit" action="javascript:return true">
        <input class='searchInput' type="search" :placeholder="placeholder" @input="entry()" v-model="searchText" />
      </form>
        <div class="icon-box">
          <i class="iconfont icon-sousuo icon"></i>
        </div>
        <div class="mask-box">
        </div>
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
  data () {
    return {
      searchText: '',
      timer: {}
    };
  },
  computed: {
    placeholder () {
      return this.canSearchSpell ? '城市名称/拼音' : '城市名称';
    }
  },
  methods: {
    formSubmit () {
      this.$emit('txtdata', this.searchText);
    },
    // 延时搜索
    entry () {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.$emit('txtdata', this.searchText);
      }, 300);
    }
  },
  watch: {
    // 清除搜索内容
    clearText (val) {
      if (val) {
        this.searchText = '';
        this.entry();
      }
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
