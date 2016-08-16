
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      menuShow: true,
      settingShow: false,
      user: ac_store.getUserInfo()
    };
  },
  created: function () {
    // console.log(this.data);
  },
  methods: {
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
        ac_store.setUserInfo(null);
        ac_store.setToken(null);
        _this.$router.go('/login');
      });
    }
  }
};
