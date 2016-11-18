module.exports = {
  '/login': {
    component: require('../components/views/login'),
    auth: false
  },
  '/register': {
    component: require('../components/views/register'),
    auth: false
  },
  '': {
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
        name: 'profile',
        component: require('../components/views/profile'),
        auth: true
      },
      '/changepassword': {
        name: 'changepassword',
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
          '/list/:status': {
            name: 'ticket-list',
            component: require('../components/views/ticket/list'),
            auth: true
          },
          '/detail/:id': {
            name: 'ticket-detail',
            component: require('../components/views/ticket/detail'),
            auth: true
          },
          '/edit/:id': {
            name: 'ticket-edit',
            component: require('../components/views/ticket/edit'),
            auth: true
          }
        }
      },
      '/faq': {
        name: 'faq',
        component: function (resolve) {
          require(['../components/views/faq'], resolve);
        },
        auth: true,
        subRoutes: {
          '/list/:status': {
            name: 'faq-list',
            component: require('../components/views/faq/list'),
            auth: true
          },
          '/edit/:id': {
            name: 'faq-edit',
            component: require('../components/views/faq/edit'),
            auth: true
          }
        }
      },
      '/faqImport': {
        name: 'faqimport',
        component: require('../components/views/faq/faqimport'),
        auth: true
      },
      '/userSuggest': {
        name: 'userSuggest',
        component: function (resolve) {
          require(['../components/views/userSuggest'], resolve);
        },
        auth: true,
        subRoutes: {
          '/list/:status': {
            name: 'userSuggest-list',
            component: require('../components/views/userSuggest/list'),
            auth: true
          },
          '/edit/:id': {
            name: 'userSuggest-edit',
            component: require('../components/views/userSuggest/edit'),
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
      '/categoryFaq': {
        name: 'categoryFaq',
        component: function (resolve) {
          require(['../components/views/categoryFaq'], resolve);
        },
        auth: true,
        subRoutes: {
          '/list': {
            name: 'categoryFaq-list',
            component: require('../components/views/categoryFaq/list'),
            auth: true
          },
          '/detail/:id': {
            name: 'categoryFaq-detail',
            component: require('../components/views/categoryFaq/detail'),
            auth: true
          }
        }
      },
      '/system/esreload': {
        component: require('../components/views/system/esreload'),
        auth: false
      },
      '/game': {
        name: 'category',
        component: function (resolve) {
          require(['../components/views/game'], resolve);
        },
        auth: true,
        subRoutes: {
          '/list': {
            name: 'game-list',
            component: require('../components/views/game/list'),
            auth: true
          },
          '/detail/:id': {
            name: 'game-detail',
            component: require('../components/views/game/detail'),
            auth: true
          },
          '/edit/:id': {
            name: 'game-edit',
            component: require('../components/views/game/edit'),
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
      },
      '/message': {
        name: 'message',
        component: function (resolve) {
          require(['../components/views/message'], resolve);
        },
        auth: true,
        subRoutes: {
          '/list/:status': {
            name: 'message-list',
            component: require('../components/views/message/list'),
            auth: true
          }
        }
      }
    }
  }
};
