　　首先说一下，我不是阿里的人，也没去阿里面试过，这是某微信群里的一个小伙伴给的，我现在的能力达不到阿里的要求。不过人没梦想还不如咸鱼，有能力的话还是想去尝试一下。本文如有不足，请勿嘲讽，指出不足即可，谢谢。码字不易，且看且珍惜，转载请注明出处。原创博客，若侵犯贵司的利益，请私信我删除。若觉得不错，求个赞和github的star。      
　　题目如下：      
　　大概就是这样吧，分析一下就是做一个城市选择组件，实现的功能或者要求呢就是可以定位当前的城市、用localstorage存储上次定位的城市和最近选择过的城市、可以按照输入的字母或者文字筛选出想找的城市、将数据带到页面也就是一个父子传参的问题吧、页面使用flex布局。        
　　我在下班闲暇时间简单的做了一下， 如下：  
　　我仅仅做了这个组件，向页面传参的功能还没做，可以用父子组件传参完成。
# 知识点部分：
　　简单的说一下我这个城市选择组件和其中的一下知识点：
## 1.后台
　　　　我用node.js起了一个后台服务，使用的express框架，完成满足了我的需求。我的数据来源是爬取的某网站的城市地址(若侵权请联系我删除)，数据是这样的：
```Javascript
    {
      "id": 151,
      "name": "鞍山",
      "pinyin": "anshan",
      "acronym": "as",
      "rank": "C",
      "firstChar": "A"
    }
```
　　　　我在node端调用了某浪的一个定位接口作为我的定位服务，并将数据返回，当这个接口有问题或者没获取到的时候会返回定位在北京。具体代码为：
```Javascript
// 获取城市数据，city为我爬取的信息
app.get('/', function (req, res) {
    res.send(city);
    res.end()
});
// 调用新浪的接口返回定位
app.get('/nowcity', function (req, res) {
    let getIpInfo = function (cb) {
        var url = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json';
        http.get(url, function (res) {
            var code = res.statusCode;
            if (code == 200) {
                res.on('data', function (data) {
                    try {
                        cb(JSON.parse(data));
                    } catch (err) {
                        console.log(err)
                    }
                });
            }
        }).on('error',function(e){
            cb({
                city: "北京",
                country: "中国",
                province: "北京",
            })
        })
    };
    getIpInfo(function (msg) {
        let nowcity = msg
        res.send(nowcity)
        res.end()
    })
});
```
## 2.vue脚手架
　　　　本次组件基于vue框架，我使用vue-cli脚手架搭建的，这一块知识不多做描述，参考我的博客《vue环境搭建与创建第一个vuejs文件》。
## 3.stylus  
    本次我使用了css预处理程序——stylus。  
    在vue-cli中使用stylus首先要安装依赖  
    `npm install stylus --save-dev、npm install stylus-loader --save-dev`  
    然后再文件中使用  
    `<style lang="stylus" scoped>` 
    引入单独的stylus文件使用  
    `@import '~common/stylus/css.styl'`
## 4.本次项目的依赖
　　本次项目中，除了安装了有关stylus的依赖我还引入了better-scroll、fastclick、axios这三个依赖。  
    better-scroll是我见过的最好的处理移动端滚动的库了，并且文档清晰，思路明确。fastclick用于处理移动端click事件300毫秒延迟。至于axios，我想大家都知道，axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
## 5.vue组件的使用
　本次项目我构建了6个功能组件，分别是搜索框组件、搜索页组件、定位组件、侧边栏组件、弹窗组件、城市显示组件。还有俩个基础组件，分别是滚动组件和城市组件。  
  引入城市组件的方法是：
