// var vSelect = require('vue-select');
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  props: ['isshow'],
  data: function () {
    return {
      ticketId: '',
      majorCategorys: [],
      majorCategory: '',
      tags: '',
      detail: {}
    };
  },
  events: {
    loadEditDetail: function (ticket) {
      this.detail = ticket;
      // this.initData(ticketId);
    }
  },
  components: {
    vselect: require('../../../common/vSelect')
  },
  created: function () {
    // this.isshow = true;
    this.getMajorCategorys();
  },
  methods: {
    // initData: function (id) {
    //   var _this = this;
    //   var url = '/api/tickets/' + id;
    //   ac_http.request(_this, 'GET', url, function (res) {
    //     var item = res.data;
    //     if (!item.majorCategoryInfo) {
    //       item.majorCategoryInfo = {};
    //       item.majorCategoryInfo.name = '';
    //     }
    //     _this.detail = item;
    //   });
    // },
    close: function () {
      this.isshow = false;
    },
    consoleCallback: function (val) {
      this.majorCategory = val.value;
    },
    getMajorCategorys: function () {
      var _this = this;
      var url = '/api/categories';
      var param = {};
      param.size = 10000;
      ac_http.request(_this, 'GET', url, param, function (res) {
        _this.majorCategorys = res.data;
        _this.majorCategorys = [];
        res.data.forEach(function (item) {
          var categories = {};
          categories.value = item.id;
          categories.text = item.name;
          _this.majorCategorys.push(categories);
        });
      });
    },
    save: function () {
      var param = {};
      ac_.forEach(this.detail, function (val, key) {
        param[key] = val;
      });
      var url = '/api/tickets';
      var _this = this;
      ac_http.request(_this, 'PUT', url, param, function (res) {
        if (res.ret < 0) {
          _this.$dispatch('showMsg', res.data.message, 1); return;
        }
        _this.$dispatch('showMsg', '保存成功！');
        _this.close();
        _this.$dispatch('edit-save', res.data);
      });
    }
  }
};
