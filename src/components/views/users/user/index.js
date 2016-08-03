require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      actionId: 1,
      userList: [],
      total: 0,
      page: 0,
      size: 5
    };
  },
  components: {
    menu: require('../menu'),
    paging: require('../../../common/paging')
  },
  created: function () {
    this.$dispatch('showBreadcrumb', '用户管理');
    this.bingingtickets(0);
  },
  events: {
    pagindGo: function (num) {
      this.bingingtickets(num);
    }
  },
  methods: {
    bingingtickets: function (num) {
      // debugger
      var url = '/api/users';
      var _this = this;
      var param = {};
      param.page = num;
      param.size = this.size;
      this.page = num;
      ac_http.request(_this, 'GET', url, param, function (ret) {
        _this.total = ret.headers('x-total-count');
        _this.userList = [];
        for (var i = 0; i < ret.data.length; i++) {
          var users = {};
          users.login = ret.data[i].login;
          users.email = ret.data[i].email;
          users.createdDate = ret.data[i].createdDate;
          users.authorities = ret.data[i].authorities;
          users.activated = ret.data[i].activated;
          if(users.activated === true){
            users.activated = '已激活';
          }
          else
          {
            users.activated = '未激活';
          }
          _this.userList.push(users) 
        }
      });
    } 
  }
};