```Javascript
// 先引入文件
import Search from 'components/Search'
import Scroll from 'base/Scroll.vue'
import PositionBox from 'components/PositionBox'
import CityList from 'components/CityList'
import NavList from 'components/NavList'
import MaskBox from 'components/MaskBox'
import SearchList from 'components/SearchList'
// 然后在父组件中注册
components: {
    'search': Search,
    'scroll': Scroll,
    'position-box': PositionBox,
    'nav-list': NavList,
    'city-list': CityList,
    'mask-box': MaskBox,
    'search-list': SearchList
}
// 使用
<search @txtdata="searchText" :clearText="clearSearch"></search>
```
## 6.父子组件传参  
  父组件向子组件传参非常简单，就搜索框组件来说：
  ```Javascript
  <search @txtdata="searchText" :clearText="clearSearch"></search>
  ```  
  父组件给子组件传参只需要:clearText="clearSearch"即可，其中clearSearch为要传入的信息，clearText为子组件接收的名称。  
  在子组件中，使用props属性操作传参：  
  ```Javascript
  props: {
      clearText: Boolean
  }
  // 带默认参数的
  props: {
      clearText: {
        type: Boolean,
        default:false
      }
  }
  ```  
  子组件向父组件传参使用this.$emit传参：
  ```Javascript
// 点击列表触发改变定位的事件
this.$emit('txtdata', this.searchText)
  ```  
  在上面的代码中txtdata为传递到父组件的内容的名字，this.searchText为参数。在父组件端使用@来触发接收事件@txtdata="searchText"：
  ```Javascript
// 搜索框内容
    searchText (text) {
    // text即传递过来的参数
    }
   ```
## 7.延迟操作
    我们在处理前端的ajax时一般希望减少交互来提高性能和效率。在搜索框组件中，我们使用到了联想搜索的功能，这里我使用正则实现的。因此在打字的过程中，我们希望在打字完成菜进行交互（总不能让浏览器一直都在遍历数组或者Ajax）。在这里我使用了一个定时函数完成延时效果：
```Javascript
if (this.timer) {
   clearTimeout(this.timer) // 清除定时器
}
this.timer = setTimeout(() => {
   this.$emit('txtdata', this.searchText)
}, 300)
````  
    在这段代码中，我绑定了keyup事件，也就是说，300毫秒中只要有按钮弹起，就会触发事件清除上一个定时器，然后重新生成新的定时器，300毫秒内无输入则定时器触发，向父组件传递参数。
## 8.正则  
    话说曾经正则是我最头疼的事情，直到我有一天耐心的看了许多文档和博客。
```Javascript
export function getSearchList (text, list) {
  let reg1 = /^\w+$/g //检测是否为字母
  let reg2 = new RegExp(`^${text}`, 'g') //检测模板text
  let reg3 = new RegExp('^[\\u4E00-\\u9FFF]{1,}$', 'g') //检测是否为汉字
  let resList = []
    // 当text为字母时
  if (text.match(reg1)) {
    for (let i = 0, len1 = list.length; i < len1; i++) {
      for (let j = 0, len2 = list[i][1].length; j < len2; j++) {
    // 筛选满足这个正则的
        if (list[i][1][j].pinyin.match(reg2)) {
          resList.push(list[i][1][j])
        }
      }
    }
  } else {
    // 同上
    if (reg3.test(text)) {
      for (let i = 0, len1 = list.length; i < len1; i++) {
        for (let j = 0, len2 = list[i][1].length; j < len2; j++) {
          if (list[i][1][j].name.match(reg2)) {
            resList.push(list[i][1][j])
          }
        }
      }
    }
  }
  return resList
}
````  
    JavaScript通过内置对象RegExp支持正则表达式，有两种方式创建正则表达式对象，分别是构造函数var reg=new RegExp('<%[^%>]+%>','g')和字面量var reg=/<%[^%>]%>/g，因为我这次用到了模板语句，就是用了构造函数，最后的g代表全局。
```Javascript
//匹配一个字符，这个字符可以是0-9中的任意一个 
var reg1 = /[0123456789]/ 
//匹配一个字符，这个字符可以是0-9中的任意一个 
var reg2 = /[0-9]/ 
//匹配一个字符，这个字符可以是a-z中的任意一个 
var reg3 = /[a-z]/ 
//匹配一个字符，这个字符可以是大写字母、小写字母、数字中的任意一个 
var reg3 = /[a-zA-Z0-9]/
//匹配一个字符，这个字符可以是汉字的任意一个 
var reg4 = /[\\u4E00-\\u9FFF]/
```  
    我们还能引入开头结尾的限制：
