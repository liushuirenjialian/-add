/* global ac_util ac_ ac_cookies */
// nodejs的moule.exports vuejs 的路由

// node 的代码使用require加载模块，在模块中使用exports或者module.exports导出接口，require、
// module.exports都是node的全局对象


// 需求：实现公用的ui组件开发，在不同的页面通过广播 使用通用组建开发var exprots=
var routerMap = require('./router-map');
var routerMapTest = require('./router-map-test');
module.exports = function (router) {
  // Define a router
<<<<<<< HEAD
// The main method to define route mappings for the router(routeMap)
// adding vue-router to the mix ,all we need to do is map our components to the routes and let  vue-router knoe to render them,
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
        '/profile': {
          name: 'index',
          component: require('../components/views/profile'),
          auth: true
        },
        '/changepassword':{
          component:require('../components/views/changepassword'),
          auth: true
        },
        '/ticket': {
          name: 'ticket',
          component: function (resolve) {
            // ac_util.startLoading();
            require(['../components/views/ticket'], resolve);
          },
          auth: true,
          subRoutes: {
            '/list': {
              name: 'ticket-list',
              component: require('../components/views/ticket/list'),
              auth: true
            },
            '/detail': {
              name: 'ticket-detail',
              component: require('../components/views/ticket/detail'),
              auth: true
            }
          }
        }   
      }
    },
    '/header': {
      component: require('../components/common/header'),
      auth: true
    },
    '/alerts': {
      component: require('../components/common/alerts'),
      auth: true
    },
    '/register': {
      component: require('../components/views/register'),
      auth: false
    },
   

    //    '/reg':{
    //   component: require('../components/views/reg'),
    //   auth:false
    // },
  });
=======
  // The main method to define route mappings for the router(routeMap)
  // adding vue-router to the mix ,all we need to do is map our components to the routes and let  vue-router knoe to render them,
  var rmap = ac_.assign(routerMap, routerMapTest);
  router.map(rmap);
>>>>>>> aa769cc177f356a081b946c509f742f84a320c62

  router.beforeEach(function (transition) {
    var userInfo = ac_store.getUserInfo();
    var hasLogin = true;
    if (userInfo === null || !userInfo) {
      hasLogin = false;
    }
    function doNext() {
      // var unauthenticated = window.authenticated === 'NO';
      if (hasLogin) {
          // transition.redirect('/reg');
      }
      // 权限问题
      if (transition.to.auth && !hasLogin) {
        transition.redirect('/login');
      } else {
        if ((transition.to.path === '/login' || transition.to.path === '/') && userInfo) {
          // 取消当前切换并重定向到另一个路由
          transition.redirect('/home');
        } else {
          // 调用此函数处理切换过程的下一步
          transition.next();
        }
      }
    }
    doNext();
  });
};
