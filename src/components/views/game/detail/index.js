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
        description: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    };
  },
  created: function () {
    this.$dispatch('showBreadcrumb', '游戏详情');
    this.initData();
  },
  methods: {
    initData: function () {
      var id = this.$route.params.id;
      if (id === 'add') {return;}
      var url = '/api/games/' + id;
      var _this = this;
      ac_http.request(_this, 'GET', url, function (res) {
        _this.detail = res.data;
      });
    },
    backList: function () {
      this.$router.go('/games/list');
    }
  }
};