* ^	以xxx开头
* $	以xxx结尾
* \b	单词边界
* \B	非单词边界
　　数量量词：
* ?	出现零次或一次（最多出现一次）
* +	出现一次或多次（至少出现一次）
* *	出现零次或多次（任意次）
* {n}	出现n次
* {n,m}	出现n到m次
* {n,}	至少出现n次
## 9.this.$refs
    一般来讲，获取DOM元素，需document.querySelector（".input1"）获取这个dom节点，然后在获取input1的值。但是用ref绑定之后，我们就不需要在获取dom节点了，直接在上面的input上绑定input1，然后$refs里面调用就行。然后在javascript里面这样调用：this.$refs.input1  这样就可以减少获取dom节点的消耗了。
```HTML
<div ref="wrapper" class="scroll">
</div>
```   
    此时this.$refs('wrapper')就代表了这个div
## 10.slot
    通过字面意思理解，slot为“插槽，水沟”，大概就是一个安放组件或者dom结构的地方。子组件模板必须包含至少一个 <slot> 插口，否则父组件的内容将会被丢弃。当子组件模板只有一个没有属性的插槽时，父组件传入的整个内容片段将插入到插槽所在的 DOM 位置，并替换掉插槽标签本身。最初在 <slot> 标签中的任何内容都被视为备用内容。备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时才显示备用内容。  
    假定 my-component 组件有如下模板：
```HTML
<div>
  <h2>我是子组件的标题</h2>
  <slot>
    只有在没有要分发的内容时才会显示。
  </slot>
</div>
```
    父组件模板：
```HTML
<div>
  <h1>我是父组件的标题</h1>
  <my-component>
    <p>这是一些初始内容</p>
    <p>这是更多的初始内容</p>
  </my-component>
</div>
```
    渲染结果：
```HTML
<div>
  <h1>我是父组件的标题</h1>
  <div>
    <h2>我是子组件的标题</h2>
    <p>这是一些初始内容</p>
    <p>这是更多的初始内容</p>
  </div>
</div>
```  
    本次项目的插槽：
