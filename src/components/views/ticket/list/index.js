require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      actionId: 1,
      roleList: [],
      page: 0,
      size: 11,
      total: 0
    };
  },
  components: {
    paging: require('../../../common/paging')
  },
  created: function () {
    this.$dispatch('showBreadcrumb', '分类管理');
    this.getAll(0);
  },
  events: {
    pagindGo: function (num) {
      this.getAll(num);
    }
  },
  methods: {
    teggleDropdown: function () {
      this.dropdownStatus = !this.dropdownStatus;
    },
    showDetatil: function (id) {
      this.$router.go('/home/ticket/detail/' + id);
    },
    getAll: function (num) {
      var url = '/api/tickets';
      var param = {};
      param.page = num;
      param.size = this.size;
      this.page = num;
      var _this = this;
      ac_http.request(_this, 'GET', url, param, function (ret) {
          _this.total = ret.headers('x-total-count');
          _this.roleList = ret.data;
        //   for (var i = 0; i < ret.data.length; i++) {
        //   var obj = {};
        //   obj.id = ret.data[i].id;
        //   obj.channelName = ret.data[i].channelName;
        //   obj.gameRegion = ret.data[i].gameRegion;
        //   obj.tags = ret.data[i].tags;
        //   obj.content = ret.data[i].content;
        //   _this.roleList.push(obj);
        // }
      });
    }
  }
};
