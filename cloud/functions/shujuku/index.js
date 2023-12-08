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
    'CREATE TABLE IF NOT EXISTS `user` (\n' +
    '  `id` int(11) NOT NULL AUTO_INCREMENT,\n' +
    '  `user_name` varchar(255) DEFAULT NULL,\n' +
    '  `description` varchar(255) DEFAULT NULL,\n' +
    '  `password` varchar(250) DEFAULT NULL,\n' +
    '  PRIMARY KEY (`id`)\n' +
    ') ENGINE=InnoDB;'
  );

  // 向 user 表插入数据
  const userName = getUserName();
  const inserted = await mysql.insert('user', {
    user_name: userName,
    description: 'mysql demo user',
    password: crypto.randomBytes(10).toString('hex'),
  });
  console.log('新增 user', inserted.insertId);

  // 查询 user
  const rows = await mysql.select('user');
  console.log('当前 user 表数据', rows);

  // 更新 user 表
  const updated = await mysql.update(
    'user',
    { description: 'updated user desc' },
    {
      where: { user_name: userName },
    },
  );
  console.log(`成功更新 ${updated.affectedRows} 条数据`);

  // 删除数据
  const deleted = await mysql.delete('user', { id: inserted.insertId });
  console.log(`成功删除 ${deleted.affectedRows} 条数据`);

  return rows;
};