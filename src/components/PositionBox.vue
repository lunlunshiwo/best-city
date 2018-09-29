<template>
  <div class="position-box">
    <div class="hostory">
      <p>当前定位</p>
      <div class="citybox">
        <button @click="changeCity(nowCity)" style="text-align:center;">
          <i class="iconfont icon-dingwei icon" style="margin:0px auto;">
            <a style="color:#666;font-size: 13px;">{{nowCity.name}}</a>
          </i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PositionBox',
  data () {
    return {
      nowCity: {
        name: '北京',
        id: 123
      }
    };
  },
  created () {
  },
  methods: {
    changeCity (name) {
      this.$emit('changeCity', name);
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
  width: 23%;
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
