/* global ac_util ac_ ac_cookies */

module.exports = function (router) {
  router.map({
    '': {
      component: require('../components/top/login'),
      auth: false
    },
    '/login': {
      component: require('../components/top/login'),
      auth: false
    },
    '/home': {
      component: require('../components/top/home'),
      auth: true
    }
  });

  router.beforeEach(function (transition) {
    var interVal;

    function doNext() {
      var unauthenticated = window.authenticated === 'NO';
      if (transition.to.auth && unauthenticated) {
        transition.redirect('/login');
      } else {
        if ((transition.to.path === '/login' || transition.to.path === '/' || transition.to.path === '/register') && !unauthenticated) {
          transition.redirect('/home');
        } else {
          transition.next();
        }
      }
    }
    if (window.authenticated) {
      doNext();
    } else {
      interVal = setInterval(function () {
        if (window.authenticated) {
          clearInterval(interVal);
          doNext();
        }
      }, 100);
    }
  });
};
