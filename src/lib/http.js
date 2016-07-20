var store = require('../lib/store');
module.exports = {
  oauth: function (ctx, url, param, callback) {
    param.grant_type = 'password';
    param.scope = 'read write';
    param.client_secret = 'my-secret-token-to-change-in-production';
    param.client_id = 'ticketapp';
    var headers = { 'Content-Type': 'application/x-www-form-urlencoded','Accept': 'application/json',
      'Authorization': 'Basic dGlja2V0YXBwOm15LXNlY3JldC10b2tlbi10by1jaGFuZ2UtaW4tcHJvZHVjdGlvbg=='};
    this.request(ctx, 'POST', url, param, function (ret) {
      store.setToken(ret.data);
      callback(ret);
    }, headers);
  },
  request: function (ctx, method, url, param, callback, headers) {
    if (!param) {
      param = {};
    }
    if (typeof(param) === 'function') {
      callback = param;
      param = {};
    }
    if (!headers) {
      headers = {'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json',
                        'Authorization': 'Basic ' + store.getToken().access_token
                };
    }
    ctx.$http({
      url: url,
      data: param,
      method: method,
      headers: headers
    }).then(function (res) {
      if (callback) {
        callback(res);
      }
    }, function (res) {
      if (callback) {
        callback(res);
      }
    });
  }
};
