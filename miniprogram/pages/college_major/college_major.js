const _my = require("../../__antmove/api/index.js")(my);
// pages/college_major/college_major.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        sp_proid: "",
        result:'',
        arrangement: "一批",
        arrangement_list: ["一批", "二批", "三批", "专科"],
        arrangement_num: -1,
        province: "",
        direction:'',
        num:'',
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
        type_list: ["你是文科还是理科？", "理科", "文科"],
        type: "理科",
        major: [
            {
                name: "",
                score: "",
                rank: ""
            }
        ]
    },
    //向后台请求数据
    async search(e) {
      my.showLoading({
        content:'加载中',
        mask:true
      })
        let that = this;
        var context = await my.getCloudContext();
        context.callFunction({
          name: 'college_major1',
          data: {
                direction: that.data.direction,
                province: that.data.province,
                rank: that.data.rank,
    
          },
          success: function(res){
             
            var data=res.result;
            // console.log('hah')
            // console.log(data)
            var major_list = data;
            var length = major_list.length;
            var major_fake = new Array();

            for (var i = 0; i < length; i++) {
                var myArray = {
                    name: major_list[i]["schname"],
                    score: major_list[i]["score"],
                    rank: major_list[i]["rank"]
                };
                major_fake.push(myArray);
            }

            that.setData({
                major: major_fake,
                num:length
            });
            my.hideLoading();

          }





              })       
       
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;


            that.setData({
                rank: options.rank,
                province:options.province,
                direction:options.direction
            });
            this.search();
        
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
