const cloud = require('@alipay/faas-server-sdk');
      cloud.init();
const db = cloud.database();
exports.main = async (event, context) => {

  var action = event.action;

  //测试代码会自动创建集合，真实项目应该提前创建好
  try {
    await db.createCollection("users");  
  } catch (error) {
     console.log("users 结合已经存在，无需再进行创建");
  }
  //添加用户，如果逻辑比较复杂，可以单独再写一个 addUser 函数
  if(action == 'addUser'){
    await db.collection("users").add({
      data: {
        name: event.name
      },
    });
    //添加用户成功
    return {"message": "创建用户成功!", success:true};
  
  }else if(action == "getAllUsers"){
    //查询全部用户，默认返回100条，生成环境应该进行分页
    const users = await db.collection("users").get();
     //查询用户成功
     return {"message": "查询用户成功!", success:true , data:users};
  
  }else if(action == "deleteUser"){
      await db.collection("users").doc(event.id).remove();
      //删除用户成功
     return {"message": "删除用户成功!", success:true};
  }

  return {"message": "操作未识别!", success:false};
};