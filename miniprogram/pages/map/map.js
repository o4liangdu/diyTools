// pages/map/map.js
// var QQMapWX = require('../../qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    locvalue: "电影院",
    log: 113.4,
    lat: 40.0,
    markers: [],
    direction: 0,
    setInter: ""
  },
  //获取位置
  // getloc: function () {
  //   wx.getLocation({
  //     type: 'gcj02',
  //     success: res => {
  //       this.setData({
  //         log: res.longitude,
  //         lat: res.latitude
  //       });
  //       this.onLoad()
  //     }
  //   });
  // },

  //显示搜寻地点
  findloc: function () {
    var _this = this;
    // 调用接口
    qqmapsdk.search({
      keyword: _this.data.locvalue,  //搜索关键词
      location: (_this.data.lat).toString() + "," + (_this.data.log).toString(),  //设置周边搜索中心点
      success: function (res) { //搜索成功后的回调
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({ // 获取返回结果，放到mks数组中
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "../../images/1.png", //图标路径
            width: 25,
            height: 25
          })
        }
        _this.setData({ //设置markers属性，将搜索结果显示在地图中
          markers: mks
        })
      },
      fail: function (res) {
        // console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },

  onContentChange: function (event) {
    this.setData({
      locvalue: event.detail
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'CJGBZ-2CWLP-IXLDU-V7YLX-DS7P7-W4F6X'
    });
    var that = this;
    const mapCtx = wx.createMapContext('myMap');
    mapCtx.moveToLocation();
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        that.setData({
          log: res.longitude,
          lat: res.latitude
        });
      }
    });
    // this.rotate();

    // this.startSetInter()
    // this.data.setInter = setInterval(
    //    ()=>{
    //     // var that=this
    //     wx.startCompass();
    //     wx.onCompassChange(function (res) {
    //       that.setData({
    //         direction : res.direction
    //       })
    //       console.log(that.data.direction)
    //     });
    //   }
    //   , 2000);
  },
  // rotate: function () {
  //   const markers = this.data.markers;
  //   wx.startCompass();
  //   wx.onCompassChange(function (res) {
  //     const mapCtx = wx.createMapContext('myMap');
  //     const setMarker = {
  //       markerId: 0, autoRotate: true,
  //       rotate: Math.round(res.direction),
  //       destination: {
  //         latitude: markers[0].latitude,
  //         longitude: markers[0].longitude,
  //       },
  //       complete: function (res_) {
  //         console.log(res_);
  //       }
  //     }
  //     mapCtx.translateMarker(setMarker);
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  
  

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})