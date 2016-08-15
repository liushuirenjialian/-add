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
    // require 的是alert下的index.js
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
          _this.$broadcast('showAlert', '账号或密码错误!', 2);
          return;
        }
        var token = ret.data;
        var expiredAt = new Date();
        expiredAt.setSeconds(expiredAt.getSeconds() + token.expires_in);
        token.expires_at = expiredAt.getTime();
        ac_store.setToken(token);
        // 派发事件，沿着父链冒泡 推出去当前消息
        _this.$broadcast('showAlert', '成功登录！');
        _this.getUserInfo();
      });
    },
    getUserInfo: function () {
      var url = '/api/account';
      var _this = this;
      ac_http.request(_this, 'GET', url, function (ret) {
        ac_store.setUserInfo(ret.data);
        // router.go(path)  path跳转信息
        _this.$router.go('/home');
      });
    }
  }
};
