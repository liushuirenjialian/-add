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
      var url = '/api/account';
      var _this = this;
      var param = ac_store.getUserInfo();
      param.firstName = this.user.firstName;
      param.email = this.user.email;
      var authorities = param.authorities;
      delete param.authorities;
      ac_http.request(_this, 'POST', url, param, function (ret) {
        if (ret.ret < 0) {
          _this.$dispatch('showMsg', res.data.message, 1); return;
        }
        param.authorities = authorities;
        ac_store.setUserInfo(param);
      });
    }
  },
  events: {
    onActived: function (id) {
      this.actionId = id;
    }
  }
};
