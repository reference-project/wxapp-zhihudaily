
##### 知乎日报微信小程序

api参考：[知乎日报-API-分析](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)


知乎日报的api返回的文章body部分是html格式的，所以引用了[wxParse](https://github.com/icindy/wxParse)工具来帮助渲染。根据自己的需要部分wxss进行了微调。




总体分为首页和主题两个tab。如下两张手机上的测试图：
![image](https://github.com/yiliashaw/wxapp-zhihudaily/images/home.jpg)
![image](https://github.com/yiliashaw/wxapp-zhihudaily/images/theme.jpg)

由于小程序不支持外链，所以文章里的外链是没有办法打开。一般的浏览够用。

备忘：
1. **主题**日报没有做上滑自动更新，因为我也不知道加载以前的主题内容api是啥。
2. body渲染部分有时间还是想自己的实现一下。
