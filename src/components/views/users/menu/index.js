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
  components: {
    userList: require('../user'),
    paging: require('../../../common/paging')
  },
  created: function () {
    this.bindingRole ();
    this.roleDetail ();
  },
  methods: {
    bindingRole: function() {
      var _this=this;
      var url='/api/author';
      ac_http.request(_this, 'GET', url, function (ret) {
        for (var i = 0; i < ret.data.length; i++) {
          var names = {};
          names.name = ret.data[i].name;
          names.text = ret.data[i].text;
          _this.roleList.push(names);
        _this.roleDetail(ret.data[i].text);
        }   
      });
    },
    roleDetail: function (names,e) {
      var _this = this;
      console.log(names);
      // names是key
      // _this.bingingtickets(names);

    }
  }
};
