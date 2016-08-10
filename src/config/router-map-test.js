module.exports = {
  '/header': {
    component: require('../components/common/header'),
    auth: true
  },
  '/alerts': {
    component: require('../components/common/alerts'),
    auth: true
  },
  '/global-alert': {
    component: require('../components/common/global-alert'),
    auth: false
  },
  '/paging': {
    component: require('../components/common/paging'),
    auth: false
  },
  '/test-paging': {
    component: require('../components/test/test-paging'),
    auth: false
  },
  '/confirm': {
    component: require('../components/common/confirm'),
    auth: false
  },
  '/test-confirm': {
    component: require('../components/test/test-confirm'),
    auth: false
  }
};
