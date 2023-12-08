// const cloud = require('@alipay/faas-server-sdk');
const { createClient } = require('redis');
// redis 链接配置云开发环境变量中，直接从环境变量中获取，测试可以直接写在本地
let url = process.env.redis;

exports.main = async (event, context) => {
  
  // 从环境变量中获取链接地址和密码
  console.log(" url = " + url );
  const client = createClient({
    url: url
  });
  
  client.on('error', err => console.log('Redis Client Error', err));
  //连接 redis

  await client.connect();
  switch(event.action){
     //设置缓存
    case "set":
      console.log("set " + event.key + " = " + event.value );
      await client.set(event.key,event.value);
      await client.disconnect();
      return { success:true }
     //获取缓存
     case "get":
      var value = await client.get(event.key);
      await client.disconnect();
      return { success:true, value: value}
  }
  await client.disconnect();
  return {success:false};
};