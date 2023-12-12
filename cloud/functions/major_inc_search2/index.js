const cloud = require("@alipay/faas-server-sdk");

exports.main = async (event, context) => {
  var name=event.name;
  var n=''+name;

  const mysql = cloud.mysql();
  // var id=event.code;
  // console.log(id)
  return await mysql.query('SELECT * FROM gk_schprop WHERE propname = ?',[n])
};