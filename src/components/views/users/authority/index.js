require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      dropdownStatus: false,
      actionId: 1
    };
  },
  components: {
    menu: require('../menu')
  },
  created: function () {
    this.$dispatch('showBreadcrumb', '权限管理');
  },
  methods: {
   
  }
};
