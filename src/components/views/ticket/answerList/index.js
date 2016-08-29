require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  props: ['isshow'],
  data: function () {
    return {
      ticketId: '',
      flowList: [],
      user: ac_store.getUserInfo(),
      replyContent:'',
      tags:''
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
      // /api/ticket-replies/find/
      debugger
      var url = '/api/ticket-replies/find/' + ticketId;
      ac_http.request(_this, 'GET', url, function (res) {
        // res.data.forEach(function (item) {
        //   item.newContent = '';
        // });
        _this.flowList = res.data;
      });
    },

    replyDo: function (flow) {
      var url = '/api/tickets/replyDo';
      var param = {};
      param.id = this.ticketId;
      param.content = this.replyContent;
      var method = 'PUT';
      var _this = this;
      debugger
      ac_http.request(_this, method, url, param, function (ret) {
        if (ret.ret < 0) {
          _this.$dispatch('showMsg', ret.data.message, 1); return;
        }
        _this.status=ret.data.message;
        _this.$dispatch('showMsg', '保存成功');
      });
    }
  }
};
