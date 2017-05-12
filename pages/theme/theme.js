var util = require('../../utils/util');
var app = getApp();

Page({

  data: {
    themes: [],
  },


  lock: false,

  onLoad: function () {

    let dataUrl = app.globalConfig.gRequestUrl;

    util.httpRequest(dataUrl + '/themes', this.processThemeSquare);


  },

  processThemeSquare: function (data) {

    console.log(data);
    if (data.others) {
      let themes = data.others.map(function (theme) {
        return {
          id: theme.id,
          description: theme.description,
          name: theme.name,
          thumbnail: util.bypassImgUrl(theme.thumbnail)
        }
      });
      this.setData({
        themes: themes
      });
    }


  },

  onThemeTap: function (event) {

    const themeid = event.currentTarget.dataset.themeid;
    wx.navigateTo({
      url: '/pages/theme/theme_list/theme-list?id=' + themeid,
    });

  },


})