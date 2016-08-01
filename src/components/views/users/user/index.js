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
    this.$dispatch('showBreadcrumb', '用户管理');
  },
  methods: {
    teggleDropdown: function () {
      this.dropdownStatus = !this.dropdownStatus;
    }
  }
};
