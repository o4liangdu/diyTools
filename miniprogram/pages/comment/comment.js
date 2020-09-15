// pages/comment/comment.js
const db=wx.cloud.database();//初始化数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{
    },
    content: '', // 评价的内容
    score: 5, // 评价的分数
    images: [], // 上传的图片
    fileIds: [],
    movieId: -1
  },

  submit:function(){
    wx.showLoading({
      title: '评论中',
    })
    console.log(this.data.content);
    console.log(this.data.score);
    //上传图片到云存储
    let promiseArr=[];
    for(let i=0;i<this.data.images.length;i++){
      promiseArr.push(new Promise((resolve,reject)=>{
        let item=this.data.images[i];
        let suffix=/\.\w+$/.exec(item)[0];//正则表达式，返回文件扩展名
        wx.cloud.uploadFile({
          cloudPath:new Date().getTime()+suffix,
          filePath:item,
          success:res=>{
            this.setData({
              fileIds:this.data.fileIds.concat(res.fileID)
            });
            resolve();
          },
          fail:console.error
        })
      }))
    }
    Promise.all(promiseArr).then(res=>{
      db.collection('comment').add({
        data:{
          content:this.data.content,
          score:this.data.score,
          movieid:this.data.movieId,
          fileIds:this.data.fileIds
        }
      }).then(res=>{
        wx.hideLoading();
        wx.showToast({
          title: '评价成功',
        })
      }).catch(err=>{
        wx.hideLoading();
        wx.showToast({
          title: '评论失败',
        })
      })
    });
  },

  uploadImg:function(){
    wx.chooseImage({
      count:9,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success:res=> {
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          images: this.data.images.concat(tempFilePaths)
        })
      }
    })
  },

  onContentChange: function (event) {
    this.setData({
      content: event.detail
    });
  },

  onScoreChange:function(event){
    this.setData({
      score:event.detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      movieId: options.movieid
    })
    wx.cloud.callFunction({
      name:'getDetail',
      data:{
        movieid:options.movieid
      }
    }).then(res=>{
      console.log(res);
      this.setData({
        detail:JSON.parse(res.result)
      })
    }).catch(err=>{
      console.error(err)
    })
  },

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