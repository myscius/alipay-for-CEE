const cloud = require("@alipay/faas-server-sdk");
/**
 * 只有小程序开通 OPENID 才可以通过这种方式获取到，OPENID 使用处于灰度阶段
 * @param {*} event 
 * @param {*} context 
 */
exports.main = async (event, context) => {
    
   // 从小程序过来的请求可以获取到可信的 openId 和 appId
    let { OPENID, APPID } = cloud.getAlipayContext();
    if(!OPENID){
       console.log(" 未获取到 OPENID ，在 O 站检查是否开启 OPENID ")
    }
    return cloud.getAlipayContext();
};
