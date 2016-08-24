/* global ac_util ac_ ac_cookies */

require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      pageFinishedLoading: false,
      menuCollapsed: false,
      pageName: '仪表盘',
      actionId: 0
    };
  },
  components: {
    omolayout: require('../../common/layout')
  },
  created: function () {
    this.$dispatch('showBreadcrumb', '仪表盘');
  },
  ready: function () {
    // ac_util.stopLoading();
    // this.pageFinishedLoading = true;
  },
  methods: {
    logout: function () {
    }
  },
  events: {
  }
};
