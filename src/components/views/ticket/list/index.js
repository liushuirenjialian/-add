require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      dropdownStatus: false,
      actionId: 1
      // user: ac_http.request(),
      // id: ''
    };
  },
  components: {
    menu: require('../menu')
  },
  created: function () {
    this.$dispatch('showBreadcrumb', '工单列表');
    // ac_http.request();
  },
  methods: {
    teggleDropdown: function () {
      this.dropdownStatus = !this.dropdownStatus;
    // },
    // getAll: function () {
    //   var url = '/api/tickets';
    //   var _this = this;
    //   var param = ac_http.request();
    //   param.id = this.id;
    //   ac_http.request(_this, 'GET', url, param, function (ret) {
    //     if (ret.ret < 0) {
    //       alert(ret.data.error); return;
    //     }
    //   ac_http.request(param);  
    //   });
    }
  }
};
