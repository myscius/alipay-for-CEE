Page({
  data: {
    time:"",
    timecha:"",
    showInputBox: false, // 控制输入框的显示与隐藏
    inputValue: '' // 输入框的值
  },
  gettime(){
    const dayjs = require('dayjs');
    const date1=dayjs();
    const date2=dayjs('2023-12-31');
    const formattedTime = date1.format('MM月DD日');
    var shicha =date2.diff(date1, 'day');
    this.setData(
      {
        time:formattedTime,
        timecha:shicha,

      },
    )


  },
  antmoveAction0(){
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
    // 在这里执行提交操作，可以发送请求或进行其他逻辑处理
    console.log('提交的值为：', value);
    
    // 提交完成后，隐藏输入框
    this.setData({
      showInputBox: false,
      inputValue: ''
    });
  },
  antmoveAction(){
    my.navigateTo({
      url: "../major_watch/major_watch"
    })

  },
  antmoveAction1(){
    my.navigateTo({
      url: "../province_line/province_line"
    })
  },
  antmoveAction4(){
    my.navigateTo({
      url:"../admission_line/admission_line"
    })
  },
  antmoveAction5(){
    my.navigateTo({
      url:"../twobest/twobest"
    })
  },

  onLoad() {
    this.gettime();
  },
});
