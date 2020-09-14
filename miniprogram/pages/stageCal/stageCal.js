// pages/deployFunctions/deployFunctions.js
import Toast from "vant-weapp/toast/toast"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: "",
    stageVal: 3,
    options: [{
      name: '3期免息',
    },
    {
      name: '6期免息',
    },{
      name: '9期免息',
    },
    {
      name: '12期免息',
    },{
      name: '24期免息',
    }
  ],
    incomeRate: "",
    res: 0,
    showAct: false,
    showsRes: false
  },
  // actionsheet关闭事件
  onClose() {
    this.setData({ showAct: false });
  },
  // actionsheet选择事件
  onSelect(event) {
    // console.log(event.detail);
    if(event.detail!=this.data.stageVal+"期免息"){
      this.setData({
        stageVal: parseInt(event.detail.name.split('期免息')[0]),
        showsRes: false,
        showAct: false
      })
    }
    else{
      this.setData({
        showAct: false
      })
    }
  },
  // 价格变化触发事件
  onChangePrice(event) {
    if(event.detail=="0"){
      this.setData({
        price: "",
        showsRes: false
      })
    }else{
      this.setData({
        price: Number(event.detail),
        showsRes: false
      })
    }
    
  },
  // 分期数变化触发事件
  onChangeStage(event) {
    this.setData({
      showAct: true
    })
    // const value = event.detail;
    // // console.log(`当前值：${value}, 当前索引：${index}`);
    // var temp = parseInt(value.split('期免息')[0])
    // this.setData({
    //   stageVal: temp,
    //   showsRes: false
    // })
  },
  // 预期年化收益变化触发事件
  onChangeRate(event) {
    if(event.detail=="0"){
      this.setData({
        incomeRate: "",
        showsRes: false
      })
    }else{
      this.setData({
        incomeRate: Number(event.detail),
        showsRes: false
      })
    }
  },
  // 计算当期收益
  calPro: function(presentStage,lastProSum){
    if(presentStage==1){
      lastProSum = 0
    }
    let that = this;
    let temp = (that.data.price-that.data.price/that.data.stageVal*presentStage+lastProSum)*that.data.incomeRate/100/12
    return temp
  },
  // 计算当期累计收益，调用calLastProSum(12)即可得到分12期的结果
  calLastProSum: function(presentStage){
    let that = this;
    if(presentStage==1){
      return that.calPro(1)
    }
    else{
      const lastProSum = that.calLastProSum(presentStage-1)
      let tempSum = that.calPro(presentStage,lastProSum)+lastProSum
      return tempSum
    }
  },
  // 重置按钮点击
  reset(){
    // var stagePicker = this.selectComponent('#stagePicker')
    // stagePicker.setColumnValue(0,'3期免息')
    this.setData({
      price: "",
      stageVal: 3,
      incomeRate: "",
      showsRes: false
    })
  },
  // 确认按钮点击
  confirm(){
    // 表单验证是否符合标准
    if(!(typeof this.data.price === 'number' && !isNaN(this.data.price))){
      Toast.fail('请输入正确格式的价格');
    }
    else if(this.data.price<0 || this.data.price>1000000000){
      Toast.fail('请输入0~1000000000间的数');
    }
    else if(!(typeof this.data.incomeRate === 'number' && !isNaN(this.data.incomeRate))){
      Toast.fail('请输入正确格式的预期收益率');
    }
    else if(this.data.incomeRate<0 || this.data.incomeRate>100){
      Toast.fail('请输入0~100间的数');
    }
    else{
      const res = this.calLastProSum(this.data.stageVal)
      this.setData({
      res: res.toFixed(2),
      showsRes: true
    });
    // this.data.showsRes = true;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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