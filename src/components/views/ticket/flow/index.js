require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  props: ['isshow'],
  data: function () {
    return {
      toUserName: '',
      formContent: ''
    };
  },
  created: function () {
    // this.isshow = true;
  },
  methods: {
    close: function () {
      this.isshow = false;
    },
    save: function () {
      var url = '/api/flow';
      var param = {};
      param.ticketid = this.ticketid;
      param.toUserName = this.toUserName;
      param.formContent = this.formContent;
      var method = 'POST';
      var _this = this;
      ac_http.request(_this, method, url, param, function (res) {
        if (res.ret < 0) {
          _this.$dispatch('showMsg', res.data.message, 1); return;
        }
        _this.detail.id = res.data.id;
        _this.$dispatch('showMsg', '保存成功');
      });
    }
  }
};
