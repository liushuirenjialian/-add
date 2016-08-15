module.exports = {
  '': {
    component: require('../components/views/login'),
    auth: false
  },
  '/login': {
    component: require('../components/views/login'),
    auth: false
  },
  '/register': {
    component: require('../components/views/register'),
    auth: false
  },
  '/home': {
    auth: true,
    name: 'home',
    component: function (resolve) {
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
      '/changepassword': {
        name: 'index',
        component: require('../components/views/changepassword'),
        auth: true
      },
      '/ticket': {
        name: 'ticket',
        component: function (resolve) {
          require(['../components/views/ticket'], resolve);
        },
        auth: true,
        subRoutes: {
          '/list': {
            name: 'ticket-list',
            component: require('../components/views/ticket/list'),
            auth: true
          },
          '/detail/:id': {
            name: 'ticket-detail',
            component: require('../components/views/ticket/detail'),
            auth: true
          }
        }
      },
      '/category': {
        name: 'category',
        component: function (resolve) {
          require(['../components/views/category'], resolve);
        },
        auth: true,
        subRoutes: {
          '/list': {
            name: 'category-list',
            component: require('../components/views/category/list'),
            auth: true
          },
          '/detail/:id': {
            name: 'category-detail',
            component: require('../components/views/category/detail'),
            auth: true
          }
        }
      },
      '/users': {
        name: 'users',
        component: function (agr) {
          require(['../components/views/users'], agr);
        },
        auth: true,
        subRoutes: {
          '/list/:rolename': {
            name: 'users-list',
            component: require('../components/views/users/list'),
            auth: true
          },
          '/detail/:login': {
            name: 'users-detail',
            component: require('../components/views/users/detail'),
            auth: true
          }
        }
      }
    }
  }
};
