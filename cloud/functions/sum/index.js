/**
 * 对 输入的参数  a ，b 求和
 * @param {*} event 
 * @param {*} context 
 */

exports.main = async (event, context) => {
  if(!event.a || !event.a){
    console.log("当前输入参数非法，需要输入a 和 b 两个数字，当前 a="+ event.a  +"  b=" + event.b ) ;
    return {res:-1, message:"输入变量非法", succces:false }
  }
  console.log("计算成功");
  return   {res: (event.a + event.b) , message:"输入变量非法", succces:false };
};