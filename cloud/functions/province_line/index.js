const cloud = require("@alipay/faas-server-sdk");

exports.main = async (event, context) => {

  var inp_province=event.pro_province;
  var inp_select=event.pro_prosel;
  var inp_batch=event.pro_batch;
  var inp_province=''+inp_province;
  var inp_select=''+ inp_select;
  var inp_batch=''+inp_batch;
  const mysql = cloud.mysql();
  // var id=event.code;
  // console.log(id)
  return await mysql.query('SELECT * FROM gk_pro WHERE province =:province and batch=:batch and prosel=:prosel',{province:inp_province,batch:inp_batch,prosel:inp_select})

};