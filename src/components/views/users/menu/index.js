require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      roleList: []
    };
  },
  created: function () {
    this.bindingRole();
  },
  methods: {
    bindingRole: function () {
      var _this = this;
      var url = '/api/author';
      ac_http.request(_this, 'GET', url, function (ret) {
        _this.roleList = ret.data;
      });
    },
    roleQuery: function (rolename) {
      console.log(rolename);
      // this.$dispatch('roleQuery', rolename);
      // '/home/users/list/' +
      var data = {
        name: 'users-list',
        params: { rolename: rolename }
      };
      this.$router.go(data);
    }
  }
};
