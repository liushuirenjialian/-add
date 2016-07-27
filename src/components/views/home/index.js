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
    // ac_util.stopLoading();
    // this.pageFinishedLoading = false;
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
    onActived: function (id) {
      this.actionId = id;
    },
    showBreadcrumb: function (pageName) {
      this.pageName = pageName;
    },
    toggleCollapsed: function () {
      this.menuCollapsed = !this.menuCollapsed;
    }
  }
};
