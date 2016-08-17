require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  props: ['isshow'],
  data: function () {
    return {
      ticketId: '',
      toUserName: '',
      fromContent: ''
    };
  },
  created: function () {
    // this.isshow = true;
  },
  events: {
    loadTicketId: function (ticketId) {
      this.ticketId = ticketId;
    }
  },
  methods: {
    close: function () {
      this.isshow = false;
    },
    save: function () {
      var url = '/api/flows/post';
      var param = {};
      param.ticketId = this.ticketId;
      param.toUserName = this.toUserName;
      param.fromContent = this.fromContent;
      var method = 'POST';
      var _this = this;
      ac_http.request(_this, method, url, param, function (res) {
        if (res.ret < 0) {
          _this.$dispatch('showMsg', res.data.message, 1); return;
        }
        _this.isshow = false; // 保存成功后关闭
        _this.$dispatch('flow-save', res.data);
      });
    }
  }
};
