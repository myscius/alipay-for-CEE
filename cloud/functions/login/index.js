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
  await mysql.query(
    'CREATE TABLE IF NOT EXISTS `user_login` (\n' +
    '  `id` int(11) NOT NULL AUTO_INCREMENT,\n' +
    '  `user_name` varchar(255) DEFAULT NULL,\n' +
    '  `description` varchar(255) DEFAULT NULL,\n' +
    '  `password` varchar(250) DEFAULT NULL,\n' +
    '  `mk_onegrade` int(11) NOT NULL DEFAULT -1,\n' +
    '  `mk_twograde` int(11) NOT NULL DEFAULT -1,\n' +
    '  `mk_thrgrade` int(11) NOT NULL DEFAULT -1,\n' +
    '  `mz_oneschool` int(11) NOT NULL DEFAULT -1,\n' +
    '  `mz_twoschool` int(11) NOT NULL DEFAULT -1,\n' +
    '  `mz_thrschool` int(11) NOT NULL DEFAULT -1,\n' +
    '  `my_mobilePhoneNumber` int(11) NOT NULL DEFAULT -1,\n' +
    '  PRIMARY KEY (`id`)\n' +
    ') ENGINE=InnoDB;'
  );

  // // 向 user 表插入数据
  // const userName = getUserName();
  // const inserted = await mysql.insert('user_login', {
  //   user_name: userName,
  //   description: 'root',
  //   password: crypto.randomBytes(10).toString('hex'),
  //   mk_onegrade:-1,
  //   mk_twograde:-1,
  //   mk_thrgrade:-1,
  //   mz_oneschool:-1,
  //   mz_twoschool:-1,
  //   mz_thrschool:-1,
  //   my_mobilePhoneNumber:-1,
  // });
  // console.log('新增 root', inserted.insertId);

  // 查询 user
  // const rows = await mysql.select('user_login');
  // console.log('当前 user 表数据', rows);
  const ans = await mysql.query('SELECT * FROM user_login WHERE description = ?',[event.auth_code])
  console.log("login ans")
  console.log(typeof ans)

  // // 更新 user 表
  // const updated = await mysql.update(
  //   'user_login',
  //   { description: 'root' },
  //   {
  //     where: { user_name: userName },
  //   },
  // );
  // console.log(`成功更新 ${updated.affectedRows} 条数据`);

  // // 删除数据
  // const deleted = await mysql.delete('user_login', { id: inserted.insertId });
  // console.log(`成功删除 ${deleted.affectedRows} 条数据`);
  
  if (ans.length>0){
    return ans;
  }else{
    return -1;
  }
  
};