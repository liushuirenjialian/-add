var acHttp = require('../../../lib/http.js');
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
    alert: require('vue-strap').alert
  },
  methods: {
    login: function () {
      debugger;
      var url = '/oauth/token';
      var param = {};
      param.username = this.account;
      param.password = this.password;
      var _this = this;
      acHttp.oauth(_this, url, param, function () {
        _this.getUserInfo();
      });
    },
    getUserInfo: function () {
      var url = '/api/account';
      acHttp.request(this, 'GET', url, function (ret) {
        ac_store.setUserInfo(ret.data);
      });
    }
  }
};
