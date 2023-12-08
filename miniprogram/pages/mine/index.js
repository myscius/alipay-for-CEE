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
  onLaunch: function () {},
  check_user: function (e) {},
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  user_set: function (e) {
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
    }
  },
  //上传电话号码
  tel_up: function (e) {
    let that = this;

    _my.showModal({
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
  grade_input_open: function (e) {},
  university_input_open: function (e) {}, // 点击输入我的志愿
  grade_input_close: function (e) {
    let that = this;
        var index = e.currentTarget.dataset.key;
        this.setData({
            grade_input: false,
            grade_input_word: false,
            curtain_ani: false
        });
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
  up_data: function (e) {},
  //向后台请求数据
  search: function (e) {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      userid: app.globalData.userid
    });
    that.little_rise();
    that.Bubble_move();
    that.user_set();
    that.onLaunch();
    that.search();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;

    if (that.data.mywish != -1 && that.data.wish_up == true) {
      that.up_data(); //上传志愿

      that.setData({
        wish_up: false
      });
    }
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