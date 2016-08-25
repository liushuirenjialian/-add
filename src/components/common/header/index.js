
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      noReadCount: 0,
      menuShow: true,
      settingShow: false,
      user: ac_store.getUserInfo()
    };
  },
  created: function () {
    var _this = this;
    _this.getMyNoReadMessage();
    setInterval(function () {
      _this.getMyNoReadMessage();
    }, 50000);
  },
  methods: {
    getMyNoReadMessage: function () {
      var url = '/api/messages/myNoRead';
      var _this = this;
      ac_http.request(_this, 'GET', url, function (res) {
        if (res.ret > 0) {
          _this.noReadCount = res.data;
        }
      });
    },
    toggleMenu: function () {
      this.$dispatch('toggleCollapsed');
    },
    toggleSetting: function () {
      this.settingShow = !this.settingShow;
    },
    logout: function () {
      var url = '/api/logout';
      var _this = this;
      ac_http.request(_this, 'POST', url, function () {
        ac_store.logout();
        _this.$router.go('/login');
      });
    }
  }
};
