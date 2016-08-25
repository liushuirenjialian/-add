require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  route: {
    data: function (transition) {
      this.$dispatch('showBreadcrumb', '用户详情');
      var login = transition.to.params.login;
      this.truePassword = '';
      this.initData(login);
    }
  },
  data: function () {
    return {
      truePassword: '',
      detail: {
        id: '',
        login: '',
        firstName: '',
        lastName: '',
        email: '',
        activated: true,
        authorities: [],
        games: []
      }
    };
  },
  components: {
    authority: require('../authority'),
    game: require('../game')
  },
  methods: {
    initData: function (login) {
      if (login === 'add') {return;}
      var url = '/api/users/' + login;
      var _this = this;
      ac_http.request(_this, 'GET', url, function (res) {
        _this.detail = res.data;
        _this.$broadcast('loadAuthorities', _this.detail.authorities);
        _this.$broadcast('loadUserGames', _this.detail.games);
      });
    },
    switchActivated: function () {
      this.detail.activated = !this.detail.activated;
    },
    backList: function () {
      this.$router.go('/users/list/all');
    },
    save: function () {
      this.truePassword = '';
      var url = '/api/users';
      var param = {};
      ac_.forEach(this.detail, function (val, key) {
        param[key] = val;
      });
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
        _this.truePassword = res.headers('truePassword');
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
        _this.truePassword = res.data.data;
        _this.$dispatch('showMsg', '重置密码成功！');
      });
    },
    syncGames: function (games) {
      this.detail.games = games;
    }
  }
};
