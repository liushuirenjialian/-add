require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  route: {
    data: function (transition) {
      var id = transition.to.params.id;
      this.$dispatch('showBreadcrumb', '工单编辑');
      this.initData(id);
    }
  },
  data: function () {
    return {
      actionId: 1,
      showFlow: false,
      user: ac_store.getUserInfo(),
      detail: {
        id: '',
        serialNumber: 'serialNumber',
        gameId: '23',
        gameName: 'gameName',
        gameVersion: 'gameVersion',
        gameRegion: 'gameRegion',
        roleName: 'roleName',
        majorCategory: 21,
        createdAt: new Date(),
        platform: 'iOS',
        channelName: 'channelName',
        hoolaiPassportId: '123',
        customerMobile: '18610166750',
        status: '0',
        firstFlowUserId: '123',
        firstFlowUserName: ac_store.getUserInfo().login,
        updatedAt: new Date(),
        content: 'content',
        replyContent: '',
        tags: '',
        remark: ''
      }
    };
  },
  methods: {
    initData: function (id) {
      if (id === 'add') { return; }
      var _this = this;
      var url = '/api/tickets/' + id;
      ac_http.request(_this, 'GET', url, function (res) {
        res.data.id = '';
        _this.detail = res.data;
      });
    },
    save: function () {
      var param = {};
      ac_.forEach(this.detail, function (val, key) {
        param[key] = val;
      });
      param.firstFlowUserName = this.user.login;
      var url = '/api/tickets';
      var method = 'POST';
      if (param.id > 0) {
        method = 'PUT';
      }
      var _this = this;
      ac_http.request(_this, method, url, param, function (res) {
        if (res.ret < 0) {
          _this.$dispatch('showMsg', res.data.message, 1); return;
        }
        _this.$dispatch('showMsg', '保存成功！');
        _this.detail.id = res.data.id;
        _this.$router.go({
          name: 'ticket-detail',
          params: { id: res.data.id }
        });
      });
    }
  }
};
