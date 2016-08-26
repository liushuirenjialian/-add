/* global ac_util ac_ ac_cookies */

require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      gameReport: []
    };
  },
  components: {
    omolayout: require('../../common/layout')
  },
  created: function () {
    this.$dispatch('showBreadcrumb', '仪表盘');
    this.bindGameReport();
  },
  methods: {
    bindGameReport: function () {
      var url = '/api/report/gameTicketCount';
      var _this = this;
      ac_http.request(_this, 'GET', url, function (res) {
        _this.gameReport = res.data;
      });
    }
  },
  events: {
  }
};
