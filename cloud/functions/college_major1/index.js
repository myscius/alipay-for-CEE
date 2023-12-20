const cloud = require("@alipay/faas-server-sdk");

exports.main = async (event, context) => {
  var in_direction=''+event.direction;
  var in_province=''+event.province;
  var in_rank=''+event.rank;


  const mysql = cloud.mysql();

  var result1= await mysql.query('select * from school_rk where direction=:direction and province=:province and rank>:rank order by rank asc limit 2',
  {direction:in_direction,province:in_province,rank:in_rank} )
  var result2= await mysql.query('select * from school_rk where direction=:direction and province=:province and rank<:rank order by rank desc limit 1',
  {direction:in_direction,province:in_province,rank:in_rank} )
  result=result2.concat(result1);
  return result
};