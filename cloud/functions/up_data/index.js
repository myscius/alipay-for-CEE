const crypto = require('node:crypto');
const cloud = require('@alipay/faas-server-sdk');
cloud.init();

const getUserName = () => {
  return 'user-' + crypto.randomBytes(5).toString('hex');
};

exports.main = async (event, context) => {
  // 获取 msyql 访问实例
  const mysql = cloud.mysql();


  // 查询 user
  // const rows = await mysql.select('user_login');
  // console.log('当前 user 表数据', rows);

  // 更新 user 表
  const updated = await mysql.update(
    'user_login',
    {
      mk_onegrade: event.user_data.Bubble[0].grade,
      mk_twograde: event.user_data.Bubble[1].grade,
      mk_thrgrade: event.user_data.Bubble[2].grade,
      mz_oneschool: -1,
      mz_twoschool: -1,
      mz_thrschool: -1,
      my_mobilePhoneNumber: event.user_data.tel,
    },
    {
      where: { password: event.user_data.userid },
    },
  );
  console.log(`成功更新 ${updated.affectedRows} 条数据`);

  // // 删除数据
  // const deleted = await mysql.delete('user_login', { id: inserted.insertId });
  // console.log(`成功删除 ${deleted.affectedRows} 条数据`);

  const ans =  mysql.query('SELECT * FROM user_login WHERE user_name = ?', [event.nickName]);
  return ans;

};