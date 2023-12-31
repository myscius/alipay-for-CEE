// import "./__antmove/component/componentClass.js";
const _my = require("../../__antmove/api/index.js")(my);
const app = getApp();
Page({
  data: {
    little1: false,
    little2: false,
    little3: false,
    little4: false,
    little5: false,
    little6: false,
    Bubble: [{
        move: false,
        grade: -1
      },
      {
        move: false,
        grade: -1
      },
      {
        move: false,
        grade: -1
      }
    ],
    grade_input: false,
    curtain_black_top: false,
    now_input: -1,
    form_grade_fake: -1,
    curtain_ani: false,
    curtain_university_top: false,
    userInfo: {},
    hasUserInfo: false,
    mywish: -1,
    tel: -1,
    tel_fake: "",
    mywish_fake: "",
    wish_up: false,
    //志愿大学上传
    userid: ""
  },
  onLaunch: function () {
    my.showLoading({
      content: "数据加载中",
      mask: true
    });
    // login 此处应该使用支付宝授权登录
    let that = this;
    // console.log('luqi')
    if (that.data.hasUserInfo) {
      //  console.log('nickName');
      //  console.log(that.data.userInfo);
      my.fncontext.callFunction({
        name: "login",
        data: {
          nickName: that.data.userInfo.nickName,
          userid:that.data.userid
        },
        success: res => {
          // that.setData({
          //   userid: res.result
          // });
          console.log('login res');
          // console.log(res);

          // 本应该是search的内容
          var user_data = res.result[0];
          // app.globalData.userInfo = res.userInfo;
          var onegrade = "Bubble[0].grade";
          var twograde = "Bubble[1].grade";
          var thrgrade = "Bubble[2].grade";
          if (user_data != -1)
            that.setData({
              [onegrade]: user_data["mk_onegrade"],
              [twograde]: user_data["mk_twograde"],
              [thrgrade]: user_data["mk_thrgrade"],
              mywish: user_data["mz_oneschool"],
              tel: user_data["my_mobilePhoneNumber"]
            });
          else
            that.setData({
              [onegrade]: -1,
              [twograde]: -1,
              [thrgrade]: -1,
              mywish: -1,
              tel: -1
            });
          my.hideLoading();
        },
      })
    };

  },
  check_user: function (e) {
    var that = this;
   


    _my.openSetting({
      success: res => {
        _my.getUserInfo({
          success: res => {
            console.log("userInfo");
            console.log(res.userInfo); // 可以将 res 发送给后台解码出 unionId

            this.globalData.userInfo = res.userInfo; // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况

            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res);
            }
          }
        });

        that.user_set();
      },
      fail: res => {
        console.log(-1);
      }
    });
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  user_set: function (e) {
  //   my.getOpenUserInfo({
  //     success: (res) => {
  //         let userInfo = JSON.parse(res.response).response
  //         console.log('lq')
  //         console.log(userInfo)
  //     },
  //     fail: (err) => {
  //         console.log(err)
  //     }
  // });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      _my.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    };
    // console.log('userInfo');
    // console.log(this.data.userInfo);
  },
  //上传电话号码
  tel_up: function (e) {
    let that = this;

    my.showModal({
      title: "提示",
      content: "是否更改手机号码",
      success: function (res) {
        if (res.confirm) {
          var tel_fake = that.data.tel_fake;
          that.setData({
            tel: tel_fake
          });
          that.up_data(); //上传电话号码
        } else if (res.cancel) {
          var tel = that.data.tel;
          that.setData({
            tel: tel
          });
        }
      }
    });
  },
  //分数设置
  grade_set: function (e) {
    this.setData({
      form_grade_fake: e.detail.value
    });
  },
  wish_set: function (e) {
    this.setData({
      mywish_fake: e.detail.value
    });
  },
  tel_set: function (e) {
    this.setData({
      tel_fake: e.detail.value
    });
  },
  input_word: function () {
    this.setData({
      grade_input_word: true
    });
  },
  grade_input_open: function (e) {
    var index = e.currentTarget.dataset.key;
    let that = this;
    that.setData({
      grade_input: true,
      curtain_black_top: true,
      now_input: index,
      curtain_ani: true
    });
  },
  university_input_open: function (e) {
    let that = this;
    that.setData({
      grade_input: true,
      curtain_black_top: true,
      curtain_ani: true,
      curtain_university_top: true
    });
  }, // 点击输入我的志愿
  grade_input_close: function (e) {
    // console.log("grade_input_close")
    let that = this;
    var index = e.currentTarget.dataset.key;
    this.setData({
      grade_input: false,
      grade_input_word: false,
      curtain_ani: false,
      curtain_black_top: false,
    });
    setTimeout(function () {
      that.setData({
        curtain_black_top: false,
        curtain_university_top: false
      });

      if (index == "check") {
        var form_grade_fake = that.data.form_grade_fake;
        var form_grade = "Bubble[" + that.data.now_input + "].grade";
        that.setData({
          [form_grade]: form_grade_fake
        });
        that.up_data(); //上传分数
      } else if (index == "university_close") {
        var search = e.currentTarget.dataset.search;
        if (search == "true")
          _my.navigateTo({
            url: "../college_search/college_search?college_name=" +
              that.data.mywish_fake +
              "&source=me"
          });
          // console.log(that.data.mywish+'sd')
          // that.up_data();
      }
    }, 300); //解除禁止操作
  },
  little_rise: function (e) {
    var that = this;
    that.setData({
      little1: true,
      little6: true
    });
    setTimeout(function () {
      that.setData({
        little2: true,
        little5: true
      });
    }, 1000);
    setTimeout(function () {
      that.setData({
        little3: true,
        little4: true
      });
    }, 1500);
  },
  little_again: function (e) {
    var that = this;
    that.setData({
      little1: false,
      little2: false,
      little3: false,
      little4: false,
      little5: false,
      little6: false
    });
    setTimeout(function () {
      that.little_rise();
    }, 2000);
  },
  Bubble_again: function (e) {
    let that = this;
    var index = e.currentTarget.dataset.key;
    var Bubble = "Bubble[" + index + "].move";
    that.setData({
      [Bubble]: false
    });
    setTimeout(function () {
      that.setData({
        [Bubble]: true
      });
    }, 200);
  },
  Bubble_move: function (e) {
    let that = this;
    var Bubble1 = "Bubble[" + 0 + "].move";
    var Bubble2 = "Bubble[" + 1 + "].move";
    var Bubble3 = "Bubble[" + 2 + "].move";
    that.setData({
      [Bubble1]: true
    });
    setTimeout(function () {
      that.setData({
        [Bubble2]: true
      });
    }, 1000);
    setTimeout(function () {
      that.setData({
        [Bubble3]: true
      });
    }, 1500);
  },
  //上传信息
  up_data: function (e) {
    my.showLoading({
      content: "数据加载中",
      mask: true
    });

    let that = this;
    my.fncontext.callFunction({
      name: "up_data",
      data: {
        user_data: that.data
      },
      success: res => {
        console.log('up data success');
      },
    })

    _my.hideLoading();
    //   }
    // });
  },
  // antmoveAction1(){
  //   app.globalData.userInfo=''
  //   this.setData({
  //    hasUserInfo:false
  //   })

  // },

  // get userid
  async getuserid() {
    let that = this;
    my.getAuthCode({
      scopes: 'auth_base',
      success: res => {
        const authCode = res.authCode;            
        // console.log('authcode:') 
        // console.log(authCode)

        my.fncontext.callFunction({
          name: 'getuserid',
          data: {
            code: authCode
          },
          success: res => {
            app.globalData.userid=res.result.alipayUserId;
            that.setData({
              userid:res.result.alipayUserId
            });

            //  console.log('userid')
            //  console.log(that.data.userid);
          }
        })
      }
    })
  },
  //向后台请求数据
  search: function (e) {
    my.showLoading({
      content: "数据加载中",
      mask: true
    });

    let that = this;
    my.fncontext.callFunction({
      name: "search",
      data: {
        id: that.data.userid
      },
      success: res => {
        if (res.result != -1) {
          // var user_data = res.result[0];
          // console.log('user_data')
          // console.log(user_data)
          // // app.globalData.userInfo = res.userInfo;
          // var onegrade = "Bubble[0].grade";
          // var twograde = "Bubble[1].grade";
          // var thrgrade = "Bubble[2].grade";
          // if (user_data != -1)
          //   that.setData({
          //     [onegrade]: user_data["mk_onegrade"],
          //     [twograde]: user_data["mk_twograde"],
          //     [thrgrade]: user_data["mk_thrgrade"],
          //     mywish: user_data["mz_oneschool"],
          //     tel: user_data["my_mobilePhoneNumber"]
          //   });
          // else
          //   that.setData({
          //     [onegrade]: -1,
          //     [twograde]: -1,
          //     [thrgrade]: -1,
          //     mywish: -1,
          //     tel: -1
          //   });
        }

      },
    })

    my.hideLoading();
    //   }
    // });
  },
  alert(){
    my.alert({
      title:'注意',
      content:'本程序用于支付宝开发大赛，一些功能不够完善，建议不要用于其它用途'

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let that = this;
    my.showLoading({
      content: "数据加载中",
      mask: true
    });
    setTimeout("", 3000);

    that.setData({
      userid: app.globalData.userid
    });
    // set userid
    that.getuserid();
    app.globalData.userid = that.userid;
    that.onLaunch();
    that.little_rise();
    that.Bubble_move();

    that.user_set();

    // 这里不是同步顺序执行，导致了userid来不及更新
    //that.search();
    my.hideLoading();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow1: function () {
    let that = this;

    if (that.data.mywish != -1 && that.data.wish_up == true) {
      that.up_data(); //上传志愿

      that.setData({
        wish_up: false
      });
    };
    this.user_set();
    // console.log('hasuser');
    // console.log(that.data.hasUserInfo);
    if (this.data.hasUserInfo) {
      console.log('get onloauch in show');
      that.onLaunch();
    };
    // console.log('app id');
    // console.log(app.globalData.userid);
  },

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
  onPullDownRefresh: function () {
    this.onShow1();
    console.log('刷新了')
    my.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});