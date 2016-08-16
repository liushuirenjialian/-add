
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      alert: {
        show: 'alert-hide',
        class: 'bg-success',
        message: '操作成功'
      }
    };
  },
  created: function () {
    // console.log(this.data);
  },
  events: {
    // classname 0:操作成功 1：信息 bg-info 2：提示  bg-warning 3：错误 bg-danger
    showAlert: function (message, classname) {
      this.alert.show = 'alert-show';
      var alertStatus = classname;
      if (!alertStatus) { alertStatus = 0; }
      if (alertStatus === 1) {
        this.alert.class = 'bg-info';
      } else if (alertStatus === 2) {
        this.alert.class = 'bg-warning';
      } else if (alertStatus === 3) {
        this.alert.class = 'bg-danger';
      } else {
        this.alert.class = 'bg-success';
      }
      this.alert.message = message;
      var interVal;
      var _this = this;
      interVal = setInterval(function () {
        clearInterval(interVal);
        if (_this.alert.show === 'alert-show') {
          _this.alert.show = 'alert-hide';
        }
      }, 16000);
    }
  },
  methods: {
    close: function () {
      // console.log("close");
    }
  }
};
