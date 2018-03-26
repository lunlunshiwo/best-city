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

 
