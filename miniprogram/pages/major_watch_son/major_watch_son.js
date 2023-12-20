// pages/major_watch_son/major_watch_son.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        code: "",
        if2st: true,
        major: []
    },
    major_watch: function(e) {
        var index = e.currentTarget.dataset.key;

        my.navigateTo({
          url:
              "../major_inc/major_inc?major_id=" +
              this.data.major[index].id +
              "&major_code=" +
              this.data.major[index].code
      });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:  async function(options) {
      my.showLoading({
        content: "数据加载中",
        mask: true
    });
        let that = this;

        if (options.code) {
            that.setData({
                code: options.code
            });
            console.log(options.code)
            // that.search();
            var context = await my.getCloudContext();
            context.callFunction({
              name:'major_son_search',
              data:{
                code:options.code
              },
              success: function(res) {
                console.log(res.result);
                var major_list = res.result;
                var length = major_list.length;
                var major_fake = new Array();
                var arr=[];    //定义一个临时数组 
                var brr=[];
                for(var i = 0; i < length; i++){    //循环遍历当前数组 
                    //判断当前数组下标为i的元素是否已经保存到临时数组 
                    //如果已保存，则跳过，否则将此元素保存到临时数组中 
                    // console.log(major_list[i]["numbe"])
                    if(brr.indexOf(major_list[i]["numbe"]) == -1){ 
                      brr.push(major_list[i]["numbe"]);

                      arr.push(major_list[i]); 
                    } 
                }
                //console.log(arr)
                // console.log(arr)
                // major_list =arr;
              //   var arr=[];
              //   for (var i = 0; i < length; i++) {

              //     console.log(major_list[i]["numbe"])

              // }


                for (var i = 0; i < arr.length; i++) {
                    var myArray = {
                        code: arr[i]["numbe"],
                        name: arr[i]["proname"],
                        id: arr[i]["spp_proid"]
                    };
                    major_fake.push(myArray);
                }

                that.setData({
                    major: major_fake
                });

                my.hideLoading();
            },


       
             fail:function(err){
       
             }
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
});