```HTML
<!--父组件-->
<scroll :data="citylist" ref="suggest" :probeType="3" :listenScroll="true" @distance="distance" @scrollStore="scrollStore">
      <div>
        <position-box :chooseCity="chooseCity" :orientate="nowCity" :historyCityArr="historyCityArr" @changeCity="changeCity"></position-box>
        <city-list :citylist="citylist" :elementIndex="elementIndex" @positionCity="changeCity" @singleLetter="singleLetter"></city-list>
      </div>
</scroll>
<!--子组件-->
<div ref="wrapper" class="scroll">
    <slot></slot>
</div>
```
## 11.better-scroll的使用
```Javascript
this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        scrollY: true, // 滚动方向为Y轴
        click: true, // 是否派发click事件，通常判断浏览器派发的click还是betterscroll派发的click，可以用event._constructed，若是bs派发的则为true
        momentum: true, // 当快速滑动时是否开启滑动惯性
        bounce: false, // 是否启用回弹动画效果
        bounceTime: 700, // 弹力动画持续的毫秒数
        deceleration: 0.001, // 滚动动量减速越大越快，建议不大于0.01
        momentumLimitTime: 300, // 符合惯性拖动的最大时间
        momentumLimitDistance: 15, // 符合惯性拖动的最小拖动距离
        resizePolling: 60 // 重新调整窗口大小时，重新计算better-scroll的时间间隔
})
```  
    通过构建一个scroll对象来使用better-scroll，这里必须绑定一个dom节点，即this.$refs.wrapper。里面添加一些属性来自定义。  
    在本次项目中，我们使用了Bscroll的三个方法：  
    refresh()
    *参数：无
    *返回值：无
    *作用：重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。  
    scrollTo(x, y, time, easing)
    *参数：返回值：无
    *{Number} x 横轴坐标（单位 px）
    *{Number} y 纵轴坐标（单位 px）
    *{Number} time 滚动动画执行的时长（单位 ms）
    *{Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
    *作用：滚动到指定的位置  
    scrollToElement(el, time, offsetX, offsetY, easing)
    *参数：返回值：无
    *{DOM | String} el 滚动到的目标元素, 如果是字符串，则内部会尝试调用 querySelector 转换成 DOM 对象。（此处我使用了this.$refs）
    *{Number} time 滚动动画执行的时长（单位 ms）
    *{Number | Boolean} offsetX 相对于目标元素的横轴偏移量，如果设置为 true，则滚到目标元素的中心位置
    *{Number | Boolean} offsetY 相对于目标元素的纵轴偏移量，如果设置为 true，则滚到目标元素的中心位置
*{Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
*作用：滚动到指定的目标元素。

　　12.localstorage
　　　　我相信大家对localstorage和sessionstorage的区别已经都懂了，其最大的区别就是localstorage像ROM，而sessionstorage像RAM。

　　　　在本次项目中，通过setItem和getItem来操作localstorage：

localStorage.setItem('historyCityArr', arr)
localStorage.getItem('historyCityArr')
　　13.过渡transition
　　　　类似于在单位渲染和移除的时候添加一个动画特效。

    <transition name="flag">
      <div class="nowFlag" v-if="flag">{{flagText}}</div>
    </transition>
　　.flag-leave-active
  　　transition all 1s
　　.flag-leave-to
  　　opacity 0
　　　　对于至一段的解释为，添加一个离开（移除）的过渡，一秒钟内不透明度由1变成0。

　　14.stop&prevent
　　　　在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。为了解决这个问题，Vue.js 为 v-on 提供了事件修饰符。之前提过，修饰符是由点开头的指令后缀来表示的。

　　　　.stop 阻止事件冒泡

　　　　.prevent 阻止默认事件

　　　　.capture　阻止事件捕获

　　　　.once 只触发一次

业务部分：
　　1.搜索框组件
　　　　html代码如下：父组件向子组件传递是否清空内容的信息（用于点击搜索页选项后更改搜索页），子组件触发keyup事件时向父组件传递需要搜索的内容。

<!--父组件-->
<search @txtdata="searchText" :clearText="clearSearch"></search>
<!--子组件-->
<div class="search-box">
    <div class="ipt-box">
      <input type="text" class="ipt" placeholder="城市名称/拼音" @keydown="entry()" v-model="searchText" />
      <div class="icon-box">
        <i class="iconfont icon-sousuo icon"></i>
      </div>
    </div>
</div>
//子组件js  
methods: {
    // 延时搜索
    entry () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.$emit('txtdata', this.searchText)
      }, 300)
    }
  },
  watch: {
    // 清除搜索内容
    clearText (val) {
      if (val) {
        this.searchText = ''
        this.entry()
      }
    }
  }
　　　　在向上传递时有一个减少交互和运算的效果，用定时器实现的，上文有讲到。

　　2.定位组件
<!--父组件模块->
<position-box :chooseCity="chooseCity" :orientate="nowCity" :historyCityArr="historyCityArr" @changeCity="changeCity"></position-box>
<!--子组件模块-->
  <div class="position-box">
    <div class="choose">
      <span>你已选择：{{chooseCity}}</span>
    </div>
    <div class="hostory">
      <p>定位/最近访问</p>
      <div class="citybox">
        <button @click="changeCity(orientate)">
          <i class="iconfont icon-dingwei icon"></i>{{orientate}}
        </button>
        <button @click="changeCity(item)" v-for="item in historyCityArr" :key="item">{{item}}</button>
      </div>
    </div>
    <div class="hot">
      <p>热门城市</p>
      <div class="citybox">
        <button v-for="city in hotCitys" :key="city" @click="changeCity(city)">{{city}}</button>
      </div>
    </div>
  </div>
