/* global ac_util ac_ ac_cookies */
var handleXHR = require('../../../lib/handleXHR.js');

require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      logs: []
    };
  },
  components: {
    'log-list': require('../log-list')
  },
  created: function () {
    var uid = window.ac_secret_things.uid;
    ac_util.stopLoading();
    this.$http({
      url: '/api/center/recentLog?uid=' + uid,
      method: 'GET'
    }).then(function (res) {
      handleXHR.call(this, { res: res }, function (ctx) {
        ctx.logs = res.data.data;
      });
    }, function (res) {
      handleXHR.call(this, { res: res, type: 'alert' });
    });
  }
};
