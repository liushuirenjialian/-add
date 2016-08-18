require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  route: {
    data: function (transition) {
      this.$dispatch('showBreadcrumb', '用户详情');
      var login = transition.to.params.login;
      this.initData(login);
    }
  },
  data: function () {
    return {
      detail: {
        id: '',
        login: '',
        firstName: '',
        lastName: '',
        email: '',
        activated: '',
        authorities: []
      }
    };
  },
  components: {
    authority: require('../authority')
  },
  methods: {
    initData: function (login) {
      if (login === 'add') {return;}
      var url = '/api/users/' + login;
      var _this = this;
      ac_http.request(_this, 'GET', url, function (res) {
        _this.detail = res.data;
        _this.$broadcast('loadAuthorities', _this.detail.authorities);
      });
    },
    switchActivated: function () {
      this.detail.activated = !this.detail.activated;
    },
    backList: function () {
      this.$router.go('/users/list/all');
    },
    save: function () {
      var url = '/api/users';
      var param = {};
      param.id = this.detail.id;
      param.login = this.detail.login;
      param.firstName = this.detail.firstName;
      param.lastName = this.detail.lastName;
      param.email = this.detail.email;
      param.activated = this.detail.activated;
      param.langKey = 'zh-cn';
      param.authorities = this.detail.authorities;
      var method = 'POST';
      if (param.id > 0) {
        method = 'PUT';
      }
      var _this = this;
      ac_http.request(_this, method, url, param, function (res) {
        if (res.ret < 0) {
          _this.$dispatch('showMsg', res.data.message, 1); return;
        }
        _this.detail.id = res.data.id;
        _this.$dispatch('showMsg', '保存成功');
      });
    },
    resetPassword: function () {
      var url = '/api/users/resetPassword/' + this.detail.id;
      var _this = this;
      ac_http.request(_this, 'GET', url, function (res) {
        if (res.ret < 0) {
          _this.$dispatch('showMsg', res.data.message, 1); return;
        }
        _this.$dispatch('showMsg', '重置密码成功：' + res.data.data);
      });
    }
  }
};
