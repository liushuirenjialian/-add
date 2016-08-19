require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      dropdownStatus: false,
      actionId: 1,
      page: 0,
      size: 10,
      total: 0,
      pageList: [],
      confirmStatus: false,
      id: 0
    };
  },
  components: {
    paging: require('../../../common/paging'),
    confirm: require('../../../common/confirm')
  },
  created: function () {
    this.$dispatch('showBreadcrumb', '权限管理');
    this.bindList(0);
  },
  events: {
    pagindGo: function (num, size) {
      this.size = size;
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
      ac_http.request(_this, 'GET', url, param, function (ret) {
        _this.pageList = ret.data;
        _this.total = ret.headers('x-total-count');
      });
    },
    showDetatil: function (id) {
      this.$router.go('/home/game/detail/' + id);
    },
    deleteData: function (id) { // 确定删除后，把倒腾的数据传回来
      var url = '/api/categories/' + id;
      var _this = this;
      ac_http.request(_this, 'DELETE', url, function (res) {
        if (res.ret < 0) {
          _this.$dispatch('showMsg', res.data.message, 1); return;
        }
        _this.bindList(_this.page);  // 删除后刷新页面
      });
    },
    deleteDo: function (id) {
      this.confirmStatus = true; // 控制显示confirm
      this.id = id; // 传给子组件， 子组件再传回来
    }
  }
};
