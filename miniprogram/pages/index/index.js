//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    time: "",
    slogan: []
  },

  onLoad: function() {
    // 初始化词
    const slogans = require('../../utils/lyric.js')
    const keys = Object.keys(slogans)
    const key = keys[Math.floor(Math.random()*keys.length)]
    this.setData({
      slogan: [key,slogans[key].split('，')]
    })
    // 初始化时间
    var date = new Date();
    var time = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
    this.setData({
      time: time
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    
  },


})
