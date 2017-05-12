var util = require('../../../utils/util');
var app = getApp();

Page({

  data: {
    themeHead: {},
    stories: []
  },


  lock: false,

  onLoad: function (options) {

    const themeId = options.id;
    console.log(themeId);

    let dataUrl = app.globalConfig.gRequestUrl;

    util.httpRequest(dataUrl + '/theme/' + themeId, this.processThemeList);


  },

  processThemeList: function (data) {
    console.log(data);
    let headTemp = {
      title: data.description,
      image: util.bypassImgUrl(data.background)
    }
    this.setData({ themeHead: headTemp });

    let stories = data.stories.map(function (story) {
      return {
        id: story.id,
        images: story.images ? story.images.map(function (image) {
          return util.bypassImgUrl(image)
        }) : [],
        title: story.title
      }
    });

    this.setData({ stories: stories });
    // if (data.others) {
    //  let themes =  data.others.map(function (theme) {
    //     return {
    //       id: theme.id,
    //       description: theme.description,
    //       name: theme.name,
    //       thumbnail: util.bypassImgUrl(theme.thumbnail)
    //     }
    //   });
    //   this.setData({themes:themes});
    // }
    wx.setNavigationBarTitle({
      title: data.name
    })

  },


  onPostTab: function (event) {
    const postId = event.currentTarget.dataset.postid;
    console.log(postId);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + postId,
    });
  },


})