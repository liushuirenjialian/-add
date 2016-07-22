
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      user: ac_store.getUserInfo()
    };
  },
  created: function () {
    console.log(this.data);
  },
  methods: {
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