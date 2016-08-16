require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      actionId: 1,
      roleList: []
    };
  },
  created: function () {
    this.bindingRole();
  },
  methods: {
    bindingRole: function () {
      var _this = this;
      var url = '/api/ticketStatus';
      ac_http.request(_this, 'GET', url, function (ret) {
        ret.data.forEach(function (item) {
          for (key in item) {
            if ({}.hasOwnProperty.call(item, key)) {
              var data = {};
              data.key = key;
              data.val = item[key];
              _this.roleList.push(data);
            }
          }
        });
      });
    }
  }
};
