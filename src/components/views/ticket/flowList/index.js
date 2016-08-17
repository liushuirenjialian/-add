require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  props: ['isshow'],
  data: function () {
    return {
      ticketId: '',
      flowList: [],
      user: ac_store.getUserInfo()
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
      var url = '/api/flows/find/' + ticketId;
      ac_http.request(_this, 'GET', url, function (res) {
        res.data.forEach(function (item) {
          item.newContent = '';
        });
        _this.flowList = res.data;
        if (_this.flowList.length > 0) {
          _this.isshow = true;
        }
      });
    },
    replyDo: function (flow) {
      var url = '/api/flows/reply';
      var param = {};
      param.id = flow.id;
      param.content = flow.newContent;
      var method = 'PUT';
      var _this = this;
      ac_http.request(_this, method, url, param, function (res) {
        if (res.ret < 0) {
          _this.$dispatch('showMsg', res.data.message, 1); return;
        }
        flow.content = res.data.content;
        flow.reliedAt = res.data.reliedAt;
        _this.$dispatch('showMsg', '保存成功');
      });
    }
  }
};
