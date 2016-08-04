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
    this.getAll();
  },
  methods: {
    teggleDropdown: function () {
      this.dropdownStatus = !this.dropdownStatus;
    },
    getAll: function () {
      var url = '/api/tickets';
      var _this = this;
      ac_http.request(_this, 'GET', url,function (ret) {
          for (var i = 0; i < ret.data.length; i++) {
          var obj = {};
          obj.id = ret.data[i].id;
          obj.channelName = ret.data[i].channelName;
          obj.gameRegion = ret.data[i].gameRegion;
          obj.tags = ret.data[i].tags;
          obj.content = ret.data[i].content;
          _this.roleList.push(obj);
        }
      });
    }
  }
};
