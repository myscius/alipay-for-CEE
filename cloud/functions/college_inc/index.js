const cloud = require("@alipay/faas-server-sdk");

exports.main = async (event, context) => {

  const mysql = cloud.mysql();

  return await mysql.query('SELECT * FROM gk_school' )
};