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
    this.bingingtickets();
  },
  methods: {
    bindingRole: function() {
      var _this=this;
          // _this.roleList=list; see the callback data of request,for ,
      var url='/api/author';
      ac_http.request(_this, 'GET', url, function (ret) {
      console.log(ret);
        for (var i = 0; i < ret.data.length; i++) {
        var names = {};
        names.name = ret.data[i].name;
        names.text = ret.data[i].text;
        _this.roleList.push(names);
      }
      });
    },
    bingingtickets: function(){

    }

  }
};
