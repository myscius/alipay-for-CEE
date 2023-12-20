Page({
  data: {
    time: "",
    timecha: "",
    showInputBox: false, // 控制输入框的显示与隐藏
    inputValue: '',
    array: ['安徽', '上海', '江苏', '山东'],
    array1:['理科','文科'],
    province:'',
    index: 0,
    index1:0,
    defaultValue: '安徽',
    open: false,
    rank:'' // 输入框的值
  },
  gettime() {
    const dayjs = require('dayjs');
    const date1 = dayjs();
    const date2 = dayjs('2024-06-20');
    const formattedTime = date1.format('MM月DD日');
    var shicha = date2.diff(date1, 'day');
    this.setData({
      time: formattedTime,
      timecha: shicha,

    }, )


  },
  antmoveAction0() {
    this.setData({
      showInputBox: true
    });
  },
  inputChange(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  submitInput() {
    const value = this.data.inputValue;
    my.navigateTo({
      url: "../college_search/college_search?college_name=" + value
    })
    // 在这里执行提交操作，可以发送请求或进行其他逻辑处理
    console.log('提交的值为：', value);

    // 提交完成后，隐藏输入框
    this.setData({
      showInputBox: false,
      inputValue: ''
    });
  },
  cancel(){
    this.setData({
      showInputBox: false,
      inputValue: ''
    });

  },
  antmoveAction2() {
    my.navigateTo({
      url: "../major_watch/major_watch"
    })

  },
  antmoveAction1() {
    my.navigateTo({
      url: "../province_line/province_line"
    })
  },
  antmoveAction4() {
    my.navigateTo({
      url: "../admission_line/admission_line"
    })
  },
  antmoveAction3(){
    my.navigateTo({
      url: "../psychology_inc/psychology_inc"
  })
  },
  antmoveAction5(e) {
    var i = e.currentTarget.dataset.key;

    console.log(i)

    my.navigateTo({
      url: "../twobest/twobest?code=" + i
    })
  },
  onChange: function ( e) {
    
    console.log(e);
    this.setData({
      rank:e
    })
  },
  onConfirm: function (value) {
    my.alert({
      content: value,
    });
  },
  ifopen(){
    var openfake=this.data.open
    console.log(openfake)
    this.setData({
      open:!openfake,
      rank:''
    }

    )
  },
  async search(){
    var that = this;
    if(that.data.rank!=''){
      var context = await my.getCloudContext();
    context.callFunction({
      name: 'college_major1',
      data: {
            direction: that.data.array1[that.data.index1],
            province: that.data.array[that.data.index],
            rank: that.data.rank,

      },
      success: function(res){
        console.log(res)
        if(res.result.length!=0){
          my.navigateTo({
            url: "/pages/college_major/college_major?rank="+that.data.rank+"&province="+that.data.array[that.data.index]+"&direction="+ that.data.array1[that.data.index1]
          })
          // that.setData({
          //   rank:''
          // })
        }else{
          my.showToast({
            type:'fail',
            content:'数据库缺失，请调整你的名次或选项',
            duration: 3000
          })
        }
      }

    })
    }else{
      my.showToast({
        type:'fail',
        content:'数据库缺失，请调整你的名次或选项',
        duration: 3000
      })
    }
    
  },
  bindPickerChange1(e) {
    var i=e.detail.value;
    var province=this.data.array1[i]
    // console.log('picker发送选择改变，携带值为', province);
    this.setData({
      index1: e.detail.value,
    });
  },
  bindPickerChange(e) {
    var i=e.detail.value;
    var province=this.data.array[i]
    // console.log('picker发送选择改变，携带值为', province);
    this.setData({
      index: e.detail.value,
    });
  },



  onLoad() {
    this.gettime();
  },
});