require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  route: {
    data: function (transition) {
      var status = transition.to.params.status;
      this.status = status;
      this.$dispatch('showBreadcrumb', '我的消息');
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
      total: 0,
      myGames: []
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
      this.$router.go('/ticket/detail/' + id);
    },
    bindList: function (num) {
      var url = '/api/messages';
      var param = {};
      param.page = num;
      param.size = this.size;
      this.page = num;
      var _this = this;
      if (this.status === 'all') {
        this.status = -1;
      }
      param.sort = 'id,desc';
      param.status = this.status;
      url = '/api/messages/queryList';
      ac_http.request(_this, 'GET', url, param, function (res) {
        _this.total = res.headers('x-total-count');
        _this.roleList = res.data;
      });
    },
    readMessage: function (item) {
      var url = '/api/messages/read/' + item.id;
      var _this = this;
      ac_http.request(_this, 'PUT', url, function () {
        item.status = 1;
      });
    }
  }
};
