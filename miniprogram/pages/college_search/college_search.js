const _my = require("../../__antmove/api/index.js")(my);
// pages/college_search/college_search.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        college: [],
        college_name: "",
        source: "",
        target: "",
        collegename:''
    },
    college_name_set: function(e) {
        let that = this;
        that.setData({
            college_name: e.detail.value
        });
    },

    collegenameset(e){
      this.setData({
        collegename:e.detail.value
      })
    },
    listind(e){
      let that =this
      var index=e.currentTarget.dataset.key;
      var id=that.data.college[index].code;
      var college_name = that.data.college[index].name;
      that.setData({
          target: college_name
      });
      console.log(that.data.target)
      if(that.data.source == "me"){
        setTimeout(function() {
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2];
          prevPage.setData({
              mywish: that.data.target,
              wish_up: true
          });

          _my.navigateBack({
              delta: 1
          });
      }, 200);

      }else{
        my.navigateTo({
          url:'/pages/college/college'+'?sch_id=' +
          id
        })

      }


    },
    list_shock: function(e) {
        let that = this;
        var index = e.currentTarget.dataset.key;
        var shock = "college[" + index + "].shock";
        var college_name = that.data.college[index].name;
        that.setData({
            [shock]: true,
            target: college_name
        });
        var source = that.data.source;

        if (that.data.source == "admissions") {
            setTimeout(function() {
                let pages = getCurrentPages();
                let prevPage = pages[pages.length - 2];
                prevPage.setData({
                    school: that.data.target
                });

                _my.navigateBack({
                    delta: 1
                });
            }, 200);
        } else if (that.data.source == "me") {
            setTimeout(function() {
                let pages = getCurrentPages();
                let prevPage = pages[pages.length - 2];
                prevPage.setData({
                    mywish: that.data.target,
                    wish_up: true
                });

                _my.navigateBack({
                    delta: 1
                });
            }, 200);
        } else {
            _my.navigateTo({
                url:
                    "../" +
                    source +
                    "/" +
                    source +
                    "?sch_id=" +
                    that.data.college[index].code
            });
        }
    },
    rand_color: function(e) {
        let that = this;
        var length = that.data.college.length;

        for (var i = 0; i < length; i++) {
            var color = "college[" + i + "].color";
            var random = Math.floor(Math.random() * 3) + 1;
            that.setData({
                [color]: random
            });
        }
    },
    async search1(e){
      let that=this;
      var schname=e.detail.value;
      // console.log(schname)
      var context = await my.getCloudContext();
            context.callFunction({
              name:'college_search',
              data:{
                name:this.data.collegename
              },
              success: function(res){
                console.log(res)
                var college_list = res.result;
                var length = college_list.length;
                var college_fake = new Array();

                for (var i = 0; i < length; i++) {
                    var myArray = {
                        color: -1,
                        shock: false,
                        code: college_list[i]["id"],
                        name: college_list[i]["name"]
                    };
                    college_fake.push(myArray);
                }

                that.setData({
                    college: college_fake
                });
                that.rand_color();}})
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function(options) {
        let that = this;

        if (options.source) {
            that.setData({
                source: options.source
            });
        }

        if (options.college_name) {
            that.setData({
                college_name: options.college_name
            });
            var context = await my.getCloudContext();
            context.callFunction({
              name:'college_search',
              data:{
                name:options.college_name
              },
              success: function(res){
                console.log(res)
                var college_list = res.result;
                var length = college_list.length;
                var college_fake = new Array();

                for (var i = 0; i < length; i++) {
                    var myArray = {
                        color: -1,
                        shock: false,
                        code: college_list[i]["id"],
                        name: college_list[i]["name"]
                    };
                    college_fake.push(myArray);
                }

                that.setData({
                    college: college_fake
                });
                that.rand_color();
              }
            })

        }

        // if (options.college_name) {
        //     that.search();
        // }
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
})
