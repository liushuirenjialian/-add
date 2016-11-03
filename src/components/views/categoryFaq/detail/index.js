require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      actionId: 1,
      detail: {
        id: '',
        name: '',
        sort: 0,
        parentId: 0
      }
    };
  },
  created: function () {
    this.$dispatch('showBreadcrumb', 'FAQ分类管理详情');
    this.initData();
  },
  methods: {
    initData: function () {
      var id = this.$route.params.id;
      if (id === 'add') {return;}
      var url = '/api/category-faqs/' + id;
      var _this = this;
      ac_http.request(_this, 'GET', url, function (res) {
        _this.detail = res.data;
      });
    },
    backList: function () {
      this.$router.go('/categoryFaq/list');
    },
    save: function () {
      var url = '/api/category-faqs';
      var param = {};
      param.id = this.detail.id;
      param.name = this.detail.name;
      param.sort = this.detail.sort;
      param.parentId = this.detail.parentId;
      var method = 'POST';
      if (param.id > 0) {
        method = 'PUT';
      }
      var _this = this;
      ac_http.request(_this, method, url, param, function (res) {
        if (res.ret < 0) {
          _this.$dispatch('showMsg', res.data.message, 1); return;
        }
        _this.detail.id = res.data.id;
        _this.$dispatch('showMsg', '保存成功');
      });
    }
  }
};
