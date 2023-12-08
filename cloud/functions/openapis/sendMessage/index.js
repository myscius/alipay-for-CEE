const AlipaySdk = require('alipay-sdk').default;
//初始化 SDK，这里需要 APPID 和 私钥，不需要设置公钥
const alipaySdk = new AlipaySdk({
  appId: '2021003146641256',
  privateKey: 'MIIEowIBAAKCAQEAk4xLMc4hdHldPjy70XUSznAFk4E6iMgxTFTRgqj7xSd+JnV8iQXeEk1yfpetTIHLVtStuCSpbPSrPEYtvBX/nB60wXoEaNM+X25TidN5+38mRCTlx4nhA23Gd9dH7gX0hXiq5C9//kYGTz335r5tVFM+nUsQ/M4c8QbFQuRCjqcQp+fi7r4xnqRzBoHU7owkhCTSEgKr9T8CFWTjU8QruWKnRxckr2XGgE89npzniq3717KHeHgMgaTH6/ILQseQvwtc+TFjH8V88awxM+Z3LFzxudM3QA9QDEOgLCAX63ZwUpjHS9fgEN2VqMa26w2n1gMBE6GkRHiyiSetLvZi0QIDAQABAoIBABzJODplTt2cd/aWfsYkoyCndk8K3VKmTAfqXF2zfjs+szvpm/xXqrXDal0MVoEgqX0tTR8p9+wL6ASAZJfXauEYlIdSuN2CqR6RNbckDR5l9h9BW5sMaVvz5M6or53eh5AqtJyEL+J54u0+18iqykWzX/nsFUpdJARaH84nHl0aKQ2bVpla+VyDafFRGMrJ2rMgAKuQCjS3pBz/dCdwmpYXN30GU0PkYF8+xNh0+fwTlLw51hrfi3jkV99QmByFxMid0LEfNfuY6quDi8E9Y68ykwWKQ420kvMvEtYMUx1EXI+p6UsgD649Hua8/CNAz3zzfWyzJtw1knPN0a5oFIkCgYEA9iRjsERBmSYBoQL+Kg1Ysr+kFO5MMFUxFEXXrjYSxHhqFqLMRr157S2trmHKDHwqLP6S1D9wA0rencpJu3cq5e8eX01zTfcOHKFpSmgVEjlV4DTAzr3LCwQn2dI/VyBmc5NK3dINWK6CSmi5CVpok20bzztOEt7W7O85KPlP5fcCgYEAmXUNgQSNwpFJl/nDS39mq7D8zHHndgtBNVsxZ27i+h7biqufy0e+CJUAOKNrX6kh9vnUArxNTgpehBOh/wtxttFQtrwK0xIS1LZUIpDZvrc8rsT/AVEM4D8MUUfVwgCxDADi+dU5Wpv2rlyG336vrS5/6gruJVTijKvn62XeK3cCgYA0SbKrpTRSNlKuQ5Z+lGs9PZy7nYut0MsmRVf1+CKwfev7dwXyGRonmkaE/t0PHelPuZyzXe6LpIH5/xj+q+f/BHbtQ+S0sUDcMCXP2qBvSKLHiC1VPdg+NNnKWfF+rrFU5/tFd/PB3QBskiaMqBoDB3Ca6zxAofoCRydbXursLQKBgQCSOWdUuPIbpDVsCyJ8njlHAK7iYOcdJDxOi0bYOGEv1Jd922u4V/RMWS6MyatWy+MBY60Rrjw7UMYfNFX4oP8KJQm0Fhp6ZY5sAhDJnxzdDd1U64HRz1lllK44BSs6YU5TEcU2KmcsX9D+9EvQSvc7HkPkz+V8zRXS1Tt4oujAoQKBgDhskTEy6Q9xQWL3NbnM7xr2Lajry7tIfjqUNat8gOfexnyBtaB3qtV5jjvjtCGKVJVfhDvv2wdZW8QMTqL5wMaMoGIrZNCjH+3wAfP5ZeYx5+4Cte4YbyIo0ICJ8OhC3rgQxCN7cWoq74N9thEPL74g7j0RA6d+E3Nc+Qf9XoXD',
  sign_type: 'RSA2',
  charset: 'utf-8'
});

exports.main = async (event, context) => {
  console.log(event.code);
  try {
    

    var qrcode = await alipaySdk.exec("alipay.open.app.qrcode.create", {
      bizModel:{
          formId:"",
          page:"page/component/index",
          userTemplateId:"dbe0a4c2acb54b2d95eb0790fdc9116e",
          toUserId:"",
          data:{
            
          }
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