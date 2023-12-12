const cloud = require("@alipay/faas-server-sdk");

exports.main = async (event, context) => {
  var index =event.id;
  // var id=[];
  // var a=''
  // for (var i = 0; i < index.length; i++){
  //   a=a+index[i]+"','"
  // } 
  const string =   index.join(',')
 //



  const mysql = cloud.mysql();
  // var id=event.code;
  // console.log(id)
  return await mysql.query('SELECT * FROM gk_school WHERE FIND_IN_SET(id, ?)',[string])
  return await mysql.select('gk_schprospp', {
    where: {
      id:i,
    },
  });
};