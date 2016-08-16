require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  route: {
    data: function (transition) {
      var status = transition.to.params.status;
      this.status = status;
      this.$dispatch('showBreadcrumb', '工单管理');
      this.bindList(0);
    }
  },
  data: function () {
    return {
      actionId: 1,
      status: '',
      roleList: [],
      page: 0,
      size: 10,
      total: 0
    };
  },
  components: {
    paging: require('../../../common/paging')
  },
  events: {
    pagindGo: function (num, size) {
      this.size = size;
      this.bindList(num);
    }
  },
  methods: {
    teggleDropdown: function () {
      this.dropdownStatus = !this.dropdownStatus;
    },
    showDetatil: function (id) {
      this.$router.go('/home/ticket/detail/' + id);
    },
    bindList: function (num) {
      var url = '/api/tickets';
      var param = {};
      param.page = num;
      param.size = this.size;
      this.page = num;
      var _this = this;
      if (this.status !== 'all') {
        url = '/api/tickets/search/' + this.status;
      }
      ac_http.request(_this, 'GET', url, param, function (ret) {
        _this.total = ret.headers('x-total-count');
        _this.roleList = ret.data;
      });
    }
  }
};
