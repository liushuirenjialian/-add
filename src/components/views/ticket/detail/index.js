require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  route: {
    data: function (transition) {
      var id = transition.to.params.id;
      this.$dispatch('showBreadcrumb', '工单详情');
      this.initData(id);
    }
  },
  data: function () {
    return {
      actionId: 1,
      showFlow: false,
      detail: {
        id: 0,
        gameRegion: '',
        channelName: '',
        content: '',
        tags: '',
        updatedAt: '',
        majorCategoryInfo: {
          name: ''
        },
        replyContent: ''
      }
    };
  },
  components: {
    flow: require('../flow'),
    flowlist: require('../flowList')
  },
  methods: {
    initData: function (id) {
      var _this = this;
      var url = '/api/tickets/' + id;
      ac_http.request(_this, 'GET', url, function (res) {
        var item = res.data;
        if (!item.majorCategoryInfo) {
          item.majorCategoryInfo = {};
          item.majorCategoryInfo.name = '';
        }
        _this.detail = item;
        _this.$broadcast('loadTicketId', id);
        _this.$broadcast('loadFlowList', id);
      });
    },
    backList: function () {
      this.$router.go('/ticket/detail');
    },
    showFlowDo: function () {
      this.showFlow = true;
    },
    refreshFlow: function () {
      this.$broadcast('loadFlowList', this.detail.id);
    },
    replyDo: function () {
      var url = '/api/tickets/reply';
      var param = {};
      param.id = this.detail.id;
      param.replyContent = this.detail.replyContent;
      param.tags = this.detail.tags;
      var method = 'PUT';
      var _this = this;
      ac_http.request(_this, method, url, param, function (res) {
        if (res.ret < 0) {
          _this.$dispatch('showMsg', res.data.message, 1); return;
        }
        _this.detail.status = res.data.status;
        _this.$dispatch('showMsg', '保存成功');
      });
    },
    prve: function () {
      var url = '/api/tickets/' + this.detail.id + '/prve';
      var _this = this;
      ac_http.request(_this, 'GET', url, function (res) {
        if (res.ret < 0) {
          _this.$dispatch('showMsg', '已经最后一个了', 2); return;
        }
        _this.$router.go('/ticket/detail/' + res.data.id);
      });
    },
    next: function () {
      var url = '/api/tickets/' + this.detail.id + '/next';
      var _this = this;
      ac_http.request(_this, 'GET', url, function (res) {
        if (res.ret < 0) {
          _this.$dispatch('showMsg', '已经最后一个了', 2); return;
        }
        _this.$router.go('/ticket/detail/' + res.data.id);
      });
    },
    nextUntreated: function () {
      var url = '/api/tickets/' + this.detail.id + '/nextUntreated';
      var _this = this;
      ac_http.request(_this, 'GET', url, function (res) {
        if (res.ret < 0) {
          _this.$dispatch('showMsg', '已经最后一个了', 2); return;
        }
        _this.$router.go('/ticket/detail/' + res.data.id);
      });
    }
  }
};
