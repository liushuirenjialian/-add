require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  props: ['isshow'],
  data: function () {
    return {
      ticketId: '',
      toUserName: '',
      fromContent: '',
      roleOptions: [],
      personOptions: [],
      rolevalue: '',
      person: '',
      role: []
    };
  },
  components: {
    vselect: require('../../../common/vSelect')
  },
  watch: {
    rolevalue: function () {
      this.getPerson();
    }
  },
  created: function () {
    // this.isshow = true;
    this.getRole();
  },
  events: {
    loadTicketId: function (ticketId) {
      this.ticketId = ticketId;
    }
  },
  methods: {
    getRole: function () {
      var url = '/api/author';
      var method = 'GET';
      var _this = this;
      ac_http.request(_this, method, url, function (res) {
        if (res.ret < 0) {
          _this.dispatch('showMsg', res.data.message, 1);
          return;
        }
        _this.rolevalue = res.data[0].text;
        res.data.forEach(function (item) {
          _this.roleOptions.push(item.text);
          _this.role[item.text] = item.name;
        });
      });
    },
    getPerson: function () {
      var _this = this;
      _this.person = '';
      _this.personOptions = [];
      if (_this.role[_this.rolevalue] !== undefined) {
        var url = '/api/users/search/' + _this.role[_this.rolevalue];
        var method = 'GET';
        ac_http.request(_this, method, url, function (res) {
          if (res.ret < 0) {
            _this.dispatch('showMsg', res.data.message, 1);
            return;
          }
          _this.person = res.data[0].login;
          res.data.forEach(function (item) {
            _this.personOptions.push(item.login);
          });
        });
      }
    },
    close: function () {
      this.isshow = false;
    },
    save: function () {
      var url = '/api/flows/post';
      var param = {};
      param.ticketId = this.ticketId;
      param.toUserName = this.person;
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
