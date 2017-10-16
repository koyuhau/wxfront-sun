
const { request, api, filterHtml, dateFormat, addCommas } = require('../../utils/util.js');

var app = getApp();

Page({
    data: {
        items: {},
        title:null,
        comments: [],
        attachments: [],
        multiShots: [],
        isShowLoading: true,
        windowWidth: '',
        changeShotStatus: false,  // 用于切换 shot 后返回顶部
        start_x:0,
        start_y: 0,
        start_timpstamp: 0
    },

    onReady: function() {
        wx.setNavigationBarTitle({
            title: this.data.title || 'Dribbble'
        });
    },

    getShot: function(id) {
        request({
          url: getApp().globalData.host +"/weapp/video?category="+id
        })
        .then(res => {
            let { data } = res;

            this.setData({
              items: res.data.data.msg
            })
        })
    },
    onShareAppMessage: function () {
      return {
        title: '三乐学院',
        desc: '专业的教育视频网站',
        path: '/pages/main/main'
      }
    },
    onLoad: function(options) {

        this.getShot(options.id);

        this.setData({
            title: options.title,
            shot: options
        })

        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    windowWidth: res.windowWidth
                })
            }
        });

    }, changeExpanded: function (e) {

      var id = e.target.id;

      var items = this.data.items;

      for (var i = 0; i < items.length; i++) {
        if (items[i].id == id) {
          if (items[i].isExpanded) {
            items[i].isExpanded = false;
          } else {
            items[i].isExpanded = true;
          }
          break;
        }
      }

      this.setData({
        items: items
      });

    }, handletouchstart: function (event) {
      this.setData({
        start_x: event.changedTouches[0].pageX
      })
    }, handletouchend: function (e) {
      
      var end_x = e.changedTouches[0].pageX;
      var end_y = e.changedTouches[0].pageY;
      var end_timestamp = e.timeStamp;
      var start_x = this.data.start_x;
      var start_y = this.data.start_y;
      var start_timestamp = this.data.start_timestamp;


      var delta_x = start_x - end_x;
      var delta_y = start_y - end_y;
      var delta_time = end_timestamp - start_timestamp;

      if (delta_y < -30 || delta_y > 30 || delta_time > 300) {
        return;
      }

      if (end_x < start_x - 50) {
        //console.log("左滑");
        wx.navigateBack({
          delta: 1
        })
      }
    }
})