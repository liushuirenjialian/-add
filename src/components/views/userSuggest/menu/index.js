require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      actionId: 1,
      categoryList: []
    };
  },
  created: function () {
    this.bindingRole();
  },
  methods: {
    bindingRole: function () {
      var _this = this;
      var url = '/api/category-faqs';
      var param = {};
      param.page = 0;
      param.size = 1000;
      ac_http.request(_this, 'GET', url, param, function (ret) {
        _this.categoryList = ret.data;
      });
    }
  }
};
