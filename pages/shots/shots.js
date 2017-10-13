
const { request, api, filterHtml, dateFormat, addCommas } = require('../../utils/util.js');

var app = getApp();

Page({
    data: {
        items: {},
        comments: [],
        attachments: [],
        multiShots: [],
        isShowLoading: true,
        windowWidth: '',
        changeShotStatus: false  // 用于切换 shot 后返回顶部
    },

    onReady: function() {
        wx.setNavigationBarTitle({
            title: this.data.shot.title || 'Dribbble'
        });
    },

    getShot: function(id) {
        request({
          url: "https://hbvfn8rt.qcloud.la/weapp/video?category="+id
        })
        .then(res => {
            let { data } = res;

            this.setData({
              items: res.data.data.msg
            })
        })
    },
    onLoad: function(options) {

        this.getShot(options.id);

        this.setData({
            author: {
                id: options.id,
            },
            shot: options
        })

        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    windowWidth: res.windowWidth
                })
            }
        });

    }
})