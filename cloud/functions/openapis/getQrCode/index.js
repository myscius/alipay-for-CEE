const AlipaySdk = require('alipay-sdk').default;
//初始化 SDK，这里需要 APPID 和 私钥，不需要设置公钥


// O 站控制台上，配置的密钥，当前配置云开发环境变量中(密钥适合配置在全局环境变量中)，直接从环境变量中获取，测试可以直接写在本地
let key = process.env.key;

const alipaySdk = new AlipaySdk({
  appId: '2021003146641256',
  privateKey: key,
  sign_type: 'RSA2',
  charset: 'utf-8'
});

exports.main = async (event, context) => {
  console.log(event.code);
  try {
    

    var qrcode = await alipaySdk.exec("alipay.open.app.qrcode.create", {
      bizContent:{
        'urlParam':"pages/index/index",
         "query_param":"x=1",
         color:"0x00BFFF",
         size:"s",
        describe:"二维码描述"
      }
    }, {});

    console.log(qrcode);
    //返回 UserID 和 用户头像信息
    return qrcode

  } catch (error) {
    console.log(error);
  }
 
  return {};
};