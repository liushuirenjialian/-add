/* global ac_util ac_ ac_cookies */
// nodejs的moule.exports vuejs 的路由
// node 的代码使用require加载模块，在模块中使用exports或者module.exports导出接口，require、
// module.exports都是node的全局对象
// 需求：实现公用的ui组件开发，在不同的页面通过广播 使用通用组建开发var exprots=
var routerMap = require('./router-map');
var routerMapTest = require('./router-map-test');
module.exports = function (router) {
  // Define a router

  // The main method to define route mappings for the router(routeMap)
  // adding vue-router to the mix ,all we need to do is map our components to the routes and let  vue-router knoe to render them,
  var rmap = ac_.assign(routerMap, routerMapTest);
  router.map(rmap);


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
