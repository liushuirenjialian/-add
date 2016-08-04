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
    this.bindingRole ();
  },
  methods: {
    bindingRole: function() {
      var _this=this;
      var url='/api/ticketStatus';
      ac_http.request(_this, 'GET', url, function (ret) {
        for (var i = 0; i < ret.data.length; i++) {
          var names = {};
          names.name = ret.data[i].name;
          names.text = ret.data[i].text;
          _this.roleList.push(names);
        }
      });
    }
  }
};
