/* global ac_ __DEV__ __PRERELEASE__ */

var Vue = require('vue');
var VueRouter = require('vue-router');
var configRouter = require('../config/router.js');
var filters = require('./filter');
var App = {};
var router = {};

// require('../assets/scss/main.scss');
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
ac_.assign = require('lodash/assign');
ac_.forEach = require('lodash/forEach');

window.ac_cookies = require('js-cookie');
window.ac_util = require('../lib/util');
window.ac_store = require('../lib/store');
window.ac_http = require('../lib/http');


window.ac_secret_things = {};

window.vueApp = Vue;

// 把所有的自定义过滤器加入到 vue filter 中
ac_.forEach(filters, function (func, key) {
  Vue.filter(key, func);
});

Vue.use(VueRouter);

var powerBox = require('../components/common/powerBox');

Vue.component(powerBox.name, powerBox);

Vue.use(require('vue-resource'));
Vue.http.options.root = '/root';
// Vue.http.options.emulateJSON = true;
// Vue.http.options.emulateHTTP = true;

App = Vue.extend({
  data: function () {
    return {
      noauth: true,
      pageFinishedLoading: false
    };
  },
  components: {
    globalalert: require('../components/common/global-alert')
  },
  created: function () {
    this.pageFinishedLoading = false;
  },
  ready: function () {
    this.pageFinishedLoading = true;
  },
  events: {
    mylord: function () {
      this.$broadcast.apply(this, arguments);
    },
    toggleNoauth: function () {
      this.noauth = false;
    },
    showMsg: function (msg, classname) {
      this.$broadcast('showGlobalalert', msg, classname);
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
   // document.querySelector('.loading').style.display = 'none';
};

// Date.prototype.DateAdd = function (strInterval, Number) {
//   var dtTmp = this;
//   switch (strInterval) {
//     case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number)); // 秒
//     case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number)); // 分
//     case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));  // 小时
//     case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));  // 天
//     case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number)); // 周
//     case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); // 季度
//     case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  // 月份
//     case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  // 年
//     default: break;
//   }
// };
