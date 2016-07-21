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
      component: require('../components/views/home'),
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
