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
    this.$dispatch('showBreadcrumb', '游戏编辑');
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
      this.$router.go('/game/list');
    },
    save: function () {
      var url = '/api/games';
      var param = {};
      ac_.forEach(this.detail, function (val, key) {
        param[key] = val;
      });
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
        _this.$router.go({ name: 'game-detail', params: { id: res.data.id } });
      });
    }
  }
};
