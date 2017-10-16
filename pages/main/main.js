Page({
    data: {
        items: [],
        hidden: false,
        start_x:0,
        start_y:0,
        start_timpstamp:0
    },
    onLoad: function (options) {
        var that = this;
        requestData(that, mCurrentPage + 1);
    },
    onPostClick: function (event) {
        console.log("onPostClick");
        wx.navigateTo({
            url: Constant.PAGE_POSt
        });
    },
    onShareAppMessage: function () {
      return {
        title: '三乐学院',
        desc: '专业的教育视频网站',
        path: '/pages/main/main'
      }
    },changeExpanded: function(e){

     var id = e.target.id;

     var items = this.data.items ;

     for(var i=0;i<items.length;i++){
       if(items[i].id==id){
         if(items[i].isExpanded){
           items[i].isExpanded = false;
         }else{
           items[i].isExpanded = true;
         }
         break;
       }
     }

     this.setData({
       items:items
     });
  
    }, handletouchstart: function (event) {
      this.setData({
        start_x:event.changedTouches[0].pageX,
        start_y: event.changedTouches[0].pageY,
        start_timestamp: event.timeStamp
      })
    }, handletouchend:function(e){

      var end_x = e.changedTouches[0].pageX;
      var end_y = e.changedTouches[0].pageY;
      var end_timestamp = e.timeStamp ;
      var start_x = this.data.start_x;
      var start_y = this.data.start_y;
      var start_timestamp = this.data.start_timestamp ;
      

      var delta_x = start_x - end_x ;
      var delta_y = start_y - end_y ;
      var delta_time = end_timestamp - start_timestamp;
    
      if (delta_y < -30 || delta_y > 30 || delta_time > 300){
        return ;
      }
      if(delta_x > 100){
        wx.switchTab({
          url: '../category/category'
        })
      }

    }

    
});

var mTitles = [];
var mSrcs = [];
var mTimes = [];
var mCurrentPage = -1;

/**
 * 请求数据
 * @param that Page的对象，用其进行数据的更新
 * @param targetPage 请求的目标页码
 */
function requestData(that, targetPage) {
    wx.request({
        //url: "https://hbvfn8rt.qcloud.la/weapp/video",
        url: getApp().globalData.host+"/weapp/video",
        header: {
            "Content-Type": "application/json"
        },
        success: function (res) {

            that.setData({
                items: res.data.data.msg,
                hidden: true
            });

            mCurrentPage = targetPage;
        }
    });
}

/**
 * 绑定数据
 * @param itemData Gank的接口返回的content值，里面有各种相关的信息
 */
function bindData(itemData) {

    var re = new RegExp("[a-zA-z]+://[^\"]*");
    //图片URL标志之前的是"img alt"
    var title = itemData.content.split("img alt=")[1].match(re)[0];

    //todo 挺奇怪的，小程序不能显示以 （ww+数字） 开头的图片，把它改成 ws 开头就可以了，不知道为什么
    if( -1 != (title.search("//ww"))){
        var src = title.replace("//ww", "//ws");
    }
    //早期的URL不一定是ww开头的，不需要转换直接调用
    else{
        var src = title;
    }

    mTitles.push(itemData.title);
    mTimes.push(itemData.publishedAt.split("T")[0]);
    mSrcs.push(src);
}



var Constant = require('../../utils/constant.js');