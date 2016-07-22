/* global ac_util ac_ ac_cookies */

module.exports = function (router) {
  router.map({
    '': {
      component: require('../components/views/login'),
      auth: false
    },
    '/login': {
      component: require('../components/views/login'),
      auth: false
    },
    '/home': {
      auth: true,
      name: 'home',
      component: function (resolve) {
        ac_util.startLoading();
        require(['../components/views/home'], resolve);
      },
      subRoutes: {
        '/index': {
          name: 'index',
          component: require('../components/views/index'),
          auth: true
        },
        '/ticket': {
          name: 'ticket',
          component: require('../components/views/ticket'),
          auth: true
        }
      }
    },
    '/header': {
      component: require('../components/common/header'),
      auth: true
    }
  });

  router.beforeEach(function (transition) {
    var userInfo = ac_store.getUserInfo();
    var hasLogin = true;
    if (userInfo === null || !userInfo) {
      hasLogin = false;
    }
    function doNext() {
      // var unauthenticated = window.authenticated === 'NO';
      if (transition.to.auth && !hasLogin) {
        transition.redirect('/login');
      } else {
        if ((transition.to.path === '/login' || transition.to.path === '/' || transition.to.path === '/register') && userInfo) {
          transition.redirect('/home');
        } else {
          transition.next();
        }
      }
    }
    doNext();
  });
};
