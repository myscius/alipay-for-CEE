
//在函数的环境变量中增加 ENV 属性来判断是本地执行，还是在线上执行
const untils = require(process.env.ENV == 'PRO' ? './add/index.js' : '../../layer/index.js');
exports.main = async (event, context) => {

  if(!event.a || !event.b){
     
     console.log("当前输入参数非法，需要输入a 和 b 两个数字，当前 a="+ event.a  +"  b=" + event.b ) ;

     return {res:res, success:false, message:  "当前输入参数非法，需要输入两个 a 和 b 数字"};
  }

  //计算逻辑是放在层管理中的
  var res = untils.add(event.a , event.b);

  return {res:res, success:true, message:""};

};