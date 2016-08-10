require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      dropdownStatus: false,
      actionId: 1,
      page: 0,
      size: 3,
      total: 0,
      pageList: []
    };
  },
  components: {
    paging: require('../../../common/paging')
  },
  created: function () {
    this.$dispatch('showBreadcrumb', '分类管理');
    this.bindList(0);
  },
  events: {
    pagindGo: function (num) {
      this.bindList(num);
    }
  },
  methods: {
    bindList: function (num) {
      var url = '/api/categories';
      var param = {};
      param.page = num;
      param.size = this.size;
      this.page = num;
      var _this = this;
      ac_http.request(_this, 'GET', url, param, function(ret) {
        _this.pageList = ret.data;
        _this.total = ret.headers('x-total-count');
      });
    },
    showDetatil: function (id) {
      this.$router.go('/home/ticket/detail/' + id);
    }
  }
};