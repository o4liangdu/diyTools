// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
var rp=require('request-promise')
// 云函数入口函数
exports.main = async (event, context) => {
  return rp('https://apis.map.qq.com/ws/location/v1/ip?key=CJGBZ-2CWLP-IXLDU-V7YLX-DS7P7-W4F6X')
    .then(function (res) {
      // Process html...
      return res
    }).catch(function (err) {
      // Crawling failed...
      console.error(err);
    });
}