
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
    // 信息，状态
    // toast-success toast toast-info toast toast-warning toast toast-error
    showGlobalalert: function (message, status) {
      this.globalAlert.show = 'alert-show';
      var alertStatus = status;
      if (!alertStatus) { alertStatus = 0; }
      if (alertStatus === 1) {
        this.globalAlert.class = 'toast-error';
      } else if (alertStatus === 2) {
        this.globalAlert.class = 'toast-warning';
      } else if (alertStatus === 3) {
        this.globalAlert.class = 'toast-danger';
      } else {
        this.globalAlert.class = 'toast-success';
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
  },
  methods: {
    close: function () {
      // console.log("close");
    }
  }
};
