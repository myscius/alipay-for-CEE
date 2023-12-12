const cloud = require("@alipay/faas-server-sdk");

exports.main = async (event, context) => {
  var index =event.id;
  var i =''+index;
  const mysql = cloud.mysql();
  // var id=event.code;
  // console.log(id)
  return await mysql.query('SELECT * FROM gk_schprop WHERE spp_proid = ?',[i])
  return await mysql.select('gk_schprospp', {
    where: {
      id:i,
    },
  });
};