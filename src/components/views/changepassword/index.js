/* global ac_util ac_ ac_cookies */

require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      user: ac_store.getUserInfo(),
      password: '',
      confirmPassword: ''
    };
  },
  created: function () {
    this.$dispatch('showBreadcrumb', '修改密码');
  },
  methods: {
    
    checkPassword: function () {
      var url = '/api/account/change_password';
      var _this = this;
      var param = ac_store.getUserInfo();
      param.password = this.password;
      param.confirmPassword = this.confirmPassword;
      if (!this.password) {
        alert('密码不能为空！'); return;
      }
      if (this.password !== this.confirmPassword) {
        alert('两次密码不同，请重新输入！'); return;
      }
      ac_http.request(_this, 'POST', url, param, function (ret) {
        if (ret.ret < 0) {
          alert(ret.data.error); return;
        }
      });
    }
  },
  events: {
    onActived: function (id) {
      this.actionId = id;
    }
  }
}