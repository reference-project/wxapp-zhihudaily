var util = require('../../utils/util');
var app = getApp();

Page({

  data: {
    slides: [],
    pages: [],
  },

  nextLoadDate: '',

  lock: false,

  onLoad: function (options) {
    let dataUrl = app.globalConfig.gRequestUrl;
    util.httpRequest(dataUrl + '/news/latest', this.processStoriesList);
  },

  processStoriesList: function (data) {
    console.log(data);
    if (data.top_stories) {
     let top_stories = data.top_stories.map(function (story) {
        return {
          id: story.id,
          image: util.bypassImgUrl(story.image),
          title: story.title
        }
      });
      this.setData({
        slides: top_stories
      })
    }

    if (data.stories) {
      let stories = data.stories.map(function (story) {
        return {
          id: story.id,
          images: story.images.map(function (image) {
            return util.bypassImgUrl(image)
          }),
          title: story.title
        }
      });
      let temp = {
        date: data.top_stories ? '今日热闻' : util.formatDate(data.date),
        stories: stories
      };
      const newPages = this.data.pages.concat(temp);
      this.setData({
        pages: newPages,
      });
      this.nextLoadDate = data.date;
    }
    this.lock = false;
    wx.hideNavigationBarLoading();
  },

  onScrollLower: function () {
    if (this.lock) {
      return;
    }
    this.lock = true;
    let loadUrl = app.globalConfig.gRequestUrl + '/news/before/' + this.nextLoadDate;
    util.httpRequest(loadUrl, this.processStoriesList);
    wx.showNavigationBarLoading()
  },

  onPostTab: function (event) {
    const postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + postId,
    });
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
  }

})