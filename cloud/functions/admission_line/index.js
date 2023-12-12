const cloud = require("@alipay/faas-server-sdk");

exports.main = async (event, context) => {
  var sch_name=event.sch_name;
  var inp_province=event.inp_province;
  var inp_select=event.inp_select;
  var inp_batch=event.inp_batch;
  var inp_province=''+inp_province;
  var inp_select=''+ inp_select;
  var inp_batch=''+inp_batch;
  var sch_name=''+sch_name;
  const mysql = cloud.mysql();
  var result1= await mysql.query('SELECT * FROM gk_school WHERE name=?',[sch_name]);
  if(result1.length==0){
    var id =1000;

  }else{
    var id=result1[0]['id'];
  }

  return await mysql.query('SELECT * FROM gk_sch_input WHERE id=:id and province =:province and batch=:batch and inp_select=:prosel',{id:id,province:inp_province,batch:inp_batch,prosel:inp_select})

};