const cloud = require("@alipay/faas-server-sdk");
//环境管理 - 云调用 - 开通云调用，并增加接口白名单 alipayOpenAppQrcodeCreate
exports.main = async (event, context) => {
  return await cloud.openapi.alipayOpenAppQrcodeCreate.request({
    'biz_content':{
      'url_param':"pages/index/index",
      "query_param":"x=1",
       color:"0x00BFFF",
       size:"s",
      describe:"二维码描述"
    }
  });

  return res;

};