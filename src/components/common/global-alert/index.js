
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      globalAlert: {
        show: 'alert-hide',
        class: 'toast-success',
        msg: '操作成功'
      }
    };
  },
  created: function () {
    // console.log(this.data);
  },
  events: {
    // toast-success toast toast-info toast toast-warning toast toast-error
    // classname 0:操作成功 1：信息 bg-info 2：提示  bg-warning 3：错误 bg-danger
    showGlobalalert: function (message, classname) {
      this.globalAlert.show = 'alert-show';
      var alertStatus = classname;
      if (!alertStatus) { alertStatus = 0; }
      if (alertStatus === 1) {
        this.globalAlert.class = 'toast-error';
      } else if (alertStatus === 2) {
        this.globalAlert.class = 'bg-warning';
      } else if (alertStatus === 3) {
        this.globalAlert.class = 'bg-danger';
      } else {
        this.globalAlert.class = 'bg-success';
      }
      this.globalAlert.msg = message;
      var interVal;
      var _this = this;
      interVal = setInterval(function () {
        clearInterval(interVal);
        if (_this.globalAlert.show === 'alert-show') {
          _this.globalAlert.show = 'alert-hide';
        }
      }, 2000);
    } 
    // the use of way
  
    // messaeShow:function(){
    // }
  },
  methods: {
    close: function () {
      // console.log("close");
    }
  }
};