　　　　在这一部分里面，一开始加载页面的时候会触发两个事件：定位和读取localstorage里面存储的历史查看的记录。

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
　　　　定位部分逻辑简单，无非就是获取数据，如果获取不到默认为北京。

　　　　localstorage的数据处理就在这个组件中：

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
    }
　　　　当查看到城市发生变化时，出触发两个setItem事件（无论是存数组还是字符串），以便于在此打开时getItem可以获取到数据。一开始加载页面时，会发两个get事件，获取到数据之后传入定位模块中渲染数据。get得到的信息是字符串，我们获取到之后要转转化为数组。

　　3.页面城市组件
<!--父组件模块-->
<city-list :citylist="citylist" :elementIndex="elementIndex" @positionCity="changeCity" @singleLetter="singleLetter"></city-list>
<!--子组件模块-->
<div class="lists">
    <div v-for="citys in citylist" :key="citys[0]" :dataNum="citys[1].length">
      <p class="city-title" :ref="citys[0]">{{citys[0]}}</p>
      <p class="city-item" v-for="city in citys[1]" :key="city.id" @click="changeCity(city.name)">{{city.name}}</p>
    </div>
  </div>
　　　　单说这个组件呢，属于很简单的那种，仅仅有展示渲染信息和点击城市选项向上传递城市信息值的功能。但是后面增加了右边栏nav之后又增加了向上传递dom节点的功能：

// 父组件
singleLetter (dom) {
   this.$refs.suggest.scrollToElement(dom, 200, false, false)
}
// 子组件
elementIndex (val) {
   if (val === '顶') {
     return false
   }
   this.$emit('singleLetter', this.$refs[val][0])
}
　　　　父组件获取到城市组件上传的城市dom节点信息之后触发Bscroll的scrollToElement方法，0.2秒内滚动到相应位置。

　　4.弹窗组件
　　　　这个组件为点击选择城市之后（并且点击的城市不是当前已经查看的城市）触发。

<!--父组件模块-->
<mask-box v-if="maskShow" :message="maskMessage" @chooseing="chooseResult"></mask-box>
<!--子组件模块-->
<div class="mask-box">
    <div class="mask-body"></div>
    <div class="btn-box">
      <div class="message">
        <p>{{message}}</p>
      </div>
      <div class="btn-left" @click="chooseTrue()">
        <p>确定</p>
      </div>
      <div class="btn-right" @click="chooseFalse()">
        <p>取消</p>
      </div>
    </div>
  </div>
 

　　　　js部分非常简单

　　chooseTrue () {
      this.$emit('chooseing', true)
    },
    chooseFalse () {
      this.$emit('chooseing', false)
    }
　　　　根据点击的按钮的不同向上传值。当传值为true时触发父组件一个事件，让页面滚动到顶部。

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
    }
　　5.搜索列表组件
　　　　这个组件页面代码不过，逻辑代码也比较简单，用到了上文的正则，不多做解释。

<!--父组件模块-->
    <transition name="list">
      <search-list v-if="associationShow" :searchListContent="searchListContent" @changeName="changeCity"></search-list>
    </transition>
<!--子组件模块-->
  <div class="listbody">
    <scroll :data="searchListContent">
      <div>
        <city-item :searchListContent="searchListContent" @changeName="changeCity"></city-item>
      </div>
    </scroll>
  </div>
　　　　组件仅作展示和点击选择城市，功能与3组件相同，但是没有Bscroll的滚动事件。

　　6.右边栏nav组件
<!--父组件模块-->
<nav-list :navList="cityIndexList" @toElement="toElement" :flagText="flagText"></nav-list>
<!--子组件模块-->
<div class="navbody">
   <div class="navList" @touchstart.stop.prevent="start" @touchmove.stop.prevent="move">
      <div :class="navClass(item)" :data-name="item" v-for="item in navList" :key="item">
        {{item}}
      </div>
   < /div>
</div>
　　　　这部分html代码量比较少，但是与其他组件的联动最多，比如点击nav上的字母使页面城市组件滚动到相应的位置了、在上面滑动实现页面城市组件的持续滚动等。

