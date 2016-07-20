var handleXHR = require('../../../lib/handleXHR.js');
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
      var url = "/v1/oauth/token";
      var param = {};
      param.account = this.account;
      param.password = this.password;
      ac_http.oauth(url,param,function(ret){
        console.log(ret); 
      });

    }
  }
};
