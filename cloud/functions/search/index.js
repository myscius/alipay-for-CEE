const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');
cloud.init();

const getUserName = () => {
  return 'user-' + crypto.randomBytes(5).toString('hex');
};


exports.main = async (event, context) => {
  // 获取 msyql 访问实例
  const mysql = cloud.mysql();
  
  // 新建 user 表
  // use_id = parseInt(event.id)
  const ans = await mysql.query('SELECT * FROM user_login WHERE id = ?',[event.id])
  if (ans.length>0){
    return ans;
  }else{
    // return use_id
    return -1;
  }
  
};