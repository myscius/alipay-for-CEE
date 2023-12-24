const _my = require("../../__antmove/api/index.js")(my);
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        sch_id: "",
        //学校Id
        sch_name: "东莞理工学院",
        //学校名
        sch_images: "https://gkcx.eol.cn/upload/schoollogo/291.jpg",
        //学校logo
        sch_beijing:
            "http://www.mtdg.club/wwwroot/ftp/裕祺/images/gaokao/3dc417fbb776466fa536ba8311799cb9.jpg",
        //学校背景
        sch_address: "广东省东莞市松山湖区大学路1号",
        //学校地址
        sch_brief: "Dongguan University Of Technology",
        //学校语录
        sch_details:
            "东莞理工学院是广东东莞市的第一所普通本科院校，省市共建，以市为主，由诺贝尔物理学奖获得者杨振宁博士任名誉校长 。学校于1990年筹办。1992年4月，经原国家教委批准成立。2002年3月，经教育部批准变更为本科全日制普通高等院校。2006年5月，获批成为学士学位授予单位。2008年5月，提前参加教育部本科教学工作水平评估并以良好成绩通过。2010年6月，与清华大学等61所高校一起被批准为教育部第一批“卓越工程师教育培养计划”实施高校。2010年8月，获批成为广东省立项建设的新增硕士学位授予单位。2012年，获批为“广东省国际科技合作基地”。2015年7月，化学工程与技术、计算机科学与技术、电子科学与技术3个一级学科被授予高等学校副教授评审权。2015年9月被确定为第一批省市共建高水平理工科大学建设单位。",
        //学校简介
        sch_type: "理工类",
        //学校类型
        sch_code: "11819",
        //学校代码
        sch_super: 0,
        index:0,
        //学校层次
        arrangement: "本科一批",
        arrangement_num: 0,
        arrangement_list: ["本科一批", "本科二批", "本科三批", "专科"],
        province: "广东",
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
        type: "文科",
        type_num: 0,
        college_grade: [
            {
                year: "2023",
                average: "---",
                min: "---",
                line: "---"
            },
            {
                year: "2022",
                average: "---",
                min: "---",
                line: "---"
            },
            {
                year: "2021",
                average: "---",
                min: "---",
                line: "---"
            }
        ],
        major: []
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
    //搜索分数向后台请求数据
    async search(e) {
      // console.log('nb')
        let that =this
        var context = await my.getCloudContext();
        context.callFunction({
          name:'college',
          data:{
            sch_id: that.data.sch_id,
            inp_province: that.data.province,
            inp_select: that.data.type_num,
            inp_batch: that.data.arrangement_num
          },
            success: function(res) {
             var l=res.result.length;
             var flag=0
              for (var i = 0; i < l; i++){
                if(res.result[i].length==0){
                  flag=flag+1;
                }
              }
              // console.log(res)
              if(flag==0){
                var average_2015 = "college_grade[0].average";
                var average_2016 = "college_grade[1].average";
                var average_2017 = "college_grade[2].average";
                var min_2015 = "college_grade[0].min";
                var min_2016 = "college_grade[1].min";
                var min_2017 = "college_grade[2].min";
                var line_2015 = "college_grade[0].line";
                var line_2016 = "college_grade[1].line";
                var line_2017 = "college_grade[2].line";
                  that.setData({
                    [average_2015]: res.result[1][0]["avera"],
                    [average_2016]: res.result[1][0]["averb"],
                    [average_2017]:res.result[1][0]["averc"],
                    [min_2015]: res.result[1][0]["mina"],
                    [min_2016]: res.result[1][0]["minb"],
                    [min_2017]: res.result[1][0]["minc"],
                    [line_2015]: res.result[2][0]["graa"],
                    [line_2016]: res.result[2][0]["grab"],
                    [line_2017]: res.result[2][0]["grac"],
                  });
  
                  // my.hideLoading();
              }else{
                my.showToast({
                  type: 'fail',
                  content: "暂无更多数据，请尝试其他选项",    
                  duration:3000        
              });
              var college_grade1=that.data.college_grade;
              var l1=that.data.college_grade.length;
              for (var i = 0; i < l1; i++){
                college_grade1[i]['line']=0;
                college_grade1[i]['average']=0;
                college_grade1[i]['min']=0;
              }

              that.setData({
                college_grade:college_grade1
              })
              }
            },
            fail: function(error) {}
        });
    },
    async get_college1(e){
      let that =this
      var context = await my.getCloudContext();
      context.callFunction({
        name:'college',
        data:{
          sch_id: that.data.sch_id,
          inp_province: that.data.province,
          inp_select: that.data.type_num,
          inp_batch: that.data.arrangement_num
        },
        success:function(res){
          var l=res.result.length;
          var flag=0
           for (var i = 0; i < l; i++){
             if(res.result[i].length==0){
               flag=flag+1;
             }
           }
          // console.log(res)
          if(flag==0){
            var major_info = res.result[3];
            // console.log(major_info)
            // console.log(res.result[0][0]['name'])
          // console.log(res.data);
            var average_2015 = "college_grade[0].average";
            var average_2016 = "college_grade[1].average";
            var average_2017 = "college_grade[2].average";
            var min_2015 = "college_grade[0].min";
            var min_2016 = "college_grade[1].min";
            var min_2017 = "college_grade[2].min";
            var line_2015 = "college_grade[0].line";
            var line_2016 = "college_grade[1].line";
            var line_2017 = "college_grade[2].line";
            var major_fake = new Array();
            var length = major_info.length;
  
            for (var i = 0; i < length; i++) {
                var myArray = {
                    sp_proid: major_info[i]["spp_proid"],
                    name: major_info[i]["proname"]
                };
                major_fake.push(myArray);
            }
  
            that.setData({
                sch_name: res.result[0][0]["name"],
                sch_images:  res.result[0][0]["images"],
                sch_beijing:  res.result[0][0]["beijing"],
                sch_address:  res.result[0][0]["address"],
                sch_brief:  res.result[0][0]["brief"],
                sch_details:  res.result[0][0]["details"],
                sch_code:  res.result[0][0]["code"],
                sch_super: res.result[0][0]["super"],
                [average_2015]: res.result[1][0]["avera"],
                [average_2016]: res.result[1][0]["averb"],
                [average_2017]:res.result[1][0]["averc"],
                [min_2015]: res.result[1][0]["mina"],
                [min_2016]: res.result[1][0]["minb"],
                [min_2017]: res.result[1][0]["minc"],
                [line_2015]: res.result[2][0]["graa"],
                [line_2016]: res.result[2][0]["grab"],
                [line_2017]: res.result[2][0]["grac"],
                major: major_fake
            });
  
          }else{
            my.showToast({
              type: 'fail',
              content: "暂无更多数据，请尝试其他选项",    
              duration:3000        
          });
          }
        }

      })

    },
    //向后台请求大学基本数据
    jumpmajor: function(e) {
        var index = e.currentTarget.dataset.key;

        my.navigateTo({
            url: "../college_major/college_major?sp_proid=" + index
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;

        if (options.sch_id) {
            that.setData({
                sch_id: options.sch_id
            });
            // console.log(options.sch_id)
            that.get_college1();
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
