const cloud = require('@alipay/faas-server-sdk');
      cloud.init({});
const db = cloud.database();

exports.main = async (event, context) => {
  console.log(JSON.stringify(event));
  console.log("action:" + event.action);

  try { 
     await db.createCollection("pic");
  } catch(e) {
     console.log("pic create error, maybe existed");
  };

 

  switch(event.action){
     case "getPic":
        var pic = await db.collection("pic").where({"pic_id": 1 }).get();
        if(pic&&pic.length>0){

          console.log("fileID " + pic[0].fileID);
          const urls = await cloud.getTempFileURL(
            [pic[0].fileID]
          );

          console.log("url " + JSON.stringify(urls));

          return {res:pic[0].fileID,url: urls.fileList[0].tempFileURL,success:true};
        }
        return {res:null,success:false};
     break;
     case "updatePic":
          console.log(" updatePic filedID="+event.fileID);
          var pic = await db.collection("pic").where({"pic_id": 1 }).get();
          if(!pic||pic.length==0){
            await db.collection("pic").add({data:{"pic_id":1,fileID:event.fileID}});
            return {success:true}; 
          }
          await db.collection("pic").where({"pic_id": 1 }).update({data:{fileID:event.fileID}});
          return {success:true}; 
     break;
     case "deleteCurrentPic":
        //删除当前的图片资源
        var pic = await db.collection("pic").where({"pic_id": 1 }).get();
        if(pic&&pic.length>0){
          console.log(" 删除历史图片 fileID="+pic[0].fileID);
           await cloud.deleteFile([pic[0].fileID]);
        }
        return {success:true}; 
     default:
      console.log("输入的命令非法");
     
     break;
  } 
  return {success:false,message:"输入的命令非法"}; 
};