
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      globalAlert: {
        isshow: false,
        class: 'toast-success',
        msg: '操作成功',
        times: 3000,
        barWidth: 100
      }
    };
  },
  created: function () {
    // 测试
    // this.globalAlert.class = 'toast-warning';
    // this.globalAlert.isshow = true;
    // this.autoClose();
  },
  events: {
    // 信息，状态
    // toast-success toast toast-info toast toast-warning toast toast-error
    showGlobalalert: function (message, status) {
      this.globalAlert.isshow = true;
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
      this.autoClose();
    }
  },
  methods: {
    close: function () {
      this.globalAlert.isshow = false;
    },
    autoClose: function () {
      var _this = this;
      var i = 0;
      var speed = 100 / (_this.globalAlert.times / 10);
      _this.globalAlert.barWidth = 100;
      var autoporess = setInterval(function () {
        i += 1; // 0.2 =  4000 / 10 = 400. 100/400 =0.25
        _this.globalAlert.barWidth = 100 - speed * i;
        if (_this.globalAlert.barWidth <= 0 || _this.globalAlert.isshow === false) {
          clearInterval(autoporess);
          _this.globalAlert.isshow = false;
        }
      }, 10);
    }
  }
};
