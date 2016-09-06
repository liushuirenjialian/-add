require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  props: ['isshow'],
  data: function () {
    return {
      ticketId: 0,
      flowList: [],
      user: ac_store.getUserInfo(),
      replyContent: '',
      tags: ''
    };
  },
  events: {
    loadFlowList: function (ticketId) {
      this.isshow = false;
      this.ticketId = ticketId;
      this.initData(ticketId);
    }
  },
  methods: {
    initData: function (ticketId) {
      var _this = this;
      var url = '/api/ticket-replies/find/' + ticketId;
      ac_http.request(_this, 'GET', url, function (res) {
        _this.flowList = res.data;
        if (_this.flowList.length > 0) {
          _this.isshow = true;
        }
      });
    },
    replyDo: function () {
      var url = '/api/tickets/replyDo';
      var param = {};
      param.ticketId = this.ticketId;
      param.content = this.replyContent;
      var method = 'PUT';
      var _this = this;
      ac_http.request(_this, method, url, param, function (res) {
        if (res.ret < 0) {
          _this.$dispatch('showMsg', res.data.message, 1); return;
        }
        // _this.status=ret.data.status;
        _this.initData(_this.ticketId);
        _this.$dispatch('showMsg', '保存成功');
      });
    }
  }
};
