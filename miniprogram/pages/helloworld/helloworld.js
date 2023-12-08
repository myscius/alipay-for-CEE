Page({
  data: {
    data:null
  },
  onLoad() {

  },
  async callFunction(){
    var self  = this;
    var context = await my.getCloudContext();
        context.callFunction({
      name:"helloworld",
      success:function(res){
         console.log(res);
         self.setData({
           data:res.result.message
         })
      },

      fail:function(err){

      }

    });
  }
});