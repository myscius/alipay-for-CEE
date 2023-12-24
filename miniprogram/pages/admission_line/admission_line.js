const _my = require("../../__antmove/api/index.js")(my);
// pages/admissions_line/admissions_line.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        arrangement: "本科二批",
        arrangement_num: 1,
        arrangement_list: ["本科一批", "本科二批", "本科三批", "专科"],
        province: "广东",
        showInputBox: false, // 控制输入框的显示与隐藏
        inputValue: '', // 输入框的值
        province_list: [
            "请选择您所在的省市",
            "山东",
            "江苏",
            "上海",
            "浙江",
            "安徽",
            "福建",
            "江西",
            "广东",
            "广西",
            "海南",
            "河南",
            "湖南",
            "湖北",
            "北京",
            "天津",
            "河北",
            "山西",
            "内蒙古",
            "宁夏",
            "青海",
            "陕西",
            "甘肃",
            "新疆",
            "四川",
            "贵州",
            "云南",
            "重庆",
            "西藏",
            "辽宁",
            "吉林",
            "黑龙江"
        ],
        type_list: ["文科", "理科"],
        type: "理科",
        type_num: 1,
        px: 0,
        school: "大连海事大学",
        line: [
            {
                year: "2021",
                grade: 519,
                y: 0
            },
            {
                year: "2022",
                grade: 402,
                y: 0
            },
            {
                year: "2023",
                grade: 360,
                y: 0
            }
        ]
    },
    school_change() {
      this.setData({
        showInputBox: true
      });
    },
    cancel(){
      this.setData({
        showInputBox: false,
        inputValue: ''
      });
  
    },
    inputChange(e) {
      this.setData({
        inputValue: e.detail.value
      });
    },
    submitInput(){
      const value = this.data.inputValue;
      // 在这里执行提交操作，可以发送请求或进行其他逻辑处理
      console.log('提交的值为：', value); 
      // 提交完成后，隐藏输入框
      this.setData({
        showInputBox: false,
        school:value,
        inputValue: ''

      });
      this.search();

    },
    arrangement_change: function(e) {
        let that = this;
        var arrangement_fake = that.data.arrangement_list[e.detail.value];
        this.setData({
            arrangement: arrangement_fake,
            arrangement_num: e.detail.value
        });
    },
    type_change: function(e) {
        let that = this;
        var type_fake = that.data.type_list[e.detail.value];
        this.setData({
            type: type_fake,
            type_num: e.detail.value
        });
    },
    province_change: function(e) {
        let that = this;

        if (e.detail.value != 0) {
            var province_fake = that.data.province_list[e.detail.value];
            this.setData({
                province: province_fake
            });
        }
    },
    getrpx: function(e) {
        var that = this;

        var width = _my.getSystemInfoSync().windowWidth;

        var px_fake = width / 750;
        that.setData({
            px: px_fake
        });
    },
    line_ctx: function(e) {
        var ponit_x = new Array(3);
        var ponit_y = new Array(3);
        var that = this;
        var px = that.data.px;

        const ctx = _my.createCanvasContext("myCanvas");

        ponit_y[0] = 154 - (that.data.line[0].grade / 750) * 154;
        ponit_x[0] = px * 110;
        ctx.moveTo(ponit_x[0], ponit_y[0]);
        ponit_x[1] = px * 330;
        ponit_y[1] = 154 - (that.data.line[1].grade / 750) * 154;
        ctx.lineTo(ponit_x[1], ponit_y[1]);
        ponit_x[2] = px * 550;
        ponit_y[2] = 154 - (that.data.line[2].grade / 750) * 154;
        ctx.lineTo(ponit_x[2], ponit_y[2]);
        ctx.setStrokeStyle("#1C7F75");
        ctx.setLineWidth(2);
        ctx.stroke();

        for (var i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(ponit_x[i], ponit_y[i], 5, 0, 2 * Math.PI);
            ctx.setFillStyle("#55c4b8");
            ctx.fill();
            var line_y = "line[" + i + "].y";
            that.setData({
                [line_y]: ponit_y[i]
            });
        }

        ctx.draw();
    },
    //向后台请求数据
    async search(e) {
        my.showLoading({
            content: "数据加载中",
            mask: true
        });
        var that = this;
        var context = await my.getCloudContext();
        context.callFunction({
          name: 'admission_line',
          data: {
                sch_name: that.data.school,
                inp_province: that.data.province,
                inp_batch: that.data.arrangement_num,
                inp_select: that.data.type_num
          },
            success: function(res) {
                var line_list = res.result;
                // console.log(res.result);

                if (res.result.length == 0) {
                    my.showToast({
                        type: 'fail',
                        content: "暂无更多数据，请尝试其他选项",
                        mask:true
                        
        
                    });
                    that.setData({
                      ['line[0].grade']:'',
                      ['line[1].grade']:'',
                      ['line[2].grade']:''
                    })

                } else {
                    var min_2015 = "line[0].grade";
                    var min_2016 = "line[1].grade";
                    var min_2017 = "line[2].grade";
                    that.setData({
                        [min_2015]: line_list[0]["mina"],
                        [min_2016]: line_list[0]["minb"],
                        [min_2017]: line_list[0]["minc"]
                    });
                }

                setTimeout(function() {
                  my.hideLoading(); // 关闭消息提示
                }, 2000); // 设置定时器，2秒后关闭消息提示
                that.line_ctx();
            },
            fail: function() {}
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        that.getrpx();
        // that.line_ctx();
        that.search();
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
