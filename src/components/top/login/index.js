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
      var url = '/v1/oauth/token';
      var param = {};
      param.username = this.account;
      param.password = this.password;
      acHttp.oauth(this, url, param, function (ret) {
        console.log(ret);
      });
    },
    getUserInfo: function () {
      var url = '/v1/api/account';
      acHttp.request(this, 'GET', url, function (ret) {
        console.log(ret);
      });
    }
  }
};
