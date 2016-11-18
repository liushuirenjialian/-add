require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      user: ac_store.getUserInfo(),
      message: '',
      index: '',
      confirmStatus: false,
      reloadState: false
    };
  },
  created: function () {
    this.$dispatch('showBreadcrumb', '索引重建');
  },
  components: {
    confirm: require('../../../common/confirm')
  },
  methods: {
    reload: function (index) {
      this.confirmStatus = true; // 控制显示confirm
      this.index = index;
    },
    reloadDo: function () { // 确定删除后，把倒腾的数据传回来
      if (this.reloadState) { return; }
      this.reloadState = true;
      this.message = '正在重构' + this.index + '索引';
      var _this = this;
      var url = '/api/es/reload/' + this.index;
      ac_http.request(_this, 'GET', url, function (ret) {
        _this.reloadState = false;
        if (ret.ret !== 1) {
          _this.message = ret.message; return;
        }
        _this.message = '重构完成';
      });
    }
  }
};
