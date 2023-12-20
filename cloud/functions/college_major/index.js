const cloud = require("@alipay/faas-server-sdk");

exports.main = async (event, context) => {
  var prop_propid=event.prop_propid;
  var prop_propbatch=event.prop_propbatch;
  var prop_province=event.prop_province;
  var spp_proid=''+prop_propid;
  var prop_propbatch=''+prop_propbatch;
  var prop_province=''+prop_province;


  const mysql = cloud.mysql();
  // var id=event.code;
  // console.log(id)
  var result1= await mysql.query('SELECT propname FROM gk_schprop WHERE spp_proid = ?',[spp_proid])
  if(result1.length==0){
    var propname='';
  }else{
    var propname=result1[0]['propname'];
  }
  var result2=await mysql.query('SELECT prop_propid FROM gk_schprop WHERE propname = ?',[propname])
  if( result2.length==0){
    var a=[]
  }else{
    var a=[]
    for (var i = 0; i < result2.length; i++){
      a.push(result2[i]['prop_propid']);
    }
  }
  const string =  a.join(',')
  var result3=await mysql.query('SELECT * FROM gk_schpropgra WHERE FIND_IN_SET(prop_propid, :id) and province=:province and propbatch=:propbatch',{id:string,province:prop_province,propbatch: prop_propbatch},)
  var result=[];
  result.push(s)
  result.push(result3)
  return result

};