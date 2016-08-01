/* global ac_util ac_ ac_cookies */

require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      user: ac_store.getUserInfo(),
      inputFirstName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  created: function () {
    this.$dispatch('showBreadcrumb', '个人信息');
  },
  methods: {
    updateProfile: function () {
      // debugger;
      var url = '/api/account';
      var _this = this;
      var param = ac_store.getUserInfo();
      param.firstName = this.user.firstName;
      param.email = this.user.email;
      var authorities = param.authorities;
      delete param.authorities;
      ac_http.request(_this, 'POST', url, param, function (ret) {
        if (ret.ret < 0) {
          alert(ret.data.error); return;
        }
        param.authorities = authorities;
        ac_store.setUserInfo(param);
      });
    }
    // checkPassword: function () {
    //   var url = '/api/account/change_password';
    //   var _this = this;
    //   var param = ac_store.getUserInfo();
    //   param.password = this.password;
    //   param.confirmPassword = this.confirmPassword;
    //   if (!this.password) {
    //     alert('密码不能为空！'); return;
    //   }
    //   if (this.password !== this.confirmPassword) {
    //     alert('两次密码不同，请重新输入！'); return;
    //   }
    //   ac_http.request(_this, 'POST', url, param, function (ret) {
    //     if (ret.ret < 0) {
    //       alert(ret.data.error); return;
    //     }
    //   });
    // }
  },
  events: {
    onActived: function (id) {
      this.actionId = id;
    }
  }
}