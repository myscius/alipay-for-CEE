const _my = require("../../__antmove/api/index.js")(my);
// pages/college_inc/collrgr_inc.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        key_word: "",
        //搜索关键词
        touch_all: true,
        //可否触摸
        now_inc: true,
        //true为大学
        curtain: false,
        //禁止操作
        college_open: true,
        //大学三元运算
        ani_start: false,
        //页面切换动画开关
        college_page: 0,
        company_page: 0,
        college_data: [],
        company_data: [],
        inputValue:''

    },
    keyword_set: function(e) {
        let that = this;
        that.setData({
            key_word: e.detail.value,
            inputValue:e.detail.value
        });
    },
    college_search: function(e) {
        let that = this;
        this.setData({
          inputValue:''
        })

        my.navigateTo({
            url:
                "../college_search/college_search?college_name=" +
                that.data.key_word +
                "&source=college"
        });
    },
    //向后台请求数据
    get_more: function(e) {
        var that = this;

        if (that.data.now_inc) {
            var next_page = that.data.college_page + 1;
            that.setData({
                college_page: next_page
            });
            that.college_get();
        } else if (!that.data.now_inc) {
            var next_page = that.data.company_page + 1;
            that.setData({
                company_page: next_page
            });
            that.company_get();
        }
    },
    //获取大学信息
    async college_get(e) {
      my.showLoading({
        content:'数据加载中',
        mask:true

      })
      
        let that = this;
        var context = await my.getCloudContext();
        context.callFunction({
          name:'college_inc',
          data:{
                college_page: that.data.college_page,
                now_inc: true
          },
            success: function(res) {

                var college_data = res.result;

                if (college_data.length == 0) {
                    my.showModal({
                        title: "提示",
                        content: "暂无更多"
                    });
                } else {
                    // console.log(res);

                    // my.showToast({
                      
                    //     content: "数据加载中",
                    //     type:'loading',
                    //     mask: true
                    // });

                    var length = college_data.length;
                    var college_fake = that.data.college_data;
                    // console.log(college_data);

                    for (var i = 0; i < length; i++) {
                        var addres_after = college_data[i]["address"].split(
                            "市"
                        );
                        var myArray = {
                            x: 0,
                            end_x: 0,
                            touch: false,
                            direction: true,
                            flashes: false,
                            code: college_data[i]["code"],
                            name: college_data[i]["name"],
                            logo: college_data[i]["images"],
                            word: college_data[i]["brief"],
                            addres: addres_after[0],
                            level: college_data[i]["super"],
                            backimg: college_data[i]["beijing"],
                            id: college_data[i]["id"]
                        };
                        college_fake.push(myArray);

                        my.hideLoading();
                    }

                    that.setData({
                        college_data: college_fake
                    });
                    // console.log(that.data.college_data)
                }
            }
        });
    },
    //获取公司信息
    jump_school: function(e) {
        var id = e.currentTarget.dataset.id;

        my.navigateTo({
            url: "../college/college?sch_id=" + id + ""
        });
    },
    //页面切换
    inc_change: function(e) {
        let that = this;
        var inc = that.data.now_inc;
        that.setData({
            company_open: true,
            college_open: true,
            curtain: true,
            ani_start: true,
            now_inc: !inc
        });

        my.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    },
    //解除禁止操作
    curtain_close: function(e) {
        var index = e.currentTarget.dataset.key;
        let that = this;
        that.setData({
            curtain: false
        });
        if (that.data.now_inc)
            that.setData({
                company_open: false
            });
        else
            that.setData({
                college_open: false
            });
    },
    //图标闪烁
    i_flashes: function(e) {
        let that = this;
        var index = e.currentTarget.dataset.key;
        var flashes = "college_data[" + index + "].flashes";
        that.setData({
            [flashes]: false
        });
        setTimeout(function() {
            that.setData({
                [flashes]: true
            });
        }, 10);
    },
    //开始点击
    movable_start: function(e) {
        var index = e.currentTarget.dataset.key;
        var touch = "college_data[" + index + "].touch";
        let that = this;
        that.setData({
            touch_all: false,
            [touch]: true
        });
    },
    //向左滑动
    movable_end_right: function(e) {
        let that = this;
        var index = e.currentTarget.dataset.key;

        if (that.data.college_data[index].end_x > -50) {
            var x = "college_data[" + index + "].x";
            var touch = "college_data[" + index + "].touch";
            var flashes = "college_data[" + index + "].flashes";
            that.setData({
                [x]: 0,
                [touch]: false
            });
            setTimeout(function() {
                that.setData({
                    touch_all: true,
                    [flashes]: false
                });
            }, 200);
        } else {
            var x = "college_data[" + index + "].x";
            var touch = "college_data[" + index + "].touch";
            var flashes = "college_data[" + index + "].flashes";
            var direction = "college_data[" + index + "].direction";
            that.setData({
                [touch]: false,
                [x]: -650
            });
            setTimeout(function() {
                that.setData({
                    touch_all: true,
                    [direction]: false,
                    [flashes]: true
                });
            }, 200);
        }
    },
    //向右滑动
    movable_end_left: function(e) {
        let that = this;
        var index = e.currentTarget.dataset.key;

        if (that.data.college_data[index].end_x > -262) {
            var x = "college_data[" + index + "].x";
            var touch = "college_data[" + index + "].touch";
            var flashes = "college_data[" + index + "].flashes";
            var direction = "college_data[" + index + "].direction";
            that.setData({
                [x]: 0,
                [touch]: false
            });
            setTimeout(function() {
                that.setData({
                    touch_all: true,
                    [direction]: true,
                    [flashes]: false
                });
            }, 200);
        } else {
            var x = "college_data[" + index + "].x";
            var touch = "college_data[" + index + "].touch";
            that.setData({
                [touch]: false,
                [x]: -650
            });
            setTimeout(function() {
                that.setData({
                    touch_all: true
                });
            }, 200);
        }
    },
    //回弹动画
    movable_view: function(e) {
        let that = this;
        var index = e.currentTarget.dataset.key;
        var end_x = "college_data[" + index + "].end_x";
        var end_xx = e.detail.x;
        that.setData({
            [end_x]: end_xx
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
         let that = this;
         that.college_get();
        // that.company_get();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
      this.setData({
        inputValue:''
      })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

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
    onReachBottom: function() {
        this.get_more();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
});
