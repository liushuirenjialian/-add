/* global ac_util ac_ ac_cookies */

/**
 *
 * handleXHR.call(this, [options, resolve, reject])
 * handle returns response from 'vue-resource' according differents type.
 *
 * @param {Object} options
 *   options.res {Object}
 *   options.type {String} options: 'alert', 'qiet', null
 *
 * @param {Function} resolve
 * @param {Function} reject
 *
 * */

function checker(/* validators */) {
  var validators = ac_.toArray(arguments);

  return function (obj) {
    return ac_.reduce(validators, function (errs, check) {
      if (check(obj)) {
        return errs;
      }
      return ac_.chain(errs).push(check.message).value();
    }, []);
  };
}
function validator(message, fun) {
  var f = function () {
    return fun.apply(fun, arguments);
  };
  f.message = message;
  return f;
}
function hasKeys() {
  var keys = ac_.toArray(arguments);

  var fun = function (obj) {
    return ac_.every(keys, function (k) {
      return ac_.has(obj, k);
    });
  };
  fun.message = ac_.concat(['Must have values for keys:'], keys).join(' ');
  return fun;
}
function aMap(obj) {
  return ac_.isPlainObject(obj);
}

module.exports = function (_options, resolve, reject) {
  var _this = this;
  var ops = _options || {};
  var checkRes = checker(validator('handleXHR options must be a map', aMap), hasKeys('res'));
  var errs = checkRes(ops);
  var XHRResWrapper = errs.length > 0 ? ac_util.handleError(errs) : ops.res;
  var isNetOk = XHRResWrapper.ok;
  var XHRRes = XHRResWrapper.data;

  function doReject() {
    if (ac_.isFunction(reject)) reject(_this, XHRResWrapper);
  }

  function doResolve() {
    if (ac_.isFunction(resolve)) resolve(_this, XHRResWrapper);
  }

  function addAlert(type, msg) {
    _this.$dispatch('mylord', 'add-alert', type, msg);
  }

  function noProblem() {
    if (ops.type === 'alert') {
      addAlert('success', XHRRes.msg);
    }
    doResolve();
  }

  function haveProblem() {
    var msg = XHRRes.msg || ac_util.handleError('expect a message from server but get others');
    if (!(ops.type === 'quiet')) {
      addAlert('danger', msg);
    }
    doReject();
  }

  function handleNetNotOk() {
    if (!(ops.type === 'quiet')) {
      addAlert('danger', '请检查网络连接');
    }
    doReject();
  }

  function handleNetOk() {
    if (XHRRes.ret > 0) {
      noProblem();
    } else {
      haveProblem();
    }
  }

  if (isNetOk) {
    handleNetOk();
  } else {
    handleNetNotOk();
  }
};
