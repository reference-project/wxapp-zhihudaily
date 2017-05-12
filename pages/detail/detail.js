const WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util');
var app = getApp();

Page({
  data: {
    story: {},
  },

  storyId: '',

  onLoad: function (option) {
    console.log(option.id);
    const storyId = option.id;
    const dataUrl = app.globalConfig.gRequestUrl;
    util.httpRequest(dataUrl + '/news/' + storyId, this.processStoryDetail);
    // util.httpRequest(dataUrl + '/news/7315220', this.processStoryDetail);

    this.loadWidgetStatus('post-faved', 'faved', this.storyId);
    this.loadWidgetStatus('post-praised', 'praised', this.storyId);
  },

  processStoryDetail: function (story) {
    console.log("story:",story);

    let temp = {
      id: story.id,
      body: util.reconvert(story.body),
      image: story.image ? util.bypassImgUrl(story.image) : false,
      image_source: story.image_source,
      images: story.images ? story.images.map(function (image) {
        return util.bypassImgUrl(image);
      }) : false,
      title: story.title
    };
    console.log(temp.image,temp.images)
    this.setData({ story: temp });
    this.renderBody(this.data.story.body);

  },

  renderBody: function (htmlStr) {
    /**
     * WxParse.wxParse(bindName , type, data, target,imagePadding)
     * 1.bindName绑定的数据名(必填)
     * 2.type可以为html或者md(必填)
     * 3.data为传入的具体数据(必填)
     * 4.target为Page对象,一般为this(必填)
     * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
     */
    var that = this;
    WxParse.wxParse('article', 'html', htmlStr, that, 5);

  },

  onFavTap: function (event) {
    this.toggleWidgetStatus('post-faved', 'faved')
  },

  onPraiseTap: function (event) {
    this.toggleWidgetStatus('post-praised', 'praised')
  },

  loadWidgetStatus: function (localName, flag, id) {
    try {
      let value = wx.getStorageSync(localName);
      if (value) {
        if (!(id in value)) {
          value[id] = false;
          wx.setStorageSync(localName, value);
        }
      } else {
        value = {};
        value[id] = false;
        wx.setStorageSync(localName, value);
      }
      const obj = {};
      obj[flag] = value[id];
      this.setData(obj);
    } catch ({
      message,
    }) {
      wx.showToast({
        title: message,
      });
    }
  },

  toggleWidgetStatus: function (localName, flag) {
    var that = this;
    wx.getStorage({
      key: localName,
      success: function (res) {
        const value = res.data;
        const currentId = that.data.currentId;
        value[currentId] = !value[currentId];
        wx.setStorageSync(localName, value);
        const obj = {};
        obj[flag] = value[currentId];
        that.setData(obj);
      }
    });
  }
})