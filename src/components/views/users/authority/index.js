var acIndexOf = require('lodash/indexOf');
var acRemove = require('lodash/remove');
require('./style.scss');
module.exports = {
  template: require('./template.html'),
  replace: true,
  props: ['authorities'],
  data: function () {
    return {
      roleList: []
    };
  },
  watch: {
    authorities: function () {
      this.refreshRoleList();
    }
  },
  events: {
    loadAuthorities: function (authorities) {
      this.authorities = authorities;
    }
  },
  created: function () {
    if (!this.authorities) {
      this.authorities = [];
    }
    this.initData();
  },
  methods: {
    initData: function () {
      var _this = this;
      var url = '/api/author';
      ac_http.request(_this, 'GET', url, function (ret) {
        ret.data.forEach(function (item) {
          item.checked = false;
        });
        _this.roleList = ret.data;
        _this.refreshRoleList();
      });
    },
    refreshRoleList: function () {
      var _this = this;
      if (!_this.authorities) {return;}
      _this.roleList.forEach(function (item) {
        item.checked = false;
        _this.authorities.forEach(function (temp) {
          if (temp === item.name) {
            item.checked = true;
          }
        });
      });
    },
    addRole: function (rolename) {
      if (acIndexOf(this.authorities, rolename) < 0) {
        this.authorities.push(rolename);
      }
    },
    removeRole: function (rolename) {
      if (acIndexOf(this.authorities, rolename) >= 0) {
        this.authorities = acRemove(this.authorities, function (n) {
          return n !== rolename;
        });
      }
    }
  }
};
