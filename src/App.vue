<template>
  <div id="app">
    <search @txtdata="searchText" :clearText="clearSearch"></search>
    <transition name="list">
      <search-list v-if="associationShow" :searchListContent="searchListContent" @changeName="changeCity"></search-list>
    </transition>
    <scroll :data="citylist" ref="suggest" :probeType="3" :listenScroll="true" @distance="distance" @scrollStore="scrollStore">
      <div>
        <position-box :chooseCity="chooseCity" :orientate="nowCity" :historyCityArr="historyCityArr" @changeCity="changeCity"></position-box>
        <city-list :citylist="citylist" :elementIndex="elementIndex" @positionCity="changeCity" @singleLetter="singleLetter"></city-list>
      </div>
    </scroll>
    <nav-list :navList="cityIndexList" @toElement="toElement" :flagText="flagText"></nav-list>
    <mask-box v-if="maskShow" :message="maskMessage" @chooseing="chooseResult"></mask-box>
    <transition name="flag">
      <div class="nowFlag" v-if="flag">{{flagText}}</div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import Search from 'components/Search'
import Scroll from 'base/Scroll.vue'
import PositionBox from 'components/PositionBox'
import CityList from 'components/CityList'
import NavList from 'components/NavList'
import MaskBox from 'components/MaskBox'
import SearchList from 'components/SearchList'
import { getSearchList } from 'common/js/search'
import { getDistance } from 'common/js/dom'

export default {
  name: 'App',
  data () {
    return {
      nowCity: '', // 当前所在的城市
      choiceCity: '', // 点击即将查看的城市
      choiceCityName: '', // 选择查看的城市
      historyCityArr: [], // 查看历史记录
      citylist: [], // 城市列表
      cityIndexList: ['顶'], // 右边导航栏列表
      maskShow: false, // 弹窗是否弹出
      maskMessage: '', // 弹窗展示的信息
      associationShow: false, // 是否开启联想展示框
      searchListContent: [], // 搜索页的内容数组
      clearSearch: false, // 是否清除输入框的文字
      elementIndex: '', // navlist页点击的index
      arrHeight: [], // 高度数组
      flag: false, // 字母牌是否显示
      flagText: '顶' // 字母牌显示的字
    }
  },
  created () {
    this.getNowCity()
    this.getCityListApi()
  },
  computed: {
    // 如果没有选择地址，默认切换到定位所在地址
    chooseCity () {
      return this.choiceCityName ? this.choiceCityName : this.nowCity
    }
  },
  methods: {
    // 定位当前所在城市
    getNowCity () {
      this.getCity()
      this.getHistory()
      axios.get('http://localhost:1234/nowcity').then((res) => {
        this.nowCity = res.data.city
        if (!this.choiceCity && !this.choiceCityName) {
          this.choiceCity = this.nowCity
          this.choiceCityName = this.nowCity
        }
      }, () => {
        this.nowCity = '北京'
        if (!this.choiceCity && !this.choiceCityName) {
          this.choiceCity = this.nowCity
          this.choiceCityName = this.nowCity
        }
      })
    },
    // 获取城市列表
    getCityListApi () {
      axios.get('http://localhost:1234/').then((res) => {
        this.citylist = res.data.openCityList
        this.citylist.map((item) => {
          this.cityIndexList.push(item[0])
        })
        this.getDomHeight()
      })
    },
    // 存到本地
    setHistory (arr) {
      localStorage.setItem('historyCityArr', arr)
    },
    // 从本地取
    getHistory () {
      let history = localStorage.getItem('historyCityArr')
      if (!history) {
        this.historyCityArr = []
      } else {
        this.historyCityArr = history.split(',')
      }
    },
    // 存到本地,正在查看的城市
    setCity (name) {
      localStorage.setItem('seeCity', name)
    },
    // 从本地取，,正在查看的城市
    getCity () {
      let name = localStorage.getItem('seeCity')
      if (!name) {
        this.choiceCity = ''
        this.choiceCityName = ''
      } else {
        this.choiceCity = name
        this.choiceCityName = name
      }
    },
    // 搜索框内容
    searchText (text) {
      if (text.length === 0) {
        this.associationShow = false
        return false
      }
      this.clearSearch = false
      this.associationShow = true
      this.searchListContent = getSearchList(text, this.citylist)
    },
    // 点击城市名字，弹出弹窗确认
    changeCity (name) {
      if (this.choiceCityName === name) {
        this.associationShow = false // 关闭搜索框（在搜索状态下）
        this.clearSearch = true // 清除输入框的字（在搜索状态下）
        return false
      }
      // 选择的城市的名字
      this.choiceCity = name
      this.maskMessage = `你确定要选择${name}么？`
      this.maskShow = true
    },
    // 关闭确认弹窗
    maskClose () {
      this.maskShow = false
    },
    // 是否确认切换定位
    chooseResult (res) {
      if (!res) {
        this.maskClose() // 不切换，仅关闭弹窗
      } else {
        this.choiceCityName = this.choiceCity
        this.local()
        this.associationShow = false // 关闭搜索框（在搜索状态下）
        this.clearSearch = true // 清除输入框的字（在搜索状态下）
        // 当确认后滚动到顶部
        this.$refs.suggest.scrollTo(0, 0, 200)
        this.maskClose()
      }
    },
    // 根据定位确定加缓存
    local () {
      if (this.choiceCityName !== this.nowCity) {
        this.historyCityArr.unshift(this.choiceCityName)
      }
      this.historyCityArr = this.historyCityArr.slice(0, 2)
      this.setCity(this.choiceCityName)
    },
    // 点击右边nav，向citylist组件传值
    toElement (text) {
      if (text === '顶') {
        this.$refs.suggest.scrollTo(0, 0, 200)
      }
      this.elementIndex = text
    },
    // 滚动到相应的dom节点
    singleLetter (dom) {
      this.$refs.suggest.scrollToElement(dom, 200, false, -1)
    },
    // 根据滑动距离显示字母牌上的字
    distance (val) {
      for (let i = 0, len = this.arrHeight.length; i < len; i++) {
        if (val < this.arrHeight[i]) {
          this.flagText = this.cityIndexList[i]
          return false
        }
      }
    },
    // 计算每一部分到顶端的距离
    getDomHeight () {
      let arr = getDistance(this.citylist)
      arr.unshift(250) // 向开始添加顶端的250px的距离
      let i = 0
      arr.map((val) => {
        i = i + val
        this.arrHeight.push(i)
      })
    },
    // 是否显示字母牌
    scrollStore (val) {
      this.flag = val
    }
  },
  watch: {
    historyCityArr (val) {
      this.setHistory(val)
    }
  },
  components: {
    'search': Search,
    'scroll': Scroll,
    'position-box': PositionBox,
    'nav-list': NavList,
    'city-list': CityList,
    'mask-box': MaskBox,
    'search-list': SearchList
  }
}
</script>

<style lang="stylus">
@import 'common/stylus/index.styl'
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  .nowFlag
    width 50px
    height 50px
    background #4395ff
    color #fff
    font-size 30px
    font-weight 900
    line-height 50px
    text-align center
    position absolute
    top 60px
    left 50%
    margin-left -25px
.list-enter-active, .list-leave-active
  transition all 0.5s
.list-enter
  opacity 0
.list-leave-to
  transform scale(0, 0)
  opacity 0
.flag-leave-active
  transition all 1s
.flag-leave-to
  opacity 0
</style>
