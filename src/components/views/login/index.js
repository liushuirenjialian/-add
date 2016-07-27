require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      account: '',
      password: ''
    };
  },
  components: {
    alert: require('../../common/alerts')
  },
  created: function () {
    this.$dispatch('toggleNoauth');
  },
  methods: {
    login: function () {
      var url = '/oauth/token';
      var param = {};
      param.username = this.account;
      param.password = this.password;
      var _this = this;
      ac_http.oauth(_this, url, param, function (ret) {
        if (ret.ret < 0) {
          _this.$broadcast('showAlert', '账号或密码错误！', 3);
          return;
        }
        var token = ret.data;
        var expiredAt = new Date();
        expiredAt.setSeconds(expiredAt.getSeconds() + token.expires_in);
        token.expires_at = expiredAt.getTime();
        ac_store.setToken(token);
        _this.$dispatch('showAlert', '成功登录！');
        _this.getUserInfo();
      });
    },
    getUserInfo: function () {
      var url = '/api/account';
      var _this = this;
      ac_http.request(_this, 'GET', url, function (ret) {
        ac_store.setUserInfo(ret.data);
        _this.$router.go('/home');
      });
    }
  }
};
