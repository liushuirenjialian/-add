module.exports = {
  oauth: function (ctx, url, param, callback) {
    param.grant_type = 'password';
    param.scope = 'read write';
    param.client_secret = 'my-secret-token-to-change-in-production';
    param.client_id = 'ticketapp';
    vueApp.http.options.emulateJSON = true;
    //  'Content-Type': 'application/x-www-form-urlencoded',
    var headers = {
      'Authorization': 'Basic dGlja2V0YXBwOm15LXNlY3JldC10b2tlbi10by1jaGFuZ2UtaW4tcHJvZHVjdGlvbg=='
    };
    this.request(ctx, 'POST', url, param, function (ret) {
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
      var token = ac_store.getToken();
      if (token === null || !token) {
        alert('token超时，请重新登录！');
        ctx.$router.go('/');
        return;
      }
      vueApp.http.options.emulateJSON = false;
      // 'Content-Type': 'application/json;charset=UTF-8',
      // 'Accept': 'application/json, text/plain, */*',
      headers = {
        'Authorization': 'Bearer ' + token.access_token
      };
      // param = JSON.stringify(param);
    }
    ctx.$http({
      url: '/v1' + url,
      data: param,
      method: method,
      headers: headers
    }).then(function (res) {
      res.ret = 1;
      if (callback) {
        callback(res);
      }
    }, function (res) {
      res.ret = -1;
      if (callback) {
        callback(res);
      }
    });
  }
};
