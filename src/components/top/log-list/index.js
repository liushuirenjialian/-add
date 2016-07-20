/* global ac_util ac_ ac_cookies */

require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  props: {
    logs: {
      type: Array
    }
  },
  created: function () {
    ac_util.stopLoading();
  },
  methods: {
    formatDate: function (stamp) {
      return ac_util.formatDate(new Date(stamp), '%M月%d号 %H:%m:%s');
    }
  }
};
