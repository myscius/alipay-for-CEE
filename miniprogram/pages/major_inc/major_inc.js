const _my = require("../../__antmove/api/index.js")(my);
// pages/gaolao/zhuanye.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    name: "",
    code: "",
    info: "",
    schools: []
  },
  jump_school: function (e) {
    var id = e.currentTarget.dataset.id;

    my.navigateTo({
      url: "../college/college?sch_id=" + id + ""
    });
  },
  //向后台请求数据
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let that = this;

    if (options.major_code) {
      that.setData({
        code: options.major_code
      });
    }

    if (options.major_id) {
      that.setData({
        id: options.major_id
      });
      //that.major_get();
    }
    var context = await my.getCloudContext();
    context.callFunction({
      name: 'major_inc_search',
      data: {
        id: options.major_id
      },
      success: function (res) {
        if (res.result.length == 0) {
          my.showToast({
            type: 'fail',
            content: '暂无更多数据，请等待跳转',
            duration: 2000
          });
          setTimeout(function(){
            my.navigateBack();

          },3000)

          
        }else{
          that.setData({
            name: res.result[0]['propname'],
            info: res.result[0]['details'],
            id: res.result[0]['id']
          })
          context.callFunction({
            name: 'major_inc_search2',
            data: {
              name: that.data.name,
            },
  
  
            success: function (res) {
              // console.log(res);
              var arr = [];
              for (var i = 0; i < res.result.length; i++) {
                arr.push(res.result[i].id)
  
              }

              // console.log((a))
              context.callFunction({
                name: 'major_inc_search1',
                data: {
                  id: arr,
                },
  
                success: function (res) {
                  // console.log(res)
                  var school_list = res.result;
                  var length = school_list.length;
                  var school_fake = new Array();
  
                  for (var i = 0; i < length; i++) {
                    var name_after = school_list[i]["address"].split("省");
                    console.log(name_after[0]);
                    var myArray = {
                      province: name_after[0],
                      name: school_list[i]["name"],
                      id: school_list[i]["id"]
                    };
                    school_fake.push(myArray);
                  }
  
                  that.setData({
                    schools: school_fake
                  });
  
                }
              })
  
  
            }
          })
        }
        //  console.log(res);
        
      },


      fail: function (err) {

      }


    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});