require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  props: ['isshow', 'status'],
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
    loadFlowList: function (ticketId, status) {
      this.isshow = false;
      this.ticketId = ticketId;
      this.initData(ticketId);
      this.status = status;
    }
  },
  methods: {
    bindThumbnials: function () {
      var len = this.flowList.length;
      for (var i = 0; i < len; i++) {
        lightGallery(document.getElementById('replysFile' + i), {
          thumbnail: true
        });
      }
    },
    initData: function (ticketId) {
      var _this = this;
      var url = '/api/ticket-replies/find/' + ticketId;
      ac_http.request(_this, 'GET', url, function (res) {
        _this.flowList = res.data;
        if (_this.flowList.length > 0) {
          _this.isshow = true;
          var inter = setInterval(function () {
            _this.bindThumbnials();
            clearInterval(inter);
          }, 500);
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
        _this.replyContent = '';
        _this.initData(_this.ticketId);
        _this.$dispatch('showMsg', '保存成功');
        _this.$dispatch('replyOK', res.data);
      });
    }
  }
};
