const cloud = require("@alipay/faas-server-sdk");

exports.main = async (event, context) => {
  var sch_id =event.sch_id;
  var inp_province=event.inp_province;
  var inp_select=event.inp_select;
  var inp_batch=event.inp_batch;
  var sch_id =''+sch_id;
  var inp_province=''+inp_province;
  var inp_select=''+ inp_select;
  var inp_batch=''+inp_batch;
  const mysql = cloud.mysql();
  // var id=event.code;
  // console.log(id)
  var result=[]
  var result1=await mysql.query('SELECT * FROM gk_school WHERE id = ?',[sch_id])
  result.push(result1)
  var result2=await mysql.query('SELECT * FROM gk_sch_input WHERE id = :id and province=:province and inp_select=:inp_select and batch=:inp_batch' ,{id:sch_id,
  province:inp_province,inp_select:inp_select,inp_batch:inp_batch})
  result.push(result2)
  var result3=await mysql.query('SELECT * FROM gk_pro WHERE province =:province and batch=:batch and prosel=:prosel',{province:inp_province,batch:inp_batch,prosel:inp_select})
  result.push(result3)
  var result4=await mysql.query('SELECT * FROM gk_schprospp WHERE id = ?',[sch_id])
  result.push(result4)
  return result
}; 