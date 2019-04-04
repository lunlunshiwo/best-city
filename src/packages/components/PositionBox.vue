<template>
  <div class="position-box">
    <div class="hostory">
      <p>当前定位</p>
      <div class="citybox">
        <button
          style="text-align:center;"
          @click="changeCity(location)"
        >
          <i
            class="iconfont icon-tubiao- icon"
            style="margin:0px auto;"
          >
            <a style="color:#666;font-size: 14px;">{{ location.name }}</a>
          </i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PositionBox',
  props: {
    location: {
      type: Object,
      default: () => {
        return {
          name: '北京',
          id: 1
        };
      }
    }
  },
  methods: {
    changeCity(city) {
      this.$emit('changeCity', city);
    }
  }
};
</script>
<style scoped>
.position-box {
  background: #eee;
  padding-bottom: 10px;
}
.position-box > .hostory {
  height: 85px;
  padding: 15px 10px 0px 10px;
  box-sizing: border-box;
}
.position-box > .hostory > p {
  line-height: 30px;
  color: #847d7d;
}
.position-box > .hostory > .citybox {
  height: 40px;
  box-sizing: border-box;
  padding-top: 5px;
}
.position-box > .hostory > .citybox > button {
  box-sizing: border-box;
  border-radius: 4px;
  outline: none;
  height: 30px;
  margin: 0px;
  background: #fdfdfd;
  color: #666;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
}
.position-box > .hostory > .citybox > button > .icon {
  color: #119dfc;
}
</style>
