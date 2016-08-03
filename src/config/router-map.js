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
          '/detail': {
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
          '/authority': {
            name: 'users-authority',
            component: require('../components/views/users/authority'),
            auth: true
          },
          '/game': {
            name: 'users-game',
            component: require('../components/views/users/game'),
            auth: true
          },
          '/user': {
            name: 'users-game',
            component: require('../components/views/users/user'),
            auth: true
          }
        }
      }
    }
  }
};
