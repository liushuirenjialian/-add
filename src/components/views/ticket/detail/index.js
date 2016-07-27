require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      actionId: 1
    };
  },
  created: function () {
    this.$dispatch('showBreadcrumb', '工单详情');
  },
  methods: {
    logout: function () {
    }
  }
};
