const cloud = require("@alipay/faas-server-sdk");
cloud.init({});
exports.main = async (event, context) => {
  const bizContent = {
    "attributes": event.attributes,
    "params": {
      "imageUrl": event.imageUrl,
      "mask": event.mask
    },
    "serviceCode": event.serviceCode,
    "uri": event.uri
    };
  
   //云调用接口需要在云开发控制台加入白名单
  const res = await cloud.openapi.alipayCloudCloudbaseSaasMaxQuery.request({
    bizContent: JSON.stringify(bizContent)
  });
  console.log('云调用结果:', res);
  return res;
};