　　　　在点击nav上的字母使页面城市组件滚动到相应的位置这个功能中，点击触发了touchstart这个事件：

    start (e) {
      let item = handleDomData(e.target, 'data-name')
      this.touch.start = e.touches[0].pageY
      this.touch.startIndex = getIndex(this.navList, item)
      this.scrollToElement(item)
    }
　　　　记录第一次点击的位置为以后的滑动提供起点的高度，并且触发scrollToElement事件，向上传值，让父组件的scroll滚动到相应的位置。

　　　　在滑动实现页面城市组件的持续滚动这个功能在，触发touchmove这个事件：

    move (e) {
      this.touch.end = e.touches[0].pageY
      let distance = this.touch.end - this.touch.start
      this.touch.endIndex = Math.min(Math.max(this.touch.startIndex + Math.floor((distance + 10) / 20), 0), 22)
      this.scrollToElement(this.navList[this.touch.endIndex])
    }
　　　　通过滚动过程中的距离量计算当前所处的字母，并上传改字母，让父组件的scroll滚动到相应的位置。

　　　　在这个组件中，我们引入了两个js函数，分别是start中的handleDomData和getIndex

// 获取或者给dom属性赋值
export function handleDomData (el, name, val) {
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}
// 获取每一个字母在数组中对应的index
export function getIndex (arr, query) {
  let key
  arr.map((val, index) => {
    if (val === query) {
      key = index
      return false
    }
  })
  return key
}
　　7.（非组件）字母显示卡片
　　　　这个小东西不是一个组件，但是有一定的功能，因此放在了这里。代码超简单，就是接受两个参数，是否显示和显示啥：

    <transition name="flag">
      <div class="nowFlag" v-if="flag">{{flagText}}</div>
    </transition>
　　　　是否显示这个参数来自与scroll基础组件的三个事件：

      // 监听scroll事件
      if (this.listenScroll) {
        // 滚动开始时触发
        this.scroll.on('scrollStart', () => {
          this.$emit('scrollStore', true)
        })
        // pos为位置参数
        this.scroll.on('scroll', (pos) => {
          this.$emit('distance', Math.abs(pos.y))
          this.$emit('scrollStore', true)
        })
        // 滚动结束
        this.scroll.on('scrollEnd', () => {
          this.$emit('scrollStore', false)
        })
      }
　　　　this.listenScroll这个参数我们在搜索列表上不调用，因此默认为false，只有在主页面时传true。触发时监听scroll组件的活动情况，比如滚动开始时上传true，正在滚动中传true，结束时传false来控制卡片的显示与隐藏。

　　　　卡片上面的字时根据滚动到的距离计算得出的：

    // 根据滑动距离显示字母牌上的字
    distance (val) {
      for (let i = 0, len = this.arrHeight.length; i < len; i++) {
        if (val < this.arrHeight[i]) {
          this.flagText = this.cityIndexList[i]
          return false
        }
      }
    }
    // 高度数组来源
    // 计算链接每一部分的高度
    export function getDistance (arr) {
      let titleHeight = 30
      let itemHeight = 35
      let distanceArr = []
      arr.map((item) => {
        distanceArr.push(titleHeight + itemHeight * item[1].length)
      })
      return distanceArr
    }
　　　　得到的字母除了在这个卡片使用还会传入navList组件中，实现当前所处字母的样式的区别。

总结：
　　　　感觉写的脑袋疼，这个城市选择组件的形式被应用于各种app和网站，是继省市二级联动之后城市选择功能的实现形式。逻辑颇多，大多在上面被提到。

　　　　项目也上传github，地址为：https://github.com/lunlunshiwo/ChooseCity。使用方式为先用node起一个express服务（指令为——node .\playDate.js），再运行vue-cli（指令为npm run dev）。

　　　　至于如何起两个服务，自行参考cmd和power shell。

 

　　　　码字不易，且看且珍惜。

　　　　原创博客，若侵犯贵司的利益，请私信我删除。

　　　　若觉得不错，求个赞和github的star。

 
 
