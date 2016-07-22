/* global ac_ __DEV__ __PRERELEASE__ */

var Vue = require('vue');
var VueRouter = require('vue-router');
var configRouter = require('../config/router.js');
var App = {};
var router = {};

require('../assets/scss/main.scss');
require('./style.scss');

// global object
window.ac_ = require('lodash/core');
ac_.isPlainObject = require('lodash/isPlainObject');
ac_.reduceRight = require('lodash/reduceRight');
ac_.dropRight = require('lodash/dropRight');
ac_.range = require('lodash/range');
ac_.findIndex = require('lodash/findIndex');
ac_.remove = require('lodash/remove');
ac_.join = require('lodash/join');

window.ac_cookies = require('js-cookie');
window.ac_util = require('../lib/util');
window.ac_store = require('../lib/store');
window.ac_http = require('../lib/http');

window.ac_secret_things = {};

Vue.use(VueRouter);

Vue.use(require('vue-resource'));
Vue.http.options.root = '/root';
Vue.http.options.emulateJSON = true;

App = Vue.extend({
  data: function () {
    return {
    };
  },
  components: {
    // topbar: require('../components/top/topbar')
    // alert: require('../components/common/alerts')
  },
  attached: function () {
    ac_util.stopLoading();
  },
  created: function () {
    // this.$emit('loadFunc');
  },
  events: {
    mylord: function () {
      this.$broadcast.apply(this, arguments);
    }
  }
});

router = new VueRouter({
  // history: true
});
configRouter(router);
router.start(App, '#app');

if (__DEV__) {
  window.router = router;
  Vue.config.debug = true;
}
if (__PRERELEASE__) {
  // something
}

window.onload = function () {
  document.querySelector('.loading').style.display = 'none';
};
