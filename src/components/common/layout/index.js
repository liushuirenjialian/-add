
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  props: {
    actionId: {
      type: Number,
      coerce: function (val) {
        var res = val;
        if (typeof val !== 'number') {
          res = val || 99;
        }
        return res;
      }
    }
  },
  data: function () {
    return {
      user: ac_store.getUserInfo()
    };
  },
  components: {
    omoheader: require('../header'),
    omoleftmenu: require('../leftmenu')
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
