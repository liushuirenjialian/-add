/* global ac_util ac_ ac_cookies */

require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      actionId: 0
    };
  },
  created: function () {
    this.$dispatch('onActived', this.actionId);
  },
  methods: {
    logout: function () {
    }
  },
  events: {
    onActived: function (id) {
      console.log('页面id：'+ id);
      this.actionId = id;
    }
  }
};
