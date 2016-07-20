/* global ac_util ac_ ac_cookies */

var handleXHR = require('../../../lib/handleXHR.js');
require('./style.scss');

module.exports = {
  template: require('./template.html'),
  replace: true,
  data: function () {
    return {
      authenticated: false,
      username: '',
      funcBlocks: [],
      currentUserInfo: {}
    };
  },
  attached: function () {
    ac_util.stopLoading();
  },
  created: function () {
    this.$emit('loadFunc');
  },
  events: {
    loadFunc: function (func) {
      this.$http({
        url: '/api/center/getPower',
        method: 'GET'
      }).then(function (res) {
        handleXHR.call(this, { res: res, type: 'quiet' }, function (ctx, _res) {
          ctx.authenticated = true;
          window.authenticated = 'YES';
          ctx.handleFuncBlocks(_res.data.user.isadmin);
          ctx.username = _res.data.user.username;
          ctx.currentUserInfo = _res.data.user;
          window.ac_secret_things.powerData = _res.data.data;
          window.ac_secret_things.uid = _res.data.user.id;

          if (ac_.isFunction(func)) func(ctx);
        }, function (ctx) {
          window.authenticated = 'NO';
          ctx.authenticated = false;
        });
      }, function (res) {
        handleXHR.call(this, { res: res }, null, function (ctx) {
          window.authenticated = 'NO';
          ctx.authenticated = false;
        });
      });
    },
    getUserInfo: function (cal) {
      cal(this.currentUserInfo);
    }
  },
  methods: {
    handleFuncBlocks: function (isadmin) {
      if (ac_.isNumber(isadmin) && isadmin === 2) {
        this.funcBlocks = [{
          name: '游戏管理',
          url: {
            path: '/game-home'
          }
        }, {
          name: '权限管理',
          url: {
            path: '/privilege-manage'
          }
        }, {
          name: '用户管理',
          url: {
            path: '/user-manage'
          }
        }];
      }
      if (ac_.isNumber(isadmin) && isadmin === 1) {
        this.funcBlocks = [{
          name: '游戏管理',
          url: {
            path: '/game-home'
          }
        }, {
          name: '用户管理',
          url: {
            path: '/user-manage'
          }
        }];
      }
      if (ac_.isNumber(isadmin) && isadmin === 0) {
        this.funcBlocks = [{
          name: '游戏管理',
          url: {
            path: '/game-home'
          }
        }];
      }
    },
    logout: function () {
      this.$http({
        url: '/api/user/logout',
        method: 'GET'
      }).then(function (res) {
        handleXHR.call(this, { res: res, type: 'quiet' }, function (ctx) {
          ctx.authenticated = false;
          ctx.$router.go('/login');
          ctx.funcBlocks = [];
          window.authenticated = 'NO';
          ac_cookies.remove('hoolai_access_custom');
        });
      }, function (res) {
        handleXHR.call(this, { res: res, type: 'alert' });
      });
    }
  }
};
