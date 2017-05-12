
function httpRequest(url, callback) {

  wx.request({
    url: url,
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      callback(res.data);
    },
    fail: function (error) {
      console.log(error);
    }
  })
}

function formatDate(str) {

  const dateStr = str.slice(0, 4) + '.' + str.slice(4, 6) + '.' + str.slice(6);
  const date = new Date(dateStr);
  const weekStr = ['日', '一', '二', '三', '四', '五', '六'];
  const dateDesc = ('00' + (date.getMonth() + 1)).slice(-2) + '月' + ('00' + date.getDate()).slice(-2) + '日  星期' + weekStr[date.getDay()];

  return dateDesc;
}

function bypassImgUrl(originUrl) {

  return `http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=${encodeURIComponent(originUrl)}`;
}

function reconvert(str) {
  str = str.replace(/(&#)(\d{1,6});/gi, function ($0) {
    return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2")));
  });
  return str;
}

module.exports = {
  bypassImgUrl: bypassImgUrl,
  httpRequest: httpRequest,
  formatDate: formatDate,
  reconvert: reconvert
};