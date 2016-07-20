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
  methods: {
    login: function () {
      var url = '/oauth/token';
      var param = {};
      param.username = this.account;
      param.password = this.password;
      acHttp.oauth(this, url, param, function (ret) {
        console.log(ret);
      });
    },
    getUserInfo: function () {
      var url = '/api/account';
      acHttp.request(this, 'GET', url, function (ret) {
        console.log(ret);
      });
    },
    logout: function () {
      var url = '/api/logout';
      acHttp.request(this, 'POST', url, function (ret) {
        console.log(ret);
      });
    }
  }
};
